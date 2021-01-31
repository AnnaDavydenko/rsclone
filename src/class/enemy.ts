import {Plane} from './plane';
import {config} from '../config/config';
import {random} from '../utils/utils';

export class Enemy extends Plane{

    setup() {
        const { w, h } = config.game;
        super.setup('enemy');
        this.y = random(0, h-this.h);
        this.initBullet('enemyBullet', this.scene.enemyBullets);
    }

    update() {
        if (this.run) {
            if (this.scene.game.data.score % 10 === 0) {
                this.speed -= 1;
            }
            this.move();
            if (this.isEnter()) {
                this.fire();
            }
        }
        super.update();
    }
}
