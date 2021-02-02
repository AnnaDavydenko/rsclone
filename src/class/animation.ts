import { Cooldown } from './cooldown';
import { isImage } from '../utils/utils';
import { res } from '../utils/res';
import { Scene } from './scene';

export interface IAnimationData {
    col: number;
    cooldown: Array<number> | number;
    img: HTMLImageElement | string;
    loop: boolean;
    row: number;
}

interface IInfo {
    h: number;
    w: number;
    x: number;
    y: number;
}

export class Animation {
    private img: HTMLImageElement;
    protected cooldown: Cooldown;
    protected col: number;
    private row: number;
    private loop: boolean;
    private w: number;
    private h: number;
    private index: number;
    private len: number;
    private isEnd: boolean;
    private scene: Scene;

    constructor(data: IAnimationData, scene: Scene) {
        this.img = (isImage(data.img as HTMLImageElement) ? data.img : res.imageBy(data.img as string)) as HTMLImageElement;
        this.cooldown = new Cooldown(data.cooldown as Array<number>);
        this.col = data.col;
        this.row = data.row;
        this.loop = data.loop;
        this.w = this.img.width / this.row;
        this.h = this.img.height / this.col;
        this.index = 0;
        this.len = this.row * this.col;
        this.isEnd = false;
        this.scene = scene;
    }

    public play(info: IInfo) {
        if (this.isEnd) return this;
        this.draw(info);
        this.cooldown.update().active(() => {
            this.index++;
        });
        if (this.loop) {
            if (this.index === this.len) {
                this.index = 0;
            }
        } else {
            return this;
        }
    }

    getPos() {
        return {
            x: this.index % this.row,
            y: Math.floor(this.index / this.row),
        };
    }

    draw(info: IInfo) {
        const pos = this.getPos();
        const x = pos.x * this.w;
        const y = pos.y * this.h;
        this.scene.draw([
            this.img,
            x, y, this.w, this.h, info.x, info.y, info.w, info.h,
        ]);
    }

    end(callback: () => void) {
        if (this.index === this.len) {
            this.isEnd = true;
            callback();
        }
    }
}
