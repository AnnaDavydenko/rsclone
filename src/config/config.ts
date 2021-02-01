import boom from "../assets/img/boom.png";
import player from "../assets/img/plane/player.png";
import friend from "../assets/img/plane/friend.png";
import enemy from "../assets/img/plane/enemy.png";
import playerBullet from "../assets/img/playerBullet.png";
import enemyBullet from "../assets/img/enemyBullet.png";
import fuel2 from "../assets/img/fuel-station.png";
import star_1 from "../assets/img/star/star_1.png";
import star_2 from "../assets/img/star/star_2.png";
import star_3 from "../assets/img/star/star_3.png";
import star_4 from "../assets/img/star/star_4.png";
import star_5 from "../assets/img/star/star_5.png";
import star_6 from "../assets/img/star/star_6.png";
import star_7 from "../assets/img/star/star_7.png";
import star_8 from "../assets/img/star/star_8.png";
import star_9 from "../assets/img/star/star_9.png";
import star_10 from "../assets/img/star/star_10.png";
import star_11 from "../assets/img/star/star_11.png";
import star_12 from "../assets/img/star/star_12.png";
import star_13 from "../assets/img/star/star_13.png";
import star_14 from "../assets/img/star/star_14.png";
import star_15 from "../assets/img/star/star_15.png";
import star_16 from "../assets/img/star/star_16.png";
import meteorites_1 from "../assets/img/meteorites/meteorites_1.png";
import meteorites_2 from "../assets/img/meteorites/meteorites_2.png";
import meteorites_3 from "../assets/img/meteorites/meteorites_3.png";
import meteorites_4 from "../assets/img/meteorites/meteorites_4.png";
import meteorites_5 from "../assets/img/meteorites/meteorites_5.png";

// @ts-ignore
import background from "../assets/sound/background.mp3";
// @ts-ignore
import destroyed from "../assets/sound/destroyed.mp3";
// @ts-ignore
import shoot from "../assets/sound/shoot.mp3";

export const fps = 60;
//
// interface IConfig {
//     game: any;
// }

export const config: any = (() => {
    const config: any = {};
    // common

    const plane = (callback: any = false) => {
        const o = {
            w: 70,
            h: 70,
            x: 0,
            y: 0,
            img : 'player',
            speed: 4,
            bulletCooldown : 5 * fps,
        }
        if (!callback) {
            return o;
        }
        const data = callback(o);
        for (const key of Object.keys(data)){
            o[key] = data[key]
        }
        return o;
    }

    const planeAnimation = ()=>{
        return {
            loop : true,
            col : 1,
            row : 4,
            cooldown : 0.15 * fps,
        }
    }

    const bullet = (() => {
        return {
            w: 20,
            h: 10,
            x: 0,
            y: 0,
            speed : 4,
        };
    })

    const batchAdd = (url: string, name: string, count: number, ext: string) => {
        const images = {};
        for (let i = 1; i <= count; i++){
            images[name + i] = url + name + i +'.'+ ext;
        }
        return images;
    }

    const batchImport = (name: string, count: number) => {
        const images = [];
        for (let i = 1; i <= count; i++){
            images.push(name + i);
        }
        return images;
    };

    // config

    config.game = {
        w: window.innerWidth,
        h: window.innerHeight,
        fontSize : {
            min : 12,
            max : 30,
            val : 16,
        },
        appendEnemyCooldown: [2 * fps, 5 * fps],
        appendFriendCooldown : [2*fps,5*fps],
        appendFuelCooldown : [2*fps,5*fps],
        appendStarCooldown : [1*fps,2*fps],
    }

    config.fuelConfig = {
        fuelLoseSpeed: -1,
        fuelRaiseSpeed: 15,
        fuelMax: 30,
        beingHit : -15,
    }
    config.scoreConfig = {
        shootEnemy: 5,
        shootMeteorite: 10,
        shootFriend: -10,
    }

    config.data = () => {
        return {
            level: 1,
            prevLevel: 1,
            fuel: 15,
            score: 0,
            shoot: 0,
            time : 0,
            name : '',
        }
    }

    config.player = (() => {

        const { h } = config.game;

        const o = plane((x: {h: number}) => {
            return {
                y: h / 2 - x.h / 2,
                bulletCooldown: 0.5 * fps,
                animation : planeAnimation(),
            }
        });

        return o;

    })();

    config.enemy = (() => {

        const { w } = config.game;

        const o = plane((o: {w:number}) => {
            return {
                x: w + o.w,
                speed: -3,
                img : 'enemy',
                animation : planeAnimation(),
            }
        })

        return o;

    })();

    config.meteorite = (() => {

        const { w } = config.game;

        const o = plane((o: {w:number}) => {
            return {
                w: 85,
                h : 85,
                x: w + o.w,
                speed: -3,
                img : batchImport('meteorites_', 5),
                life : 2,
            }
        })

        return o;

    })();

    config.friend = (() => {

        const { w } = config.game;

        const o = plane((o: {w:number}) => {
            return {
                w: 85,
                h : 85,
                x: w + o.w,
                speed: -2,
                img : 'friend',
            }
        });

        return o;

    })();

    config.fuel = (() => {
        type IFuel = {
            x?: number;
            y?: number;
            speed?: number;
            img?: string;
            w: number;
            h: number;
        }
        const o: IFuel = {
            w: 40,
            h: 40,
        };
        o.x = 0;
        o.y = -o.h;

        o.speed = -1;

        o.img = 'fuel';

        return o;

    })();

    config.star = (() => {
        return {
            img: batchImport('star_', 16),
        }
    })();


    config.playerBullet = (() => {
        return {
            ...bullet(),
            img: 'playerBullet',
        }
    })();

    config.enemyBullet = (() => {
        type OType = {
            speed: number,
            img?: string,
        }
        const o: OType = bullet();
        o.speed = -o.speed;
        o.img = 'enemyBullet';

        return o;

    })();

    config.planeDeathAnimation = {
        img: 'boom',
        loop : false,
        row: 4,
        col: 4,
        cooldown: 0.05 * fps,
    }

    config.bulletDeathAnimation = {
        img: 'boom',
        loop : false,
        row: 4,
        col: 4,
        cooldown: 0.01 * fps,
    }

    config.images = (() => {

        const images = {
            boom, player, friend,
            enemy, playerBullet, enemyBullet,
            fuel: fuel2,
            star_1, star_2, star_3, star_4,
            star_5, star_6, star_7, star_8,
            star_9, star_10, star_11, star_12, star_13, star_14, star_15, star_16,
            meteorites_1, meteorites_2, meteorites_3, meteorites_4, meteorites_5
        };

        return Object.assign(images);
    })();

    config.audios = (()=>{
        return {
            bg: background,
            destroyed,
            shoot,
        }
    })();

    return config;

})();
