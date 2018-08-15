(function (win, $, doc) {
    'use strict';
    win.smg = win.smg || {};
    win.smg.support = win.smg.support || {};
    win.smg.support.common = win.smg.support.common || {};
    
    var CST_EVENT = win.smg.support.common.customEvent,
        UTIL = win.smg.support.common.util,
        BREAKPOINTS = win.smg.support.common.breakpoints,
        PAGE = win.smg.support.page,
        pluginName = 'manualDownloadFilter',
        filterpluginName = 'filterModulePlugin',
        personaPluginName = 'personaBoxPlugin';

    win.smg.support[pluginName] = function(container, args){
        var defParams = {
            obj : container,
            filterModule: '.manual-download-filter-new__module',
            personaBox: '.manual-download-filter-new__persona-box',
            filterModulePlugins: [],
            personaBoxPlugins: [],
            loadAfter : null
        }
        this.opts = UTIL.def(defParams, (args || {}));
        if(!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };

    win.smg.support[pluginName].prototype = {
        init : function(){
            this.setElements();
            this.pluginCall();
        },
        setElements : function(){
            this.filterModule = this.obj.find(this.opts.filterModule);
            this.personaBox = this.obj.find(this.opts.personaBox);
        },
        pluginCall : function(){
            var _this = this;
            // for(var i=0, max = this.filterModule.length; i<max; i++){
            //     (function(index){
            //         var target = _this.filterModule.eq(index);
            //         _this.opts.filterModulePlugins.push(new win.smg.support[filterpluginName](target, {
            //             loadAfter : $.proxy(_this.loadAfterFunc, _this)
            //         }));
            //     })(i);
            // }
            for(var i=0, max=this.personaBox.length; i<max; i++){
                (function(index){
                    var target = _this.personaBox.eq(index);
                    _this.opts.personaBoxPlugins.push(new win.smg.support[personaPluginName](target));
                })(i);
            }
        },
        loadAfterFunc : function(){
            this.outCallback('loadAfter');
        },
        outCallback : function(ing) {
            var callbackObj = this.opts[ing];
            if(callbackObj == null) return;
            callbackObj();//?
        }
    }

    //personaBox 
    // win.smg.support[personaPluginName] = function(container, args){
    //     var defParams = {
    //         obj : container
    //     };
    //     this.opts = UTIL.def(DefParams, (args || {}));
    //     if(!(this.obj = $(this.opts.obj)).length) return;
    //     this.init();
    // };

    // win.smg.support[personaPluginName].prototype = {
    //     init : function(){
    //         console.log(obj);
    //     }
    // }


    //컴포넌트 모듈화
    win.smg.support.manualDownloadFilterNewCall = function (args) {
        var defParams = {
            obj: '.manual-download-filter-new'
        };
        this.opts = UTIL.def(defParams, (args || {}));
        if (!(this.obj = $(this.opts.obj)).length) return;
        this.init();
    };
    win.smg.support.manualDownloadFilterNewCall.prototype = UTIL.def({
        init: function () {
            this.callComponent();
            this.globalObjs();
        },
        callComponent: function () {
            this.callPlugins = [];
            for (var i = 0, max = this.obj.length; i < max; i++) {
                this.callPlugins.push(new win.smg.support[pluginName](this.obj.eq(i), {
                    loadAfter: $.proxy(this.globalObjsCall, this)
                }));
            }
        },
        globalObjs: function () {
            for (var i = 0, max = this.callPlugins.length; i < max; i++) {
                CST_EVENT.PAGEIS.PAGEOBJS.push(this.callPlugins[i]);
            }
        },
        globalObjsCall: function () {
            CST_EVENT.PAGEIS.EVENT_MANAGER.trigger(CST_EVENT.PAGEIS.REPOSITION);
       }
    }, UTIL.emitter);
    $(function () {
        win.supportManualDownloadFilterNew = new win.smg.support.manualDownloadFilterNewCall();
    });
        
})(window, window.jQuery, window.document)