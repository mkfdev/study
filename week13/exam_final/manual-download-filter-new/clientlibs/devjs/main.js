(function (win, $, doc){
    'use strict';
    win.smg = win.smg || {};
    win.smg.support = win.smg.support || {};
    win.smg.support.common = win.smg.support.common || {};

    var CST_EVENT = win.smg.support.common.customEvent,
        UTIL = win.smg.support.common.util,
        BREAKPOINTS = win.smg.support.common.breakpoints,
        PAGE = win.smg.support.page,
        pluginName = 'manualDownloadFilterNew',
        personaPluginName = 'personaPlugin',
        filterSearchPluginName = 'filterSearchPlugin',
        filterModulePluginName = 'filterManualDownloadPlugin';


    win.smg.support[pluginName] = function(container, args){
        var defParams = {
            obj : container,
            personaBox : '.manual-download-filter-new__persona-box',
            filterSearch : '.manual-download-filter-new__header',
            filterModule : '.manual-download-filter-new__module',
            personaBoxPlugins : [],
            filterSearchPlugins : [],
            filterModulePlugins : [],
            loadAfter : null
        }
        this.opts = $.extend({}, defParams, (args || {}));
        if(!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };

    win.smg.support[pluginName].prototype = {
        init : function(){
            this.setElement();
            this.manualDownloadPluginCall();
        },
        setElement : function(){
            this.personaBox = this.obj.find(this.opts.personaBox);
            this.filterSearch = this.obj.find(this.opts.filterSearch);
            this.filterModule = this.obj.find(this.opts.filterModule);
        },
        manualDownloadPluginCall : function(){
            var _this = this;
            //filter-new__persona-box
            for(var i=0, max=this.personaBox.length; i<max; i++){
                (function(index){
                    var target = _this.personaBox.eq(index);
                    _this.opts.personaBoxPlugins.push(new win.smg.support[personaPluginName](target));
                })(i);
            }

            //console.log(this.personaBox.length);
            //console.log(this.filterSearch.length);
            //console.log(this.filterModule.length);

            //filter-new__header
            for(var i=0, max=this.filterSearch.length; i<max; i++){
                (function(index){
                    var target = _this.filterSearch.eq(index);
                    _this.opts.filterSearchPlugins.push(new win.smg.support[filterSearchPluginName](target));
                })(i);
            }

            //filter-new__module
            for(var i=0, max=this.filterModule.length; i<max; i++){
                (function(index){
                    var target = _this.filterModule.eq(index);
                    _this.opts.filterModulePlugins.push(new win.smg.support[filterModulePluginName](target));
                })(i);
            }
        }
    };

    win.smg.support[personaPluginName] = function(container, args){
        var defParams = {
            obj : container,
            checkboxWrap : '.js-chkbox-wrap',
            checkboxLabelWrap : '.manual-download-filter-new__persona-btn-list',
            checkboxResetWrap : '.manual-download-filter-new__persona-detail',
            checkboxLabel : '.support-checkbox__label',
            resetButton : '.s-btn-reset',
            detailWindowClass : 's-detail-window',
            isCheckedClass : 'is-checked',
            isActiveClass: 'is-active',
            isDisabledClass: 'is-disabled',
            searchArea : '.manual-download-filter-new__search',
            inputWrap : '.js-inptext-wrap',
            inputElement : '.support-input__input',
            inputLabel : '.support-input__label',
            hideClass : 's-hide'
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if(!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };

    win.smg.support[personaPluginName].prototype = {
        init : function(){
            //only PC에서만 함수 실행
            if(UTIL.winSize().w > BREAKPOINTS.MOBILE){
                this.setElement();
                this.initOpts();
                this.bindEvents();
            }
        },
        setElement : function(){
            this.checkboxWrap = this.obj.find(this.opts.checkboxWrap);
            this.checkboxLabel = this.obj.find(this.opts.checkboxLabel);
            this.resetBtn = this.obj.find(this.opts.resetButton);
        },
        initOpts : function(){
            this.resetBtn.addClass(this.opts.isDisabledClass).prop('disabled','disabled');
        },
        bindEvents : function(){
            this.obj.on('mouseenter', $.proxy(this.openGuideLayers, this));
            this.obj.on('mouseleave', $.proxy(this.closeGuideLayers, this));
            this.checkboxLabel.on('click', $.proxy(this.selectOptionActiveFunc, this));
        },
        openGuideLayers : function(e){
            var target = $(e.currentTarget);
            if(!target.hasClass(this.opts.detailWindowClass)){
                target.addClass(this.opts.isActiveClass);
            }else{
                return;
            }
        },
        closeGuideLayers : function(){
            this.obj.removeClass(this.opts.isActiveClass);
        },
        selectOptionActiveFunc : function(e){
            var target = $(e.currentTarget),
                targetParent = target.parents(this.opts.checkboxWrap),
                _this = this;

            if(!targetParent.hasClass(this.opts.isCheckedClass)){
                targetParent.addClass(this.opts.isCheckedClass);
                target.parents(this.opts.checkboxResetWrap).find(this.opts.resetButton).removeClass(this.opts.isDisabledClass).prop('disabled','false');
                this.obj.off('mouseleave');
            }else{
                targetParent.removeClass(this.opts.isCheckedClass);
                if(target.parents(this.opts.checkboxLabelWrap).find('.is-checked').length){
                    return;
                }else {
                    this.resetBtn.addClass(this.opts.isDisabledClass).prop('disabled','disabled');
                    _this.obj.on('mouseleave', $.proxy(_this.closeGuideLayers, _this));
                }
            }
        }
    };

    win.smg.support[filterSearchPluginName] = function(container, args){
        var defParams = {
            obj : container,
            inputWrap : '.js-inptext-wrap',
            inputLabel : '.support-input__label',
            inputElement : '.support-input__input',
            hideClass : 's-hide',
            selectWrap : '.js-select-wrap',
            selectOpener : '.support-select__placeholder',
            selectLayer : '.support-select__options',
            selectLayerList : '> ul li',
            selectLayerSortWrap : '.js-align-placeholder',
            selectSortName : '>span',
            openedClass : 'is-opened',
            blindText : '.blind'
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if(!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };

    win.smg.support[filterSearchPluginName].prototype = {
        init : function(){
            this.setElements();
            this.bindEvents();
        },
        setElements : function(){
            this.inputWrap = this.obj.find(this.opts.inputWrap);
            this.input = this.inputWrap.find(this.opts.inputElement);
            this.selectWrap = this.obj.find(this.opts.selectWrap);
            this.selectOpener = this.selectWrap.find(this.opts.selectOpener);
            this.selectLayer = this.selectWrap.find(this.opts.selectLayer);
            this.selectLayerList = this.selectLayer.find(this.opts.selectLayerList);
        },
        bindEvents : function(){
            this.input.on('focusin', $.proxy(this.inputFocusinFunc, this));
            this.input.on('focusout', $.proxy(this.inputFocusoutFunc, this));
            this.selectOpener.on('click', $.proxy(this.selectLayerToggle, this));
            this.selectLayerList.on('click', 'a', $.proxy(this.selectItemFunc, this));
        },
        inputFocusinFunc : function(e){
            var target = $(e.currentTarget);
            target.parents(this.opts.inputWrap).find(this.opts.inputLabel).addClass(this.opts.hideClass);
        },
        inputFocusoutFunc : function(e){
            var target = $(e.currentTarget);
            if(target.val()==''){
                target.parents(this.opts.inputWrap).find(this.opts.inputLabel).removeClass(this.opts.hideClass);
            }else {
                return;
            }
        },
        selectLayerToggle : function(e){
            e.preventDefault();
            var target = $(e.currentTarget),
                targetParent = target.parents(this.opts.selectWrap);

            if(targetParent.hasClass(this.opts.openedClass)){
                targetParent.removeClass(this.opts.openedClass);
                target.next(this.opts.selectLayer).slideUp('fast').attr('aria-hidden', 'false');
                this.bindOutsideEvents(false);
                this.selectAccessibility();
            }else{
                targetParent.addClass(this.opts.openedClass);
                target.next(this.opts.selectLayer).slideDown('fast').attr('aria-hidden','true');
                this.bindOutsideEvents(true);
                this.selectAccessibility();
            }            
        },
        selectAccessibility : function(){
            var check = this.selectWrap.hasClass(this.opts.openedClass);
            console.log(check);
            if(check){
                this.selectWrap.attr('data-global-text', this.selectWrap.data('global-text').Expand);
                this.selectWrap.find(this.opts.blindText).text(this.selectWrap.data('global-text').Expand);
            }else{
                this.selectWrap.attr('data-global-text', this.selectWrap.data('global-text').Collapse);
                this.selectWrap.find(this.opts.blindText).text(this.selectWrap.data('global-text').Collapse);
            }
        },
        bindOutsideEvents : function(type){
            if(type){
                this.selectWrap.on('clickoutside touchendoutside', $.proxy(this.outsideFunc, this));
            }else {
                this.selectWrap.off('clickoutside touchendoutside');
            }
        },
        outsideFunc : function(){
            this.selectWrap.removeClass(this.opts.openedClass);
            this.selectLayer.slideUp('fast').attr('aria-hidden', 'false');
            this.selectWrap.off('clickoutside touchendoutside');
            this.selectAccessibility();
        },
        selectItemFunc : function(e){
            e.preventDefault();
            var target = $(e.currentTarget),
                targetText = target.text();

            // selected 텍스트를 추가할 요소 선택
            var selectOpener = target.parents(this.opts.selectWrap).find(this.opts.selectOpener);
            // 기존 텍스트 대신에 targetText를 넣는다
            selectOpener.find(this.opts.selectLayerSortWrap).children().text(targetText);

            // select 레이어 닫기
            target.parents(this.opts.selectWrap).removeClass(this.opts.openedClass);
            target.parents(this.opts.selectLayer).slideUp('fast').attr('aria-hidden', 'false');
            this.bindOutsideEvents(false);
        }
    };

    win.smg.support[filterModulePluginName] = function(container, args){
        var defParams = {
            obj : container,
            viewType : null,
            filtersWrap : '.manual-download-filter-new__filters',
            filtersInnerListWrap : '.manual-download-filter-new__list-wrap',
            filtersInnerList : '.manual-download-filter-new__list',
            filtersListInnerOpener : '.manual-download-filter-new__list-title',
            filtersListArea : '.manual-download-filter-new__list-items',
            filtersActive : 'filter-active',
            jsCheckboxWrap: '.js-chkbox-wrap',
            inpCheckbox : '.support-checkbox__input',
            isChecked : 'is-checked',
            isDisabled : 'is-disabled',
            filtersTab: '.manual-download-filter-new__tab',
            filtersTabBtn : '.manual-download-filter-new__tab-btn',
            isFixed : 'is-fixed',
            isOpened : 'is-opened',
            filtersContent : '.manual-download-filter-new__content',
            filtersContentListWrap : '.manual-download-filter-new__content-list',
            filtersContentList : '> ul li',
            isShow : 'is-show',
            showMoreBtnWrap : '.manual-download-filter-new__content-cta',
            showMoreBtn : '.s-btn-text',
            iconUp : 's-ico-up',
            iconDown : 's-ico-down'
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if(!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };

    win.smg.support[filterModulePluginName].prototype = {
        init : function(){
            this.setElements();
            //pc,mo공통
            this.initLayers();
            //pc,mo 각각
            this.initScreen();            
            this.bindEvents();
        },
        setElements : function(){
            this.filters = this.obj.find(this.opts.filtersWrap);
            this.filtersInnerList = this.filters.find(this.opts.filtersInnerList);
            this.filtersListToggler = this.filtersInnerList.find(this.opts.filtersListInnerOpener);
            this.filtersList = this.filtersInnerList.find(this.opts.filtersListArea);
            this.jsCheckboxWrap = this.obj.find(this.opts.jsCheckboxWrap);
            this.filtersTab = this.filters.find(this.opts.filtersTab);
            this.filtersTabBtn = this.filters.find(this.opts.filtersTabBtn);
            this.filtersInnerListWrap = this.filters.find(this.opts.filtersInnerListWrap);
            this.filtersContent = this.obj.find(this.opts.filtersContent);
            this.filtersContentListWrap = this.filtersContent.find(this.opts.filtersContentListWrap);
            this.filtersContentList = this.filtersContentListWrap.find(this.opts.filtersContentList);
            this.showMoreBtnWrap = this.filtersContentListWrap.find(this.opts.showMoreBtnWrap);
            this.showMoreBtn = this.showMoreBtnWrap.find(this.opts.showMoreBtn);
        },
        initLayers : function(){
            //js wrap
            this.initFilterWrapper();
            //view more
            this.initViewMoreArea();
        },
        initFilterWrapper : function(){
            var filtersClass = this.filters.attr('class');
            this.jsFiltersWrap = this.filters.wrap("<div class='js-"+ filtersClass + "'></div>").parent();
        },
        initViewMoreArea : function(){
            this.listNum = this.filtersContentListWrap.find(this.opts.filtersContentList).length;
            this.viewListNum = this.filtersContentListWrap.data('viewList');
            this.initViewMoreFunc();
        },
        initViewMoreFunc : function(){
             for(var i=0; i<this.viewListNum; i++){
                    this.filtersContentList.eq(i).addClass(this.opts.isShow);
                }

            if(this.listNum > this.viewListNum){
                this.showMoreBtnWrap.show();
            }else{
                this.showMoreBtnWrap.hide();
            }
        },
        initScreen : function(){
            if(UTIL.winSize().w > BREAKPOINTS.MOBILE){
                //reset시에 jsWrap을 제거
                this.noFixFilterWrapper();
            }else {
                //jsWrap 추가 (height)
                this.fixFilterWrapper();
            }
        },
        noFixFilterWrapper : function(){
           this.jsFiltersWrap.css('height', '');
        },        
        fixFilterWrapper : function(){
            this.jsFiltersWrap.css('height', this.filters.outerHeight());
        },
        bindEvents : function(){
            $(win).on('resize', $.proxy(this.resizeLayers, this));
            this.filtersListToggler.on('click', $.proxy(this.filtersInnerListToggle, this));
            this.jsCheckboxWrap.on('click', $.proxy(this.changeCheckboxStatus, this));
            this.filtersTabBtn.on('click', $.proxy(this.filterOuterToggle, this));
            this.showMoreBtn.on('click', $.proxy(this.viewMoreToggle, this));
        },
        resizeLayers : function(){
            if(!UTIL.isSupportTransform || UTIL.isSupportTransform && UTIL.winSize().w > BREAKPOINTS.MOBILE){
                if(this.viewType != 'pc'){
                    this.viewType = 'pc';
                    console.log('pc');
                    //filters를 감싸는 js-filters 요소의 height를 제거
                    this.noFixFilterWrapper();
                }
            }else{
                if(this.viewType != 'mo'){
                    this.viewType = 'mo';
                    console.log('mo');
                    this.fixFilterWrapper();
                }
            }
        },
        filtersInnerListToggle : function(e){
            e.preventDefault();
            var target = $(e.currentTarget),
                hasActive = target.parent().hasClass(this.opts.filtersActive),
                filtersListElement = target.next();
            
            target.parent().toggleClass(this.opts.filtersActive);
            hasActive ? filtersListElement.slideUp('fast') : filtersListElement.slideDown('fast');
        },
        changeCheckboxStatus : function(e){
            var target = $(e.currentTarget);
            if(target.hasClass(this.opts.isDisabled)){
                return;
            }else{
                var checked = target.find(this.opts.inpCheckbox).prop('checked');
                target.toggleClass(this.opts.isChecked, !checked);               
                target.find(this.opts.inpCheckbox).prop('checked', !checked);
            }
        },
        filterOuterToggle : function(e){
            e.preventDefault();
            var target = $(e.currentTarget);

            this.scrollMoveFunc(target);

            if(this.filtersTab){
                target.parents(this.opts.filtersWrap).toggleClass(this.opts.isFixed).toggleClass(this.opts.isOpened);
                $('.'+this.opts.isOpened).css('top', '0');
            }

            var expended = target.parents(this.opts.filtersWrap).hasClass(this.opts.isOpened);
            target.attr('aria-expanded', expended);
        },
        scrollMoveFunc : function(target){
            var openTop = target.parents(this.obj).offset().top;
            console.log(openTop);

            $('body,html').animate({
                'scrollTop' : openTop
            }, 300);
        },
        viewMoreToggle : function(e){
            e.preventDefault();

            if(this.showMoreBtn.hasClass(this.opts.iconDown) && this.listNum > this.viewListNum){
                this.filtersContentList.not('.is-show').addClass(this.opts.isShow);
                this.showMoreBtn.removeClass(this.opts.iconDown).addClass(this.opts.iconUp).text('show less');
            }else{
                for(var i=this.filtersContentList.length-1; i>this.viewListNum-1; i--){
                    this.filtersContentList.eq(i).removeClass(this.opts.isShow);
                }
                this.showMoreBtn.removeClass(this.opts.iconUp).addClass(this.opts.iconDown).text('show more');
            }
        }
    };

    win.smg.support.manualDownloadFilterNewCall = function (args) {
        var defParams = {
            obj : '.manual-download-filter-new'
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };

    win.smg.support.manualDownloadFilterNewCall.prototype = UTIL.def({
        init : function () {
            this.callComponent();
            //this.globalObjs();
        },
        callComponent : function () {
            this.callPlugins = [];
            for (var i = 0, max = this.obj.length; i < max; i++) {
                this.callPlugins.push(new win.smg.support[pluginName](this.obj.eq(i), {
                    loadAfter : $.proxy(this.globalObjsCall, this)
                }));
            }
        },
        globalObjs : function () {
            for (var i = 0, max = this.callPlugins.length; i < max; i++) {
                CST_EVENT.PAGEIS.PAGEOBJS.push(this.callPlugins[i]);
            }
        },
        globalObjsCall : function () {
            CST_EVENT.PAGEIS.EVENT_MANAGER.trigger(CST_EVENT.PAGEIS.REPOSITION);
        }
    }, UTIL.emitter);
    $(function () {
        win.supportManualDownloadFilterNew = new win.smg.support.manualDownloadFilterNewCall();
    });
})(window, window.jQuery, window.document);