import {Plane} from './plane';
import {random} from '../utils/utils';
import {config} from '../config/config';

export class Friend extends Plane {
    
    setup() {
        const { w, h } = config.game;
        super.setup('friend');
        this.y = random(0, h-this.h);
    }

    update() {
        if (this.run) {
            this.move();  
        }
        super.update();
    }
}