import {Plane} from './plane';
import {config} from '../config/config';
import {hotkey} from '../utils/utils';
import {res} from '../utils/res';

export class Player extends Plane {
    protected isPlayer: boolean | null;
    constructor(props: any) {
        super(props);
        this.isPlayer = null;
    }

    setup() {
        super.setup('player');
        this.initBullet('playerBullet', this.scene.playerBullets);
        this.event();
        this.isPlayer = true;
    }

    up() {
        if (this.y <= 0) return;
        this.y-=this.speed;
    }
    left() {
        if (this.x <= 0) return;
        this.x-=this.speed;
    }
    right() {
        if (this.x+this.w >= config.game.w) return;
        this.x+=this.speed;
    }
    down() {
        if (this.y+this.h >= config.game.h) return;
        this.y+=this.speed;
    }
//todo any
    event() {
        const called = (callback: any) =>{
            if (!this.run) return;
            if (this.scene.pauseFlag) return;
            if (this.scene.game.data.end) return;
            callback.call(this);
        };
        const keys = {
            'w': this.up,
            'a': this.left,
            's': this.down,
            'd': this.right,
        };
        Object.keys(keys).map((key) => {
            hotkey.reg(key, () => {
               called(keys[key]);
            });
        });

        hotkey.reg(' ', () => {
            called(()=>{
                res.replay('shoot');
                this.fire();
            });
        }, true);
    }
}
