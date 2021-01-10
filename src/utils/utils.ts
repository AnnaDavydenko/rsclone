import {Player} from "../class/player";
import { IElement } from '../types/game';

type IElementEvent = {
    callback: any,
    once: boolean,
    enable: boolean
}

type Iaudio = {
    bg: string,
    destroyed: string,
    shoot: string
}

type IStorageData = {
    name: string,
    score: number,
    time: number,
}

export const log = console.log.bind(console);

export const $ = (elem: string ) => document.querySelector(elem);

export const $s = (elem: string) => document.querySelectorAll(elem);

export const style = (el: HTMLElement, styleObj: {width: string, height: string}) => {
    for (const i in styleObj) {
        el.style[i] = styleObj[i];
    }
}

export const on = (el: Element | Window, type: string, callback: any) => {
    el.addEventListener(type, callback);
}

export const numberFormat = (num: number) => {
    const isPlus = num >= 0;
    const n = Math.abs(num);
    const res = n > 9 ? n : '0' + n;
    return isPlus ? res : `-${res}`;
};

export const random = (end: number, start: number) => {
    return Math.floor(Math.random() * (end - start)) + start;
};

export const randomArrayItem = (array: Array<any>) => {
    return array[random(0, array.length)];
};

export const isArray = (array: Array<number>) => {
    return array instanceof Array;
}

export const isImage = (img: HTMLImageElement) => {
    return img instanceof Image;
}

// export const isPlayer = (player) => {
//     return player instanceof Player;
// }

export const raf = (() => {

    let events = {};

    const reg = (id: string, callback: any) => {
        if (events[id]) {
            return console.error('id existed');
        }
        events[id] = callback;
    };

    const remove = (id: string) => {
        if (!events[id]) return;
        delete events[id];
    };

    const clearAll = () => {
        events = {};
    };

    const update = () => {
        for (const fn of Object.values(events)) {
            (fn as () => void)();
        }
        requestAnimationFrame(update);
    }

    update();

    return {
        reg: reg,
        remove: remove,
        clearAll: clearAll,
    }

})();

export const hotkey = (() => {

    let data = {};

    const regKeyCode = (keyCode: string) => {
        data[keyCode] = {
            active: false,
            events: [],
        }
    }

    const loop = () => {
        for (const key of Object.keys(data)) {
            const event = data[key];
            if (!event.active) {
                continue;
            }
            event.events.forEach((el: IElementEvent) => {
                if (el.enable) {
                    el.callback();
                }
                if (el.once) {
                    el.enable = false;
                }
            });
        }
    };

    raf.reg('HotKey_loop', loop);

    on(window, 'keydown', (e: KeyboardEvent) => {
        const keyCode = e.key?.toLocaleUpperCase();
        if (!data[keyCode]) {
            return;
        }
        e.preventDefault();
        data[keyCode].active = true;
    });
    on(window, 'keyup', (e: KeyboardEvent) => {
        const keyCode = e.key?.toLocaleUpperCase();
        if (!data[keyCode]) {
            return;
        }
        data[keyCode].active = false;
        data[keyCode].events
            .filter((el: IElementEvent) => el.once)
            .forEach((el: IElementEvent) => el.enable = true);
    });


    loop();


    return {
        reg: (keyCode: string, callback: any, once = false) => {
            keyCode = "" + keyCode;
            keyCode = keyCode.toLocaleUpperCase();
            if (!data[keyCode]) {
                regKeyCode(keyCode);
            }
            data[keyCode].events.push({
                once,
                callback,
                enable: true,
            })
        },
        clearAll: () => {
            data = {};
        }
    }

})();


export const loadResource = (list: any, Obj: any, callback: any) => {
    const keys = Object.keys(list);
    const result = {};
    const len = keys.length;
    // Obj Type is Image or Audio
    const load = Obj === Image ? 'onload' : 'onloadedmetadata';
    let count = 0;
    const call = (obj: HTMLImageElement, key: string) => {
        count++;
        result[key] = obj;
        if (len === count) {
            callback(result);
        }
    };
    keys.map((key) => {
        const obj = new Obj();
        obj.src = list[key];
        obj[load] = () => {
            call(obj, key)
        };
    });
}

export const loadImages = (images: any, callback: any) => {
    return loadResource(images, Image, callback);
};


export const loadAudios = (audios: Iaudio, callback: any) => {
    return loadResource(audios, Audio, callback);
};

export const incrementAnimation = (start: number, end: number, callback: any) => {
    let current = start;
    const status = start < end;
    const time = setInterval(() => {
        status ? current++ : current--;
        callback(current);
        if (current === end) {
            clearInterval(time);
        }
    }, 30)
}

export const localStorageData = (() => {


    const add = (key: string, obj: IStorageData) => {
        const item = get(key);
        item.data.push(obj);
        localStorage.setItem(key, JSON.stringify(item));
    }

    const get = (key: string) => {
        return JSON.parse((localStorage.getItem(key) as string)) || {
            data: [],
        };
    }

    const update = (key: string, data: Array<IStorageData>) => {
        localStorage.setItem(key, JSON.stringify({
            data,
        }));
    }
    return {
        add: add,
        get: get,
        update: update,
    }

})();
