//控制主游戏
cc.Class({
    extends: cc.Component,

    properties: {
        itemPrefabArray: [cc.Prefab],
        speed: 500,
        g: -120,
        deltaNum: 0.2,
        currentNum: 1,
        delay: 3,
        motionNode: cc.Node,
        //分数
        _score: 0,
        scoreLabel: cc.Label,

        //最大连击
        _maxHit: 0,
        maxHitLabel: cc.Prefab,

        PausePage: cc.Node,

        partic: cc.ParticleSystem,
    },
    //暂停游戏
    onStop() {
        if (cc.director.isPaused()) {
            cc.director.resume();
            this.PausePage.active = false;
        } else {
            cc.director.pause();
            this.PausePage.active = true;
        }

    },
    //加分
    addScore(location) {
        this._maxHit += 1;
        this._score += 10 * (this._maxHit);
        this.scoreLabel.string = this._score;
        let maxHitlabel = cc.instantiate(this.maxHitLabel);

        //写了一个连击效果
        maxHitlabel.getComponent('hitLabel').init();
        maxHitlabel.parent = this.node.parent;
        maxHitlabel.getComponent(cc.Label).string = this._maxHit + '连击'
        maxHitlabel.setPosition(location);

    },
    //有时候我的代码会觉得没什么屌用 但是又不敢删除
    check() {
        let children = this.node.childrem;
        for (let x in children) {
            children[x].node.destroy();
        }
    },
    onLoad() {
        this.PausePage.active = false;
        this.scoreLabel.string = this._score;
        cc.director.getCollisionManager().enabled = true;
        var self = this;
        this.generate();
        this.schedule(this.generate, this.delay)
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_START, function (e) {
            self.partic.resetSystem();
            self.motionNode.x = e.getLocation().x
            self.motionNode.y = e.getLocation().y
        })
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_MOVE, function (e) {
            //self.motionNode.active = true;
            self.motionNode.x = e.getLocation().x
            self.motionNode.y = e.getLocation().y
        })
        cc.find('Canvas').on(cc.Node.EventType.TOUCH_END, function (e) {
            self.partic.stopSystem();
            // self.motionNode.active = false;
        })
    },
    //发射一波滑稽
    generate() {
        this.currentNum += this.deltaNum;
        let realCurrentNum = Math.floor(this.currentNum);
        for (let i = 0; i < realCurrentNum; i++) {
            let randomIdx = Math.floor(Math.floor(Math.random() * this.itemPrefabArray.length));
            let item = cc.instantiate(this.itemPrefabArray[randomIdx]);
            let randomVector = cc.pNormalize(cc.v2(cc.randomMinus1To1() * 0.3, 1));
            item.parent = this.node.parent;
            item.position = this.node.position;
            item.getComponent('throwItem').Init(cc.pMult(randomVector, this.speed * (cc.random0To1() * 0.1 + 0.95)), this.g);
            //  cc.log('实例化对象成功')
        }
    },
    // update (dt) {},
});