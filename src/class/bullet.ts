import {Animation} from './animation';
import {Element} from './element';
import {config} from '../config/config';

export class Bullet extends Element {
    private deathAnimation: Animation | null;
    private readonly speed: number;

    // todo: type
    constructor(props: any) {
        super(props);
        this.deathAnimation = null;
        this.speed = 0;
    }

    public setup(bulletType: string) {
        super.setup(bulletType);
        this.deathAnimation = new Animation(config.bulletDeathAnimation, this.scene);
    }

    public update() {
        if (this.run) {
            this.move();
        }
        super.update();
    }

    public move() {
        this.x += this.speed;
    }

    // @ts-ignore
    deathing() {
        this.deathAnimation?.play({
            x: this.x,
            y: this.y,
            w: this.w,
            h : this.h * 1.5,
        })?.end(() => {
            this.isDeath = true;
        });
    }
}
