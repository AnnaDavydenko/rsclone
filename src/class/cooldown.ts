import {isArray, random} from '../utils/utils';

export class Cooldown{
    protected cooldown: Array<number> | number; //
    protected initCooldown: Array<number>;

    constructor(cooldown: Array<number>, notImmediately = false) {
        this.cooldown = notImmediately ? this.getCooldown(cooldown) : 0; //
        this.initCooldown = cooldown;
    }

    getCooldown(cooldown: Array<number>) {
        if (isArray(this.initCooldown)) {
            const [start, end] = this.initCooldown as Array<number>;
            return random(end, start);
        }
        return cooldown;
    }

    update() {
        // @ts-ignore
        this.cooldown--;
        return this;
    }

    active(callback: () => void) {
        if (this.cooldown <= 0) {
            this.reset();
            callback();
        }
    }

    reset() {
        this.cooldown = this.getCooldown(this.initCooldown as Array<number>);
    }
}
