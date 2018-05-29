//控制游戏是否结束
cc.Class({
    extends: cc.Component,

    properties: {
        _sceneLoading: false,
        //  scroeLabel: cc.Label,
    },
    start() {
        this.node.on('hit-bad-apple', this.onHitBadApple, this)
        cc.director.preloadScene('gameover')
    },
    onHitBadApple() {
        if (!this._sceneLoading) {
            //this._sceneLoading = true;
            cc.director.loadScene('gameover')
            cc.log('gameover');
        }
    },

});