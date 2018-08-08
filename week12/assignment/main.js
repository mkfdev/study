(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.support = win.smg.support || {};
    win.smg.support.common = win.smg.support.common || {};

    var CST_EVENT = win.smg.support.common.customEvent,
        UTIL = win.smg.support.common.util,
        BREAKPOINTS = win.smg.support.common.breakpoints,
        PAGE = win.smg.support.page,
        pluginName = 'manualDownloadFilterNew',
        filterpluginName = 'productManualDownloadNewPlugin',
        personaPluginName = 'manualPersonaPlugin';

    win.smg.support[pluginName] = function (container, args) {
        var defParams = {
            obj : container,
            filterModule : '.manual-download-filter-new__module', //Menuals,downloads
            personaAnchor : '.manual-download-filter-new__persona-box', //Menuals 안의 3개의 박스
            ManualDownloadPlugins : [], // ManualDownload (.manual-download-filter-new__module을 넣기 위한) 배열
            personaAnchorPlugins : [], // PersonaAnchor (.manual-download-filter-new__persona-box를 넣기 위한) 배열 
            loadAfter : null
        }
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.smg.support[pluginName].prototype = {
        init : function () {
            this.setElements();
            this.manualDownloadPluginCall();
        },
        setElements : function () {
            this.filterModule = this.obj.find(this.opts.filterModule);
            this.personaAnchor = this.obj.find(this.opts.personaAnchor);
        },
        manualDownloadPluginCall : function () {
            var _this = this;
            for (var i = 0, max = this.filterModule.length; i < max; i++) {// this.filterModule.length = 2
                (function (index) { //즉시실행함수 index == i
                    var target = _this.filterModule.eq(index);
                    _this.opts.ManualDownloadPlugins.push(new win.smg.support[filterpluginName](target, {
                        loadAfter : $.proxy(_this.loadAfterFunc, _this)
                    }));
                    // this.opts.ManualDownloadPlugins 배열에 두 개(.manual-download-filter-new__module)의 객체가 push 된다
                    // this.opts.ManualDownloadPlugins = new productManualDownloadNewPlugin(this.filterModule.eq(1)), new productManualDownloadNewPlugin(this.filterModule.eq(2))
                })(i);
            }
            for (var i = 0, max = this.personaAnchor.length; i < max; i++) {
                (function (index) {
                    var target = _this.personaAnchor.eq(index);
                    _this.opts.personaAnchorPlugins.push(new win.smg.support[personaPluginName](target));
                })(i);
                // this.opts.personaAnchorPlugins 배열에 세 개(.manual-download-filter-new__persona-box)의 객체가 push 된다
                // this.opts.personaAnchorPlugins = new manualPersonaPlugin(this.personaAnchor.eq(1)), new manualPersonaPlugin(this.personaAnchor.eq(2)), new manualPersonaPlugin(this.personaAnchor.eq(3))
            }
        },
        loadAfterFunc : function () {
            //outCallback 함수 호출 
            this.outCallback('loadAfter');
        },
        outCallback : function (ing) {
            // ing = loadAfter
            var callbackObj = this.opts[ing];
            // callbackObj 값이 null이면 return. 그냥 나온다 
            if (callbackObj == null) return;
            // callbackObj 값이 있으면 callbackObj()실행
            callbackObj();
        },
        reInit : function () { 
            // _this에 this값 복사 
            var _this = this;
            // ManualDownloadPlugin의 개수는 2 (Manual, Download)
            // i는 0, 1 
            for (var i = 0, max = this.opts.ManualDownloadPlugins.length; i < max; i++) {
                (function (index) {
                    //target에 현재 obj의 manualDownloadPlugins[0]와 [1] 배열을 순서대로 넣는다 
                    var target = _this.opts.ManualDownloadPlugins[i];
                    // manualDownloadPlugins[0].reInit() 실행 
                    // manualDownloadPlugins[1].reInit() 실행
                    target.reInit();
                })(i);
            }
        }
    };

    //filter plugin
    win.smg.support[filterpluginName] = function (container, args) {
        var defParams = {
            obj : container,
            anchorObj : '.support-anchor-navi',
            filterObj : '.manual-download-filter-new', //component
            filterArea : '.manual-download-filter-new__filters',
            filterWrap : '.manual-download-filter-new__list',
            filterLayerArea : '.manual-download-filter-new__list-group',
            filterListWrap : '.manual-download-filter-new__list-items',
            filterToggler : '.manual-download-filter-new__list-title',
            filterMoToggler : '.support-filter-btn',
            filterActiveClass : 'filter-active',
            filterFixedClass : 'is-fixed',
            filterToggleClass : 'is-opened',
            filterToggleSpeed : 100,
            filterViewType : false,
            accessText : '.blind',
            accessData : {
                accessAria : 'aria-expanded',
                dataActive : 'accessbility-Active'
            },
            listWrap : '.manual-download-filter-new__content-list',
            listParent : 'ul',
            listBtnArea : '.manual-download-filter-new__content-cta',
            listToggleBtn : '.s-btn-text',
            listViewClass : 'is-show',
            icoDownClass : 's-ico-down',
            icoUpClass : 's-ico-up',
            duration : 500,
            scrollLock : true,
            scrollLockClass : 'hive-scroll-lock',
            scrollLockOpts : {
                scrollLocked : false,
                lockElements : 'html',
                appliedLock : {},
                prevStyles : {},
                prevScroll : {},
                lockStyles : {
                    'overflow-y' : 'scroll',
                    'position' : 'fixed',
                    'width' : '100%'
                }
            },
            focusOutObj : {
                CLASS : 'hive-layer-focusout',
                CSS : {
                    'overflow' : 'hidden',
                    'position' : 'fixed',
                    'left' : 0,
                    'top' : 0,
                    'z-index' : -1,
                    'width' : 1,
                    'height' : 1,
                    'font-size' : '1px',
                    'line-height' : 0
                }
            },
            customEvent : '.' + pluginName + (new Date()).getTime(),
            viewType : null,
            loadAfter : null
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.smg.support[filterpluginName].prototype = {
        init : function () {
            this.setElements();
            this.initOpts();
            this.initLayout();
            this.setLayout();
            this.bindEvents();
        },
        setElements : function () {
            this.anchorObj = $(this.opts.anchorObj);
            this.filterObj = $(this.opts.filterObj);
            this.filterArea = this.obj.find(this.opts.filterArea);
            this.filterWrap = this.filterArea.find(this.opts.filterWrap);
            this.filterLayerArea = this.filterArea.find(this.opts.filterLayerArea);
            this.filterListWrap = this.filterWrap.find(this.opts.filterListWrap);
            this.filterToggler = this.filterWrap.find(this.opts.filterToggler);
            this.filterMoToggler = this.filterArea.find(this.opts.filterMoToggler);
            this.listWrap = this.obj.find(this.opts.listWrap);
            this.listParent = this.listWrap.find(this.opts.listParent);
            this.listChild = this.listParent.children();
            this.listBtnArea = this.listWrap.find(this.opts.listBtnArea);
            this.listToggleBtn = this.listBtnArea.find(this.opts.listToggleBtn);
            this.accessText = this.filterWrap.find(this.opts.accessText);
        },
        initOpts : function () {
            //data-global-text 속성 가져옴
            var globalText = this.filterObj.data('global-text');

            //$.trim 양 끝의 공백을 제거한 후, 문자열 데이터를 globalText에 출력해준다
            this.globalText = {
                // this.globalText = Collapse (global 텍스트가 존재하고, filter-new의 globalText가 Collapse일 때)
                Collapse : (globalText && globalText.Collapse) ? $.trim(globalText.Collapse) : '',
                // this.globalText = Expand (global 텍스트가 존재하고, filter-new의 globalText가 Expand일 때)
                Expand : (globalText && globalText.Expand) ? $.trim(globalText.Expand) : '',
                // this.globalText = showMore (global 텍스트가 존재하고, filter-new의 globalText가 showMore일 때)
                showMore : (globalText && globalText.showMore) ? $.trim(globalText.showMore) : '',
                // this.globalText = showLess (global 텍스트가 존재하고, filter-new의 globalText가 showLess일 때)
                showLess : (globalText && globalText.showLess) ? $.trim(globalText.showLess) : ''
            };

            //this.listWrap의 data-view-list 속성을 가져옴
            this.listViewNum = this.listWrap.data('view-list');
            //this.listWrap의 li length를 가져옴
            this.listNum = this.listChild.length;
        },
        initLayout : function () {
            this.filterToggleType = true;
            // (초기화) li 요소에 is-show 제거
            this.listChild.removeClass(this.opts.listViewClass);
            this.initFilterArea(); // 접근성을 위해 hive-layer-focusout 추가
            this.initListView();
        },
        initFilterArea : function () {            
            var stickyWrapClass = this.filterArea.attr('class'),
                jsStickyWrapClass = 'js-' + stickyWrapClass;
            // jsStickyWrapClass = js-manual-download-filter-new__filters
            // manual-download-filter-new__filters를 jsStickyWrapClass로 감싼다
            this.filterArea.wrap('<div class="' + jsStickyWrapClass + '"/>');
            // this.fliterObjWrap = .js-manual-download-filter-new__filters
            this.filterObjWrap = this.filterArea.parent();
            var focusOutClass = this.opts.focusOutObj.CLASS,
                focusOutElements = '<span class="' + focusOutClass + '">""</span>';
            // focusOutElements = '<span class="hive-layer-focusout"></span>'

            //this.filterArea 이전 요소에 hive-layer-focusout 클래스가 없으면, 이전 요소에 focusOutElement(span요소)를 추가함 
            if (!this.filterArea.prev().hasClass(focusOutClass)) {
                this.filterArea.before(focusOutElements);
            }
            //this.filterArea 다음 요소에 hive-layer-focusout 클래스가 없으면, 다음 요소에 focusOutElement(span요소)를 추가함 
            if (!this.filterArea.next().hasClass(focusOutClass)) {
                this.filterArea.after(focusOutElements);
            }

            this.prevFocusOutObj = this.filterArea.prev();
            this.nextFocusOutObj = this.filterArea.next();

            //focusOutObj는 this.fliterArea 이전에 붙은 span요소와 이후에 붙은 span 요소를 다 담고 있음
            this.focusOutObj = this.filterArea.prev().add(this.filterArea.next());
            // this.filterArea 앞 뒤의 span 요소에 css를 적용해서 숨김 처리한다
            this.focusOutObj.css(this.opts.focusOutObj.CSS);
        },
        moFocusInitLayout : function (type) {
            if (type) {
                // this.filterArea의 이전, 다음에 붙인 span의 tabIndex속성을 0으로 준다
                // tabIndex = 0은 포커스가 가지않는 요소에게 포커스를 줄 수 있다. 
                this.focusOutObj.attr('tabIndex', 0);
            } else {
                // this.filterArea의 이전, 다음에 붙인 span의 tabIndex속성을 -1으로 준다
                // tabIndex = -1은 focus가 가는 요소에게 포커스를 잃게 할수 있다.
                this.focusOutObj.attr('tabIndex', -1);
            }
        },
        changeEvents : function (event) {
            var events = [],
                //이벤트가 여러개일 경우 ' '으로 구분
                eventNames = event.split(' ');
            for (var key in eventNames) {
                events.push(eventNames[key] + this.opts.customEvent);
                //보류
                //customEvent : '.' + pluginName + (new Date()).getTime() ?
            }
            return events.join(' ');
        },
        bindEvents : function () {
            // window에서 resize, 화면 방향 전환이 일어날 떄는 resizeFunc 함수 실행
            $(win).on(this.changeEvents('resize orientationchange'), $.proxy(this.resizeFunc, this));
            // filterToggler를 클릭하면 filterToggleFunc 함수 실행 
            this.filterToggler.on(this.changeEvents('click'), $.proxy(this.filterToggleFunc, this));
            // listToggleBtn을 클릭하면 listToggleFunc 함수 실행
            this.listToggleBtn.on(this.changeEvents('click'), $.proxy(this.listToggleFunc, this));
            // listWrap(filter list) ajaxafter(비동기 호출 후? 호출 할때?) listAjaxAfter 함수 실행 
            this.listWrap.on(this.changeEvents('ajaxafter'), $.proxy(this.listAjaxAfter, this));
        },
        bindResponsiveEvents : function (type) {
            if (type) {
                // scroll 이벤트 해제 
                $(win).off(this.changeEvents('scroll'));
                //support-filter-btn(mo에서 보임) click 이벤트 off
                this.filterMoToggler.off(this.changeEvents('click'));
            } else {
                // type=false (mo버전에서 타고 들어옴) 일때 scroll이 일어나면 scrollFunc 함수를 실행
                $(win).on(this.changeEvents('scroll'), $.proxy(this.scrollFunc, this));
                //support-filter-btn(mo)를 click 했을 때 filterMoClickFunc 함수를 실행
                this.filterMoToggler.on(this.changeEvents('click'), $.proxy(this.filterMoClickFunc, this));
            }
        },
        moFocusBindEvents : function (type) {
            //웹 접근성(포커스 이동)을 위한 처리(this.filterArea영역에서 포커스가 반복됨)
            if (type) {
                // fliterArea 상단 span에 focusin을 했을 때 onPrevOut 함수 실행 
                this.prevFocusOutObj.on(this.changeEvents('focusin'), $.proxy(this.onPrevOut, this));
                // fliterArea 하단 span에 focusin을 했을 때 onNextOut 함수 실행 
                this.nextFocusOutObj.on(this.changeEvents('focusin'), $.proxy(this.onNextOut, this));
            } else {
                // fliterArea 상단 span에 focusin 해제
                this.prevFocusOutObj.off(this.changeEvents('focusin'));
                // fliterArea 하단 span에 focusin 해제 
                this.nextFocusOutObj.off(this.changeEvents('focusin'));
            }
        },
        onPrevOut : function () {
            // filterArea에서(왼쪽 필터영역) a input button select 요소 중에 보이는 것 중의 last 요소에 focus를 준다
            this.filterArea.find('a, input, button, select').filter(':visible').last().focus();
        },
        onNextOut : function () {
            // filterArea에서(왼쪽 필터영역) a input button select 요소 중에 보이는 것 중의 first 요소에 focus를 준다
            this.filterArea.find('a, input, button, select').filter(':visible').first().focus();
        },
        resizeFunc : function () {
            // winWidth = 현재 window사이즈
            this.winWidth = UTIL.winSize().w;

            // resizeStart 초기값은 null
            if (this.opts.resizeStart == null) {
                //resizeStart에 현재 window 스크린 사이즈를 대입 
                this.opts.resizeStart = this.winWidth;
                // resizeAnmateFunc 함수 실행 
                this.resizeAnimateFunc();
            }
            win.clearTimeout(this.resizeEndTime);
            // 0.15초 후에 resizeEndFunc를 실행한다 
            this.resizeEndTime = win.setTimeout($.proxy(this.resizeEndFunc, this), 150);
        },
        resizeEndFunc : function () {
            this.opts.resizeStart = null;
            this.setLayout();
            if (UTIL.winSize().w <= BREAKPOINTS.MOBILE) {
                //요 영역은 anchorObj 요소가 안 잡혀서 해석불가...
                this.createHeightFunc();
                this.fixedObjFunc();
                this.setFilterRange();
            }
            UTIL.cancelAFrame.call(win, this.resizeRequestFrame);
        },
        //resizeAnimateFunc
        resizeAnimateFunc : function () {
            // setLayout() 함수 실행
            // 스크린사이즈에 따른 모바일, PC 버전 체크 후 setLayout 진행
            this.setLayout();
            // 모바일 사이즈일때 
            if (UTIL.winSize().w <= BREAKPOINTS.MOBILE) {
                this.createHeightFunc();
                this.fixedObjFunc();
                // setFilterRange 함수 실행 - lockScroll 속성 정의
                this.setFilterRange();
            }
            this.resizeRequestFrame = UTIL.requestAFrame.call(win, $.proxy(this.resizeAnimateFunc, this));
        },
        setLayout : function () {
            // 하위 브라우저거나, 최신 브라우저 이면서 pc 사이즈 일때 setPcLayout() 함수 실행
            // 최신 브라우저의 모바일 사이즈 일때 setMoLayout() 함수 실행
            if (!UTIL.isSupportTransform || UTIL.isSupportTransform && UTIL.winSize().w > BREAKPOINTS.MOBILE) {
                if (this.opts.viewType != 'pc') {
                    this.opts.viewType = 'pc';
                    this.setPcLayout();
                }
            } else {
                if (this.opts.viewType != 'mo') {
                    this.opts.viewType = 'mo';
                    // setMoLayout 함수 실행 - 모바일 버전 초기화(불필요한 이벤트를 제거)
                    this.setMoLayout();
                    //bindResponsiveEvents 함수 실행 (type = false)
                    this.bindResponsiveEvents(false);
                }
            }
        },
        setPcLayout : function () {
            this.opts.filterViewType = false;
            //scrollLock 객체로 init(false) 메서드 호출 -> false return;
            this.scrollLock.init.call(this, false);
            // clickoutside 이벤트 해제
            this.bindOutsideEvents(false);
            // 모바일 이벤트 해제
            this.moFocusInitLayout(false);
            this.moFocusBindEvents(false);
            // 모바일 필터 토글 버튼 -> aria-expanded = false
            this.filterMoToggler.attr(this.opts.accessData.accessAria, false);
            // js-manual-download-filter-new__filters의 height 제거(pc에선 x)
            this.filterObjWrap.css('height', '');
            // 모바일 필터 토글 버튼 클릭하면 position: fixed , top:0 되는것 css 해제
            this.filterArea.show().css('top', '');
            // 마찬가지로 클릭 후 fixed 될때 추가되는 is-fixed , is-opened 클래스 제거 
            this.filterArea.removeClass(this.opts.filterFixedClass);
            this.filterArea.removeClass(this.opts.filterToggleClass);
        },
        setMoLayout : function () {
            // MO 버전에서 클래스 제거-> 초기화 
            // 모바일 필터 토글 버튼의 is-fixed, is-opened 클래스 제거
            this.filterArea.removeClass(this.opts.filterFixedClass);
            this.filterArea.removeClass(this.opts.filterToggleClass);
        },
        scrollFunc : function () {
            this.fixedObjFunc();
            this.setFilterRange();
        },
        createHeightFunc : function () {
            // 구버전 브라우저 (언제나 최신 브라우저 PC버전과 같이 작동하게)
            if (!UTIL.isSupportTransform) {
                //filterWrap에 height 주지 않음
                this.filterObjWrap.css('height', '');
                //filterArea top 값도 주지 않음 
                this.filterArea.css('top', '');
            } else {
                // 구버전 브라우저가 아니고 현재 window width가 BREAKPOINTS.MOBILE 사이즈보다 클 때 -> PC 버전
                if (UTIL.winSize().w > BREAKPOINTS.MOBILE) {
                    //filterWrap에 height 주지 않음
                    this.filterObjWrap.css('height', '');
                    //filterArea top 값도 주지 않음 
                    this.filterArea.css('top', '');
                } else {
                    // 구버전 브라우저가 아니고 현재 window width가 BREAKPOINTS.MOBILE 사이즈보다 작을 때 -> 모바일 버전
                    this.anchorObjHeight = this.anchorObj.outerHeight(true);
                    this.filterObjHeight = this.filterArea.outerHeight(true);
                    //anchorObj가 있으면 this.anchorObjHeight 값, 없으면 0을 준다 
                    this.filterObjPosition = (this.anchorObj.length) ? this.anchorObjHeight : 0;
                    // filterWrap에 높이값을 filterObj 요소의 높이값만큼 지정해준다 
                    this.filterObjWrap.css('height', this.filterObjHeight);
                    // filterArea의 top값은 anchorObj(.support-anchor-navi)가 있으면 anchorObj의 높이값을 주고, 없으면 그냥 0을 준다 
                    this.filterArea.css('top', this.filterObjPosition);
                }
            }
        },
        fixedObjFunc : function () {
            var winTop = $(win).scrollTop();


            // false 이면 scrollTop = winTop , 즉 현 스크롤의 위치
            var lockScroll = $('html').data('lockScroll'),
                lockType = (lockScroll != null) ? true : false,
                scrollTop = (lockType) ? lockScroll.top : winTop;

            //anchorObjHeight ? anchorObj 요소가 html에서 발견되지 않는다 
            var filterOffsetTop = (lockType) ? lockScroll.top + this.filterObjWrap.offset().top : this.filterObjWrap.offset().top - this.anchorObjHeight;

            // filterOffsetTop 값을 못구함 
            if (scrollTop >= filterOffsetTop) {
                if (!this.filterArea.hasClass(this.opts.filterFixedClass)) {
                    this.filterArea.addClass(this.opts.filterFixedClass);
                }
            } else {
                if (this.filterArea.hasClass(this.opts.filterFixedClass) && !lockType) {
                    this.filterArea.removeClass(this.opts.filterFixedClass);
                }
            }
            //position 위치 지정
            this.setPosition();
        },
        setFilterRange : function () {
            var winTop = $(win).scrollTop();

            //lockScroll(key)의 value를 가져온다
            //비활성화시 null
            //활성화시 style(css)가 들어있음 
            var lockScroll = $('html').data('lockScroll'),
                //lockScroll이 null이면 false (비활성화)
                //lockScroll이 null이 아니면 true 
                lockType = (lockScroll != null) ? true : false,
                //false일땐 winTop 현재 위치 유지
                //true일땐 lockScroll.top값 가져온다 
                scrollTop = (lockType) ? lockScroll.top : winTop;

                //filterWrapHeight = 현재 filter의 높이값
            var filterWrapHeight = this.obj.height(),
                // lockType이 false 일땐 filterOffsetTop = 현재 filter의 top 값 , 
                // lockType이 true 일땐 fileterOffsetTop = 현재 filter의 top 값 + lockScroll이 가지고 있는 top값 
                filterOffsetTop = (lockType) ? lockScroll.top + this.obj.offset().top : this.obj.offset().top,
                // filterObjHeight 를 못 찾겠다 ㅠㅠ
                filterEndRange = filterWrapHeight + filterOffsetTop - this.filterObjHeight;
            
            if (scrollTop >= filterEndRange) {
                this.filterArea.hide();
            } else {
                this.filterArea.show();
            }
        },
        setPosition : function () {
            if (this.opts.viewType === 'pc') {
                this.filterArea.css('top', '');
            } else {
                // mo버전이면서 is-fixed를 가지고 있으면 
                // this.filterArea의 top: 0
                if (this.filterArea.hasClass(this.opts.filterFixedClass)) {
                    this.filterArea.css('top', this.filterObjPosition);
                } else {
                // 아니면 filterArea의 top값은 0
                    this.filterArea.css('top', '');
                }
            }
        },
        scrollLock : {
            init : function (type) {
                // 초기 scrollLock = true -> !true = false 첫번째 줄 통과 
                if (!this.opts.scrollLock) return;
                var lockClass = this.opts.scrollLockClass, //hive-scroll-lock
                    lockOpts = this.opts.scrollLockOpts, // scrollLocked = false 등등
                    lockElements = $(lockOpts.lockElements); // $('html')
                lockElements.toggleClass(lockClass, type); // $('html').toggleClass(hive-scroll-lock, type) 
                // -> scrollLock.init(true)일때 클래스가 붙는것?
                if (type) {
                    if (UTIL.isDevice && UTIL.isIOS) {
                        if (lockOpts.scrollLocked || (lockElements.data('lockScroll') != null)) return;
                        lockOpts.appliedLock = {}; //appliedLock = {} 처음에도 비워져있는데.. {} 빈 객체로 초기화한다
                        this.scrollLock.saveStyles.call(this); //scrollLock 객체가 saveStyles 메서드 호출: lockOpts.prevStyles 객체에 값이 덮어짐
                        this.scrollLock.saveScrolls.call(this); //scrollLock 객체가 saveScrolls 메서드 호출 : lockOpts.prevScroll 객체에 스크롤 값이 저장됨
                        $.extend(lockOpts.appliedLock, lockOpts.lockStyles, { // appliedLock 객체에 lockStyles 값과 아래에 left, top 값이 덮어져 병합된다
                            'left' : - lockOpts.prevScroll.scrollLeft,
                            'top' : - lockOpts.prevScroll.scrollTop
                        });
                        lockElements.css(lockOpts.appliedLock); //$('html').css(위에서 넣었던 appliedLock css를 추가해준다)
                        lockElements.data('lockScroll', { //data(key, value) ->  key: data가 저장될 key 값, value: 데이터 저장, 요기서는 lockScroll에 left,top값 저장
                            'left' : lockOpts.prevScroll.scrollLeft, 
                            'top' : lockOpts.prevScroll.scrollTop
                        });
                        lockOpts.scrollLocked = true; // scrollLocked = true (lock이 활성화)
                    }
                } else { // type = false
                    if (UTIL.isDevice && UTIL.isIOS) {
                        // scrollLocked 가 false 이거나 lockScroll 값이 null 일 때, 이 영역을 실행하지 않고 나간다
                        if (!lockOpts.scrollLocked || (lockElements.data('lockScroll') == null)) return;
                        this.scrollLock.saveStyles.call(this); // scrollLock
                        for (var key in lockOpts.appliedLock) { // appliedLock의 요소들을 반복 
                            delete lockOpts.prevStyles[key]; // prevStyles에서 appliedLock의 key값을 이용해서 매치되는 배열 요소를 삭제 한다 
                        }
                        lockElements.attr('style', $('<x>').css(lockOpts.prevStyles).attr('style') || '');//?
                        lockElements.data('lockScroll', null);//html요소의 lockScorll 값을 null로 저장
                        $(win).scrollLeft(lockOpts.prevScroll.scrollLeft).scrollTop(lockOpts.prevScroll.scrollTop); // prevScorll 위치로 이동
                        lockOpts.scrollLocked = false; // scrollLocked = false (lock이 비활성화)
                    }
                }
            },
            saveStyles : function () { //$('html')의 스타일 속성들을 추출해서 lockOpts.prevStyles에 저장하는 메서드
                var styleStrs = [],
                    styleHash = {},
                    lockOpts = this.opts.scrollLockOpts, //scrollLocked = false 등등 여러 객체가 선언되어 있음
                    lockElements = $(lockOpts.lockElements), //$('html')
                    styleAttr =  lockElements.attr('style'); //$('html').attr('style')
                if (!styleAttr) return; //style이 없으면 실행 안함
                styleStrs = styleAttr.split(';'); //style 속성의 값들을 ;로 쪼개서 styleStrs 배열에 차례대로 넣는다 
                $.each(styleStrs, function styleProp (styleString) { // styleString = index..?
                    var styleString = styleStrs[styleString]; //styleStrs[0] ~ styleStrs[styleStrs 갯수-1]
                    if (!styleString) return; //styleString (styleStrs 배열이 없으면) 없으면 실행안하고 each문을 나간다
                    var keyValue = styleString.split(':'); //keyValue 에 값을 :로 쪼개서 넣는다 
                    if (keyValue.length < 2) return; //keyValue 배열의 갯수가 2개가 안되면 실행안하고 여기서 나간다
                    styleHash[$.trim(keyValue[0])] = $.trim(keyValue[1]); // styleHash 객체에 key는 keyValue[0], value는 keyValue[1]인 형태의 객체 값을 넣는다 
                });
                $.extend(lockOpts.prevStyles, styleHash); //styleHash의 값이 prevStyles 값을 덮어쓰며 병합된다($.extend : Object 합침)
            },
            saveScrolls : function () { //현재 스크롤 위치 값을 저장하는 메서드 
                var lockOpts = this.opts.scrollLockOpts; //scrollLocked = false 등등 여러 객체가 선언되어 있음
                lockOpts.prevScroll = { // lockOpts.prevScorll = {} 에 아래에 값들을 넣음 
                    scrollLeft : $(win).scrollLeft(), //scrollLeft 수평 스크롤 위치
                    scrollTop : $(win).scrollTop() // scrollTop 수직 스크롤 위치(현재 스크롤 위치)
                };
            }
        },
        filterMoClickFunc : function (e) {
            e.preventDefault();
            var filterOffsetTop = Math.ceil(this.filterObjWrap.offset().top - this.anchorObjHeight, 10);
            // filterViewType이 true가 아닐 때 
            if (!this.opts.filterViewType) {
                // filterViewType을 true로 지정하고 
                this.opts.filterViewType = true;
                //filterArea가 is-fixed 클래스를 가지고 있지 않을 때 
                if (!this.filterArea.hasClass(this.opts.filterFixedClass)) {
                    // 현재 스크롤 위치를 filterOffsetTop으로 0.5초의 속도로 이동시킨다 
                    $('html, body').stop().animate({
                        scrollTop : filterOffsetTop
                    }, this.opts.duration, $.proxy(function () {
                        // 이동 시킨 후에 filterMoToggleFunc() 함수를 실행 한다 
                        this.filterMoToggleFunc();
                        // 0.1초마다 반복한다 
                        win.setTimeout($.proxy(function () {
                            // window에 clickoutside 이벤트를 붙여준다 
                            this.bindOutsideEvents(true);
                        }, this), 10);
                    }, this))
                } else {
                    // filterArea가 is-fixed 클래스를 가지고 있으면 바로 filterMoToggleFunc()를 실행시킨다 
                    this.filterMoToggleFunc();
                }
            }
        },
        filterMoToggleFunc : function () {
            this.filterArea.addClass(this.opts.filterToggleClass);
            // 0.01초마다 반복 
            win.setTimeout($.proxy(function () {
                //scrollLock의 init 메서드 init(true) 호출 
                this.scrollLock.init.call(this, true);
                //filterLayerArea에 clickoutside 이벤트를 붙여준다
                this.bindOutsideEvents(true);
            }, this), 10);
            this.layerViewType = (this.filterArea.hasClass(this.opts.filterToggleClass)) ? true : false;
            if (this.layerViewType) {
                this.moFocusInitLayout(true);
                this.moFocusBindEvents(true);
            }
            this.filterMoToggler.attr(this.opts.accessData.accessAria, this.layerViewType);
        },
        bindOutsideEvents : function (type) {
            if (type) {
                // fileterLayerArea 바깥 영역을 클릭하면 onLyayerOutsideFunc을 실행 
                this.filterLayerArea.on('clickoutside touchendoutside', $.proxy(this.onLayerOutsideFunc, this));
            } else {
                // pc 버전에서 이벤트 해제
                this.filterLayerArea.off('clickoutside touchendoutside');
            }
        },
        onLayerOutsideFunc : function (e) {
            e.preventDefault();
            // 0.01초마다 반복 
            win.setTimeout($.proxy(function () {
                this.opts.filterViewType = false;
                this.layerViewType = false;
                this.filterArea.removeClass(this.opts.filterToggleClass);
                this.filterMoToggler.attr(this.opts.accessData.accessAria, this.layerViewType);
                this.scrollLock.init.call(this, false);
                // filterLayerArea에서 clickoutside 이벤트 해제
                this.bindOutsideEvents(false);
                this.moFocusInitLayout(false);
                this.moFocusBindEvents(false);
                this.outCallback('loadAfter');
            }, this), 10);
        },
        filterToggleFunc : function (e) {
            e.preventDefault();
            // filterViewFunc(e) 함수 실행 event 전달 (e: filterToggler)
            this.filterViewFunc(e);
            //접근성(global text추가하는 함수) accessbilityFunct실행
            this.accessbilityFunc(true);
        },
        filterViewFunc : function (e) {
            var target = $(e.currentTarget); //$('.manual-download-filter-new__list-title')
            var targetList = target.parent(this.opts.filterWrap), //target의 부모 요소인 .manual-download-filter-new__list
            targetListWrap = targetList.find(this.opts.filterListWrap); //listWrap 영역에서 manual-download-filter-new__list-items(list)요소를 가져온다 
            if (!targetList.hasClass(this.opts.filterActiveClass)) { // manual-download-filter-new__list에 filter-active 클래스를 가지고 있지 않으면
                targetList.toggleClass(this.opts.filterActiveClass); // manual-download-filter-new__list에 filter-active 클래스를 추가한다 
                targetListWrap.slideToggle(this.opts.filterToggleSpeed, $.proxy(function () { //manual-download-filter-new__list-items(list) 슬라이드 토글(hide되거나 show된다)
                    //filterViewAfterFunc 함수 실행
                    this.filterViewAfterFunc();
                }, this));
            } else {
                // 이미 .manual-download-filter-new__list가 filter-active 클래스를  가지고 있으면 else 실행
                // manual-download-filter-new__list-items(list wrap)요소가 slideUp으로 닫힌다 
                targetListWrap.slideUp(this.opts.filterToggleSpeed, $.proxy(function () {
                    //.manual-download-filter-new__list (target 부모 요소)에서 filter-active클래스를 제거한다 
                    targetList.removeClass(this.opts.filterActiveClass);
                    // filterViewAfterFunc 함수를 실행한다 
                    this.filterViewAfterFunc();
                }, this));
            }
        },
        filterViewAfterFunc : function () {
            // 구버전 브라우저(모든 사이즈)이거나 최신 브라우저 PC버전 일때 outCallback('loadAfter')함수를 실행한다 
            if (!UTIL.isSupportTransform || (UTIL.isSupportTransform && this.winWidth > BREAKPOINTS.MOBILE)) {
                this.outCallback('loadAfter');
            }
        },
        accessbilityFunc : function (type) {
            // 웹접근성 글로벌 텍스트 넣는 영역
            if (type) {
                //filterToggler(filter-list의 타이틀)의 accessbility-Active의 값을 !(not). 있으면 false?
                var currentAccessType = !this.filterToggler.data(this.opts.accessData.dataActive),
                // currentAccessType이 true이면 globalTxt.Expand,
                // false 이면 gloablText.Collapse
                    globalTxt = (currentAccessType) ? this.globalText.Expand : this.globalText.Collapse;
                // 현재 filterToggler의 dataActive은 currentAccessType이 true이면 'accessbility-Active'
                this.filterToggler.data(this.opts.accessData.dataActive, currentAccessType);
                // filterToggler에서 accessText(.blind)요소를 찾아서 해당 요소에 globalTxt 값(텍스트)을 넣어준다 
                this.filterToggler.find(this.opts.accessText).text(globalTxt);
            } else {
                this.listToggleBtn.toggleClass(this.opts.icoUpClass, this.currentAllView);
                this.listToggleBtn.toggleClass(this.opts.icoDownClass, !this.currentAllView);
                this.listToggleBtn.text(this.currentAllView ? this.globalText.showLess : this.globalText.showMore);
            }
        },
        initListView : function () {
            // toggleClass 제어 
            this.currentAllView = false;

            // data-list-view(is-show된 list)의 숫자가 list의 갯수보다 많으면 show more 버튼을 숨김.
            // 반대로 (is-show된 것보다) list의 개수가 많으면 show-more 버튼을 노출한다.
            if (this.listNum <= this.listViewNum) {
                this.listBtnArea.hide();
            } else {
                this.listBtnArea.show();
            }

            // i는 list의 갯수
            for (var i = 0, max = this.listNum; i < max; i++) {
                var contChildTarget = this.listChild.eq(i);
                // data-list-view에 지정된 숫자보다 작은 인덱스에 해당하는 요소들에만 is-show 클래스를 추가하고 
                // data-list-view에 지정된 숫자보다 큰 인덱스의 요소에는 is-show 클래스를 제거함
                if (i < this.listViewNum) {
                    contChildTarget.addClass(this.opts.listViewClass);
                } else {
                    contChildTarget.removeClass(this.opts.listViewClass);
                }
            }

            //show-more 버튼에 s-ico-up 클래스가 제거된다 ( this.currentAllView = false 이므로 제거)
            this.listToggleBtn.toggleClass(this.opts.icoUpClass, this.currentAllView);
            //show-more 버튼에 s-ico-down 클래스가 추가된다 ( !this.currentAllView = true 이므로 추가)
            this.listToggleBtn.toggleClass(this.opts.icoDownClass, !this.currentAllView);
            // show-more 접근성(global-text)를 추가하기 위함 - true일때 
            this.accessbilityFunc(false);
            this.outCallback('loadAfter');
        },
        listToggleFunc : function (e) {
            e.preventDefault();
            this.currentAllView = !this.currentAllView;
            this.setListLayout();
            // listWrap = filter 안의 list들을 감싼 요소
            this.scrollMoveFunc(this.listWrap);
            this.accessbilityFunc(false);
        },
        listAjaxAfter : function () {
            //listchild -> filter의 li 
            this.listChild = this.listParent.children();
            //listNum -> filter의 li 개수 
            this.listNum = this.listParent.children().length;
            // initListView() 실행
            this.initListView();
        },
        setListLayout : function () {
            // this.currentAllView가 true 이면 
            if (this.currentAllView) {
                // filter의 li에 is-show 클래스를 추가한다 
                this.listChild.addClass(this.opts.listViewClass);
            } else {
                // this.currentAllView가 false 이면 
                // (t)his.listWrap의 data-view-list 속성에서 가져온 숫자 - 1) 번째의  li에 is-show클래스를 추가한다. 
                // nextAll() 해당하는 요소 다음으로 오는 모든 요소들에 is-show 클래스를 제거한다  
                this.listChild.eq(this.listViewNum - 1).addClass(this.opts.listViewClass).nextAll().removeClass(this.opts.listViewClass);
            }
            this.outCallback('loadAfter');
        },
        scrollMoveFunc : function (target) {
            //target(this.listWrap)이 없으면 실행하지 않는다 
            if (!target.length) return;
            // scrollTop : this.listWrap의 top 값 (소수점 올림)
            var scrollTop = Math.ceil(target.offset().top),
            // winTop: 현재 스크롤 위치 
                winTop = $(win).scrollTop(),
            // stickHeight = scrollTop(listWrap top 값) - PAGE 객체의 stickyArea 메서드 호출..?
                stickyHeight = PAGE.stickyArea(scrollTop),
            // filterHeight = filterArea(listWrap + filter Title영역)의 높이 값
                filterHeight = this.filterObjHeight,
            // moveTopPosition = listWrap.top - stickyHeight
                moveTopPosition = scrollTop - stickyHeight,
            // moveTop은 filterArea에 is-fixed가 없으면  moveTopPosition
            // is-fixed가 있으면 moveTopPosition - filterHeight
                moveTop = (!this.filterArea.hasClass(this.opts.filterFixedClass)) ? moveTopPosition : moveTopPosition - filterHeight;
            //moveTop과 winTop이 같으면 다음 코드 실행하지 않고 나온다 
            if (moveTop === winTop) return;
            // 현재 위치를 moveTop 으로 이동시킨다 (0.5초 동안)
            $('html, body').animate({
                'scrollTop' : moveTop
            }, this.opts.duration);
        },
        //..?
        outCallback : function (ing) {
            var callbackObj = this.opts[ing];
            if (callbackObj == null) return;
            callbackObj();
        },
        reInit : function () {
            //resizeFunc 실행 
            this.resizeFunc();
        }
    };

    //persona plugin
    // 이 영역은 persona 요소(manual-download-filter-new__persona-box)의 mouseenter, mouseleave 이벤트를 실행시키고
    // MO에서는 해당 이벤트가 해제되고, PC에서만 작동하도록 이벤트 바인딩 한다. (처음, resize, orientationchange 시에)
    win.smg.support[personaPluginName] = function (container, args) {
        var defParams = {
            obj : container,
            activeClass : 'is-active',
            objResetBtn : '.s-btn-reset',
            disabledClass : 'is-disabled',
            checkedClass : 'is-checked',
            inputWrap : '.js-chkbox-wrap',
            windowClass : 's-detail-window',
            objInput : '.support-checkbox__input',
            customEvent : '.' + pluginName + (new Date()).getTime(),
            viewType : null,
            resizeStart : null,
            loadAfter : null
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.smg.support[personaPluginName].prototype = {
        init : function () {
            // PC 사이즈 일때 
            if (UTIL.winSize().w > BREAKPOINTS.MOBILE) {
                //setElements 함수 실행
                this.setElements();
                //initLayout 함수 실행 - checkbox 상태 값 체크 후 속성 추가 
                this.initLayout();
                //resizeFunc 함수 실행 
                this.resizeFunc();
                this.bindEvents();
            }
        },
        setElements : function () {
            this.objResetBtn = this.obj.find(this.opts.objResetBtn);
            this.objInput = this.obj.find(this.opts.objInput);
        },
        initLayout : function () {
            // clear all toggle button
            // 해당 checkbox가 checked 상태가 아니면, clear all button에 is-disabled class가 추가된다
            // checked 상태일 때, is-disabled class 제거됨 
            this.objResetBtn.toggleClass(this.opts.disabledClass, !this.objInput.prop('checked'));
            // 마찬가지로 checkbox가 checked 상태가 아니면, clear all button에 disabled 속성이 붙는다
            this.objResetBtn.prop('disabled', !this.objInput.prop('checked'));
        },
        changeEvents : function (event) {
            //정확하게 이해는 안가지만...
            // 이벤트 여러개를 ' '공백으로 구분해서 이벤트들을 events 배열에 넣는 함수인것 같다.
            var events = [],
                eventNames = event.split(' ');
            for (var key in eventNames) {
                events.push(eventNames[key] + this.opts.customEvent);
            }
            return events.join(' ');
        },
        bindEvents : function () {
            // 윈도우 resize, orientationchange(모바일 회전 변경 이벤트)가 일어날 때 resizeFunc 함수 실행
            $(win).on(this.changeEvents('resize orientationchange'), $.proxy(this.resizeFunc, this));
        },
        resizeBindEvents : function (type) {
            if (type) {
                // pc (type = true)
                // manual-download-filter-new__persona-box 요소들이 focusin mouseenter mouseleave 됐을 때 onHoverFunc 함수 실행
                this.obj.on(this.changeEvents('focusin mouseenter mouseleave'), $.proxy(this.onHoverFunc, this));
                // checkbox 상태가 변화될 때 onChangeFunc 함수 실행 
                this.objInput.on(this.changeEvents('change'), $.proxy(this.onChangeFunc, this));
                // s-btn-reset(Clear All)버튼이 클릭 되었을 때 onResetFunc 함수 실행
                this.objResetBtn.on(this.changeEvents('click'), $.proxy(this.onResetFunc, this));
            } else {
                // MO 버전일 때 해당 영역 실행 (type = false)
                // focusin mouseenter mouseleave , input change, reset button click 이벤트 제거 
                this.obj.off(this.changeEvents('focusin mouseenter mouseleave'));
                this.objInput.off(this.changeEvents('change'));
                this.objResetBtn.off(this.changeEvents('click'));
            }
        },
        resizeFunc : function () {
            this.winWidth = UTIL.winSize().w;
            if (this.opts.resizeStart == null) {
                // resizeStart 초기 null
                // resizeStart = this.winWidth;
                this.opts.resizeStart = this.winWidth;
                this.resizeAnimateFunc();
            }
            // resizeEndTime의 호출을 종료 시킨다 
            win.clearTimeout(this.resizeEndTime);
            // 0.15초 후에  resizeEndFunc를 호출 한다 
            this.resizeEndTime = win.setTimeout($.proxy(this.resizeEndFunc, this), 150);
        },        
        resizeEndFunc : function () {
            // resizeStart를 null로 초기화 
            this.opts.resizeStart = null;
            // resizeControl (pc일 경우 Event를 바인딩/ mo일 경우 Event 해제)
            this.resizeControl();
            // UTIL에 내장된 canclAFrame이 있는것 같은데. resizeRequestFrame을 window에서 호출 하는 것? 해석 안되는 부분
            UTIL.cancelAFrame.call(win, this.resizeRequestFrame);
        },
        resizeAnimateFunc : function () {
            // resizeControl 함수 실행 pc, mo 스크린 크기에 따른 resize 메서드 호출
            this.resizeControl();
            // 해석 안되는 부분 : requestAFrame이 win에서 resizeAnimateFunc메서드를 호출. -> resizeControl 호출 
            this.resizeRequestFrame = UTIL.requestAFrame.call(win, $.proxy(this.resizeAnimateFunc, this));
        },
        resizeControl : function () {
            //pc, mo 스크린 크기에 따른 resizeControl
            if (!UTIL.isSupportTransform || UTIL.isSupportTransform && (this.winWidth > BREAKPOINTS.MOBILE)) {
                if (this.opts.viewType !== 'pc') {
                    this.opts.viewType = 'pc';
                    this.resizeBindEvents(true);
                }
            } else {
                if (this.opts.viewType !== 'mo') {
                    this.opts.viewType = 'mo';
                    this.resizeBindEvents(false);
                }
            }
        },
        onChangeFunc : function () {
            if (this.objInput.filter(':checked').length) {
                this.objResetBtn.removeClass(this.opts.disabledClass);
                this.objResetBtn.prop('disabled', false);
            } else {
                this.objResetBtn.addClass(this.opts.disabledClass);
                this.objResetBtn.prop('disabled', true);
            }
        },
        onResetFunc : function () {
            // checkbox checked 속성 false로 지정 
            this.objInput.prop('checked', false);
            // chekcbox wrap에 is-checked 클래스 제거 
            this.objInput.closest(this.opts.inputWrap).removeClass(this.opts.checkedClass);
            // s-btn-reset(Clear All)에 is-disabled 클래스 추가
            this.objResetBtn.addClass(this.opts.disabledClass);
            // s-btn-reset(Clear All)에 disabled 속성 추가
            this.objResetBtn.prop('disabled', true);
            // manual-download-filter-new__persona에서 mouseleave Event Handler 발생 시킴 
            this.obj.triggerHandler('mouseleave');
        },
        onHoverFunc : function (e) {
            var target = $(e.currentTarget);
            //windowClass(s-detail-window)가 붙으면 hover 이벤트 실행안함 (onHoverFunc 함수 탈출)
            if (target.hasClass(this.opts.windowClass)) return;

            //마우스 오버되거나 포커스인 됐을 때
            if (e.type === 'mouseenter' || e.type === 'focusin') {
                // is-active 클래스를 가지고 있지 않으면 
                if (!target.hasClass(this.opts.activeClass)) {
                    // target에 is-active 클래스를 붙여준다
                    target.addClass(this.opts.activeClass);
                    // 키보드 focusout으로 mouseleave를 실행하기 위해 사용하는 것,,?
                    this.bindOutsideEvents(target, true);
                }
            } else if (e.type === 'mouseleave' || e.type === 'focusout') {
                // mouseleave 되거나 포커스아웃 됐을 때 
                // if checkbox가 checked(활성화)된 것이 존재하면 다음 줄 실행 안하고 나옴
                if (this.objInput.filter(':checked').length) return;
                // checkbox가 checked 된 것이 없고 mouseleave, focusout 됐을 때 실행                
                this.bindOutsideEvents(target, false);
            }
            this.outCallback('loadAfter');
        },
        bindOutsideEvents : function (target, type) {
            if (type) {
                // type 인자 값이 true이면
                // 여러개 .manual-download-filter-new__persona-box (obj)에서 is-active 삭제
                this.obj.removeClass(this.opts.activeClass);
                //target 바깥 영역에 focus(focusOut)
                target.on('focusoutside', $.proxy(function () {
                    // trigerHandler는 기본이벤트가 발생하지 않고 핸들러 함수만 mouseleave 발생시킨다
                    // div의 기본이벤트는 뭐지...?
                    target.triggerHandler('mouseleave');
                }, this));
                // 현재 target에 is-active 클래스가 붙는다 
                // (is-acitve 클래스가 붙으면 하위에 있는 manual-download-filter-new__persona-detail가 show된다)
                target.addClass(this.opts.activeClass);
            } else {
                if (target) {
                    //target이 있지만, type이 false 일때는(어떨때인지...)
                    // is-active 클래스 제거됨
                    // focusoutside 이벤트 제거 
                    target.removeClass(this.opts.activeClass);
                    target.off('focusoutside');
                }
            }
        },
        outCallback : function (ing) {
            //여기 잘 모르겠다 
            var callbackObj = this.opts[ing];
            if (callbackObj == null) return;
            callbackObj();
        },
    }

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
            this.globalObjs();
        },
        callComponent : function () {
            this.callPlugins = [];
            for (var i = 0, max = this.obj.length; i < max; i++) {
                // manual-download-filter-new 컴포넌트를 callPlugins에 push
                // globalObjsCall 호출
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
            //custom event의 PAGEIS.REPOSITON을 동작하게 함
        }
    }, UTIL.emitter);
    $(function () {
        win.supportManualDownloadFilterNew = new win.smg.support.manualDownloadFilterNewCall();
    });
})(window, window.jQuery, window.document);