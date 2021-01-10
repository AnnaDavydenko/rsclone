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
        (this.cooldown as number)--;
        return this;
    }
    //todo: types
    active(callback:any) {
        if (this.cooldown <= 0) {
            this.reset();
            callback();
        }
    }

    reset() {
        this.cooldown = this.getCooldown(this.initCooldown as Array<number>);
    }
}
