//失败页面
cc.Class({
    extends: cc.Component,

    properties: {


    },
    start() {
        cc.director.preloadScene('scene');
    },
    onButtonDown() {
        cc.director.loadScene('scene');
    },
});