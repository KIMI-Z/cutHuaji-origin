//控制绿色滑稽
cc.Class({
    extends: cc.Component,

    properties: {

    },
    start() {
        this.node.on('touch', this.onTouch, this);
    },
    onTouch() {
        cc.find('Canvas').emit('hit-bad-apple');
    },

    // update (dt) {},
});