//加分的滑稽
cc.Class({
    extends: cc.Component,

    properties: {

    },

    start() {
        this.node.on('touch', this.onTouch, this);
    },
    onTouch() {
        cc.find('Canvas').emit('hit-good-apple');
    },

});