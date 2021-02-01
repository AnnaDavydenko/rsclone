import {Element} from './element';
import {config} from '../config/config';
import {random} from '../utils/utils';
import { IImage } from '../types/image';
import { Play } from '../scenes/play';

export class Star extends Element {
    protected img: IImage | null;
    private speed: number;

    constructor(props: Play) {
        super(props);
        this.img = null;
        this.speed = 0;
    }

    setup() {
        const { w, h } = config.game;
        super.setup('star');
        const size = (this.img as IImage).width > 100 ? random(10,30)*0.01 : 1;
        this.w = (this.img as IImage).width * size;
        this.h = (this.img as IImage).height * size;
        this.speed = -this.w * 0.05;
        this.x = w + this.w;
        this.y = random(0, h - this.h);
    }

    move() {
        this.x += this.speed;
    }

    update() {
        this.move();
        super.update();
    }
}
