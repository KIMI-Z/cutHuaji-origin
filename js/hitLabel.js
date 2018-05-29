//屏幕闪烁的特效
cc.Class({
    extends: cc.Component,

    properties: {

    },

    init() {

    },

    start() {
        let action1 = cc.moveBy(1.5, 0, 100);
        let action2 = cc.fadeOut(1.5);
        let action3 = cc.spawn(action1, action2);
        let action4 = cc.moveBy(1, 0, 10);
        let finish = cc.callFunc(function () {

            cc.find('Canvas').getChildByName('controller').getComponent('controller').check();

        }, this)
        this.action = cc.sequence(action3, action4, finish)
        this.node.stopAllActions();
        this.node.runAction(this.action);
    },

    // update (dt) {},
});