import { Animation, IAnimationData } from './animation';
import {isArray, randomArrayItem} from '../utils/utils';
import {config} from '../config/config';
import {res} from '../utils/res';
import { IImage } from '../types/image';
import { Play } from '../scenes/play';

type IAnimation = IAnimationData & Animation;

export class Element{
    protected scene: any;
    public run: boolean;
    private enter: boolean;
    private life: number;
    public isDeath: boolean;
    private deg: number;
    protected rotateState: boolean | null;
    protected rotateSpeed: number;
    protected textRise: number;
    protected text: string;

    protected img: IImage | null;
    private animation: IAnimation | null;
    private runAnimation: IAnimation | null;
    public w: number;
    public h: number;
    public x: number;
    public y: number;
    protected initY: number;

    constructor(scene: Play) {
        this.scene = scene;
        this.img = null;
        this.run = true;
        this.enter = false;
        this.isDeath = false;
        this.life = 1;
        this.deg = 0;
        this.rotateState = null;
        this.rotateSpeed = 2;
        this.textRise = 15;
        this.text = 'text';
        this.animation = null;
        this.runAnimation = null;

        this.w = 0;
        this.h = 0;
        this.x = 0;
        this.y = 0;
        this.initY = 0;
    }

    setup(obj: string) {
        const _obj = config[obj];
        Object.keys(_obj).map((key) => {
            if (key === 'img') {
                if (isArray(_obj[key])) {
                    this.img = res.imageBy(randomArrayItem(_obj[key]));
                    return;
                }
                this.img = res.imageBy(_obj[key]);
                return;
            }
            this[key] = _obj[key];
        });
        if (this.animation){

            this.animation = Object.assign({
                img : this.img,
            },this.animation);

            this.runAnimation = new Animation(this.animation as IAnimation, this.scene) as IAnimation;
        }
    }

    update() {
        this.run ? this.draw() : this._deathing();
        this.limitDetection();
    }

    limitDetection() {
        if (this.isEnter()) {
            this.enter = true;
        }
        if (this.enter) {
            if (this.isOut()) {
                this.isDeath = true;
            }
        }
    }

    getDrawInfo(isRotate=false) {
        return [
            this.img,
            isRotate ? -this.w/2 :this.x,
            isRotate ? -this.h/2 :this.y,
            this.w,
            this.h,
        ]
    }

    draw() {
        if (this.rotateState) {
            return this.rotate();
        }
        if (this.runAnimation){
            // @ts-ignore
            return this.runAnimation.play({
                x: this.x,
                y: this.y,
                w: this.w,
                h : this.h,
            });
        }
        this.scene.draw(this.getDrawInfo());
    }
//todo types any
    drawText(callback: any) {
        this.setInitY();
        this.scene.setFontStyle();
        this.y--;
        this.scene.drawText({
            text: this.text,
            x: this.x,
            y : this.y,
        });
        if (this.initY - this.y > this.textRise) {
            callback && callback();
        }
    }

    rotate() {
        this.deg+=this.rotateSpeed;
        this.scene.rotateDraw({
            deg: this.deg,
            x: this.x + this.w / 2,
            y: this.y + this.h / 2,
            data: this.getDrawInfo(true),
        })
    }

    reduceLife() {
        this.life--;
        if (this.life <= 0) {
            this.death();
        }
    }

    death() {
        this.run = false;
    }

    _deathing() {
        // @ts-ignore
        if (this.deathing) {
            // @ts-ignore
            this.deathing();
            return;
        }
        this.isDeath = true;
    }

    setInitY() {
        if (this.initY) {
            return;
        }
        this.initY = this.y;
    }

    isEnter() {
        const { w, h } = config.game;
        return (
            this.x > 0 &&
            this.y > 0 &&
            this.x < w &&
            this.y < h
        );
    }

    isOut() {
        const { w, h } = config.game;
        return (
            this.x < -this.w ||
            this.y < -this.h ||
            this.x > w ||
            this.y > h
        );
    }

}
