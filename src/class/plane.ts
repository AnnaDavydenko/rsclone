import { Animation } from './animation';
import { Element } from './element';
import { Cooldown } from './cooldown';
import { config } from '../config/config';
import { Bullet } from './bullet';
import { Play } from '../scenes/play';

export class Plane extends Element {
    private bulletCooldown: Cooldown | null;
    private deathAnimation: Animation | null;
    private canFire: boolean | null;
    private bullet: Bullet | null;
    private bullets: Array<number>;
    protected isPlayer: boolean | null;
    protected speed: number;

    constructor(scene: Play) {
        super(scene);
        this.bulletCooldown = null;
        this.deathAnimation = null;
        this.canFire = null;
        this.bullet = null;
        this.bullets = [];
        this.isPlayer = null;
        this.speed = 0;
    }

    setup(obj: string) {
        super.setup(obj);
        this.bulletCooldown = new Cooldown(config[obj].bulletCooldown);
        this.deathAnimation = new Animation(config.planeDeathAnimation, this.scene);
        this.canFire = true;
    }

    initBullet(bulletType: string, bulletArray: Array<number>) {
        this.bullet = // @ts-ignore
            class bullet extends Bullet {
                setup() {
                    super.setup(bulletType);
                }
            };
        this.bullets = bulletArray;
    }

    update() {
        super.update();
        this.bulletCooldown?.update().active(() => {
            this.canFire = true;
        });
    }

    move() {
        this.x += this.speed;
    }

    fire() {
        if (!this.canFire) {
            return;
        }
        this.canFire = false;
        const bullet = this.scene.factory(this.bullet);
        bullet.x = this.isPlayer ? this.x + this.w : this.x;
        bullet.y = this.y + this.h / 2 - bullet.h / 2;
        this.bullets.push(bullet);
    }
}
