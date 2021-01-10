import {Plane} from './plane';
import {random} from '../utils/utils';
import {config} from '../config/config';

export class Fuel extends Plane {

    // todo: type
    constructor(props: any) {
        super(props);
        this.rotateState = null;
        this.rotateSpeed = 0;
        this.textRise = 0;
        this.text = '';
    }
    setup() {
        const { w, h } = config.game;
        super.setup('fuel');
        this.x = random(0, w / 2);
        this.rotateState = true;
        this.rotateSpeed = 0.5;
        this.textRise = 20;
        this.text = '+15';
    }

    move() {
        this.y -= this.speed;
    }

    update() {
        if (this.run) {
            this.move();
        }
        super.update();
    }

    deathing() {
        this.drawText(() => {
            this.isDeath = true;
        });
    }
}
