//被切成两半的滑稽
cc.Class({
    extends: cc.Component,

    properties: {
        _gravity: null,
        _speed: null,
        brekDrag: 0.3,
        _solving: false,
    },

    // LIFE-CYCLE CALLBACKS:
    // onLoad () {},
    init(throwItemScript, rate) {
        //计算trim的rate和start
        this.node.color = throwItemScript.node.color
        // let spriteComponent = cc.instantiate(throwItemScript.getComponent(cc.Sprite))
        this._gravity = throwItemScript._gravity;
        let originSpriteComponent = throwItemScript.node.getComponent(cc.Sprite);
        let selfSpriteComponent = this.node.getComponent(cc.Sprite);
        selfSpriteComponent.fillStart = rate;
        selfSpriteComponent.spriteFrame = originSpriteComponent.spriteFrame;
        // let spriteRef = this.node.addComponent(cc.Sprite);
        //spriteRef = spriteComponent;
        // spriteComponent.node = this.node;
        this.node.parent = throwItemScript.node.parent;
        this.node.position = throwItemScript.node.position;

        // spriteComponent.fillStart = rate;
        //spriteComponent.fillRange = 0.5;
        this._speed = cc.pMult(cc.pForAngle((360 * rate - 180) * Math.PI / 180), throwItemScript._speed.mag() * this.brekDrag);
        this._speed = cc.v2(this._speed.y, -this._speed.x);
        this.scheduleOnce(function () {
            cc.find('Canvas').getChildByName('bg').active = false;
        }, 0.1);
    },

    update(dt) {
        this._speed = cc.pAdd(this._speed, cc.v2(0, this._gravity * dt));
        this.node.position = cc.pAdd(this.node.position, cc.pMult(this._speed, dt));
        if (this.node.x < -568 || this.node.x > 568 || this.node.y > 320 || this.node.y < -320) {
            if (!this._solving) {
                this._solving = true;
                this.node.removeFromParent(true);
            }
        }
    },
});