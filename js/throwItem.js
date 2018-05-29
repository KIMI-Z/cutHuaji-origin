//扔出的滑稽
//            .,,.                                     
//       ;;,,,,,,,,,,;;                              
//     ;;;,,,::::::,,,;;;:               
//    ;####t,,::::::j####i               
//   W      Wi....GE      W              
//  ##        E..f##                     
// #### #G##  .:.#### #K#,  #            
// ####;;;,,t#W::####;,;;i#L#                    
// itiii;;;;,,,,,,,,,;;;iiitt                     
// .tttiii;;;;;;;;;;;;iiiittj                      
//  jttttiiiii;;;;;iiiiittDj                       
//   jDtttttiiiiiiiiittttGj:                       
//   .jjjjttttttttttttjjLj                         
//      jjDjjjjjjjjjjEjj;                              
//         jfjffjfffj                    
//            .jj;                                 
cc.Class({
    extends: cc.Component,

    properties: {
        _gravity: -100,
        _speed: null,
        _radius: null,
        breakPrefab: cc.Prefab,
        _solving: false,
        Rate: 0,

    },
    Init(initSpeed, gravity) {
        this._gravity = gravity;
        this._speed = initSpeed;
        this._radius = this.node.getComponent(cc.CircleCollider).radius;
        //注册触摸事件
        cc.find('Canvas').on('touchmove', this.onTouchMove, this);
        cc.find('Canvas').on('touchstart', this.onTouchMove, this);
    },
    onTouchMove(e) {
        if (this._solving) {
            return
        }
        if (this.checkTouch(e.getLocation())) {
            this._solving = true;
            this.node.emit('touch');
            this.break();
            this.node.removeFromParent();
        }
    },
    onCollisionEnter(other) {
        // cc.log('碰撞')
        // this._solving = true;
        // this.node.emit('touch');
        // this.break();
        // this.node.removeFromParent();
    },
    //破碎的滑稽
    break () {
        // cc.log('break')
        let randomRate = Math.random() * 0.5;
        cc.find('Canvas').getChildByName('controller').getComponent('controller').addScore(cc.v2(this.node.x, this.node.y))
        let breakItemOne = cc.instantiate(this.breakPrefab);
        breakItemOne.getComponent('breakItem').init(this, this.Rate);
        let breakItemTwo = cc.instantiate(this.breakPrefab);
        breakItemTwo.getComponent('breakItem').init(this, this.Rate + 0.5);
    },

    checkTouch(location) {
        let node = this.node;
        let pointInNode = node.convertToNodeSpaceAR(location);
        let radius = this._radius;
        let dir = cc.v2(pointInNode.x, pointInNode.y);
        if (dir.mag() < radius) {
            cc.find('Canvas').getChildByName('bg').active = true;
            let autoRate = (-Math.cos(cc.pToAngle(dir) / Math.PI * 180) + 1) / 4;
            this.Rate = autoRate;
            return true;
        }
        //  cc.log('距离', dir.x, dir.y)
        // let vert = this._radius;
    },
    //回收多余的
    update(dt) {
        this._speed = cc.pAdd(this._speed, cc.v2(0, this._gravity * dt));
        this.node.position = cc.pAdd(this.node.position, cc.pMult(this._speed, dt));
        if (this.node.x < -568 || this.node.x > 568 || this.node.y > 320 || this.node.y < -600) {
            if (this.node.name == 'huaji')
                cc.find('Canvas').getChildByName('controller').getComponent('controller')._maxHit = 0;
            if (!this._solving) {
                this._solving = true;
                this.node.removeFromParent(true);
            }
        }
    },
});