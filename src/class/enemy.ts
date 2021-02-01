import {Plane} from './plane';
import {config} from '../config/config';
import {random} from '../utils/utils';

export class Enemy extends Plane{

    setup() {
        const { level } = this.scene.game.data;
        const { w, h } = config.game;
        super.setup('enemy');
        this.y = random(0, h-this.h);
        if(level>1){
           this.speed -= (level-1);
        }

        this.initBullet('enemyBullet', this.scene.enemyBullets);
    }

    update() {
        if (this.run) {
            const { level, prevLevel, levelChanged } = this.scene.game.data;
            if (levelChanged) {
                if (level > prevLevel) {
                    this.speed -= 1;
                }
                if (level < prevLevel) {
                    this.speed += 1;
                }
            }
            this.move();
            if (this.isEnter()) {
                this.fire();
            }
        }
        super.update();
    }
}
