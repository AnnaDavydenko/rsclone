import { Scene } from "../class/scene";
import { Cooldown } from "../class/cooldown";
import { Enemy } from "../class/enemy";
import { Friend } from "../class/friend";
import { Fuel } from "../class/fuel";
import { Meteorite } from "../class/meteorite";
import { Player } from "../class/player";
import { Star } from "../class/star";
import {$, hotkey, incrementAnimation, numberFormat, raf, on} from "../utils/utils";
import {res} from "../utils/res";
import {config, fps} from "../config/config";
import { IGame, IGameData } from '../types/game';
import { Bullet } from '../class/bullet';

interface IGameItems {
    arr: Array<Enemy> | Array<Meteorite> | Array<Friend> | Array<Fuel> | Array<Star>;
    elem: any;
    cooldown: Cooldown;
}

interface IConf {
    data: Array<any>;
    deg: number;
    x: number;
    y: number;
}

type IParticipants = Player | Bullet| Meteorite | Enemy | Friend | Fuel | Star;
type IDrawTextData = {
    text: string;
    x: number;
    y: number ;
}

export class Play extends Scene {
    private raf_id: string;
    private muteFlag: boolean | null;
    private pauseFlag: boolean | null;
    private timeCooldown: Cooldown | null;
    private playerBullets: Array<Bullet>;
    private enemyBullets: Array<Bullet>;
    private allEnemys: Array<Enemy> | Array<Meteorite>;
    private enemys: IGameItems | null;
    private meteorites: IGameItems | null;
    private friends: IGameItems | null;
    private fuels: IGameItems | null;
    private stars: IGameItems | null;
    private player: Player | null;
    private canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;

    constructor(el: string, game: IGame){
        super(el,game);
        this.created();
        this.raf_id = "";
        this.muteFlag = null;
        this.pauseFlag = null;
        this.timeCooldown = null;
        this.playerBullets = [];
        this.enemyBullets = [];
        this.allEnemys = [];
        this.enemys = null;
        this.meteorites = null;
        this.friends = null;
        this.fuels = null;
        this.stars = null;
        this.player = null;
        this.canvas = $('#canvas') as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }
    created(){
        this.raf_id = 'play_update';
        this.initCanvas();
    }
    setup() {
        this.muteFlag = false;
        this.initData();
        this.initPlayer();
        this.updateTime();
        this.updateFuel();
        this.updateScore();
        this.updateFontSize();
        $("#logo")?.classList.add('play-status');
        this.event();
        this.start();
    }

    start() {
        this.pauseFlag = false;
        raf.reg(this.raf_id, this.update.bind(this));
        res.play('bg');
        $('#game-pause-btn')?.classList.add('active');
    }
    pause() {
        this.pauseFlag = true;
        raf.remove(this.raf_id);
        res.pause('bg');
        $('#game-pause-btn')?.classList.remove('active');
    }

    mute(){
        this.muteFlag = true;
        res.mute();
        $('#game-mute-btn')?.classList.add('active');
    }

    speak(){
        this.muteFlag = false;
        res.speak();
        $('#game-mute-btn')?.classList.remove('active');
    }

    uninstall() {
        raf.remove(this.raf_id);
        res.end('bg');
        $("#logo")?.classList.remove('play-status');
        hotkey.clearAll();
    }


    initData() {

        this.pauseFlag = false;
// !todo [fps]
        this.timeCooldown = new Cooldown(fps as any, true);


        this.playerBullets = [];
        this.enemyBullets = [];
        this.allEnemys = [];
        this.enemys = {
            arr: this.allEnemys,
            elem: Enemy,
            cooldown: new Cooldown(config.game.appendEnemyCooldown),
        };
        this.meteorites = {
            arr: this.allEnemys,
            elem: Meteorite,
            cooldown: new Cooldown(config.game.appendEnemyCooldown),
        };
        this.friends = {
            arr: [],
            elem: Friend,
            cooldown: new Cooldown(config.game.appendFriendCooldown),
        };
        this.fuels = {
            arr: [],
            elem: Fuel,
            cooldown: new Cooldown(config.game.appendFriendCooldown),
        };
        this.stars = {
            arr: [],
            elem: Star,
            cooldown: new Cooldown(config.game.appendStarCooldown),
        };
    }
//todo

    collision(a: IParticipants, b: IParticipants, callback: any) {
        if (!a.run || !b.run) {
            return;
        }
        const yCoolision = (a: IParticipants, b: IParticipants) => {
            return a.y > b.y && a.y < b.y + b.h;
        };
        const xCoolision = (a: IParticipants, b: IParticipants) => {
            return a.x > b.x && a.x < b.x + b.w;
        };
        if (yCoolision(a, b) || yCoolision(b, a)) {
            if (xCoolision(a, b) || xCoolision(b, a)) {
                callback(a, b);
            }
        }
    }

    bulletCollision(bullet: Bullet, arr: Array<IParticipants>, callback: any) {
        arr.forEach(el => {
            this.collision(bullet, el, (a: IParticipants, b: IParticipants) => {
                a.reduceLife();
                b.reduceLife();
                if (!b.run) {
                    callback(b);
                }
            });
        });
    }

    playerCollision(el: IParticipants, callback: any) {
        this.collision(this.player as Player, el, () => {
            el.death();
            callback(el);
        });
    }

    factory(elem: Player) {
        // @ts-ignore
        const o = new elem(this);
        o.setup();
        return o;
    }

    append(obj: IGameItems) {
        obj.cooldown.update().active(() => {
            obj.arr.push(
                this.factory(obj.elem)
            )
        });
    }

    appendElement() {
        this.append(this.enemys as IGameItems);
        this.append(this.meteorites as IGameItems);
        this.append(this.friends as IGameItems);
        this.append(this.fuels as IGameItems);
        this.append(this.stars as IGameItems);
    }

    updateing(arr: Array<IParticipants>, callback?: any) {
        const len = arr.length;
        for (let i = len - 1; i >= 0; i--) {
            const el = arr[i];
            if (el.isDeath) {
                arr.splice(i, 1);
                continue;
            }
            el.update();
            callback && callback(el);
        }
    }

    updateBullets() {
        const {
            shootEnemy,
            shootMeteorite,
            shootFriend
        } = config.scoreConfig;
        const {
            beingHit
        } = config.fuelConfig;
        this.updateing(this.playerBullets, (bullet: Bullet) => {
            this.bulletCollision(bullet, this.enemyBullets, (el: IParticipants) => {
                el.death();
            });
            //todo neponyatno
            this.bulletCollision(bullet, this.enemys?.arr as Array<Enemy>, (el: IParticipants) => {
                this.updateScore(
                    el instanceof Meteorite ?
                        shootMeteorite : shootEnemy
                );
                this.updateshoot();
                this.shoot();
            });
            this.bulletCollision(bullet, this.friends?.arr as Array<Friend>, () => {
                this.updateScore(shootFriend);
                this.shoot();
            });
        });
        this.updateing(this.enemyBullets, (bullet: Bullet) => {
            this.playerCollision(bullet, () => {
                this.updateFuel(beingHit);
            })
        });
    }

    updateEnemies() {
        const {
            shootEnemy,
            shootMeteorite,
        } = config.scoreConfig;
        const {
            beingHit
        } = config.fuelConfig;
        this.updateing((this.enemys?.arr as Array<Enemy>), (enemy: IParticipants) => {
            this.playerCollision(enemy, () => {
                this.updateScore(
                    enemy instanceof Meteorite ?
                        shootMeteorite : shootEnemy
                );
                this.updateFuel(beingHit);
                this.updateshoot();
                this.shoot();
            })
        });
    }

    updateFriends() {
        const {
            shootFriend
        } = config.scoreConfig;
        this.updateing(this.friends?.arr as Array<Friend>, (friend: IParticipants) => {
            this.playerCollision(friend, () => {
                this.updateScore(shootFriend);
                this.shoot();
            })
        });
    }

    updateFuels() {
        const {
            fuelRaiseSpeed
        } = config.fuelConfig;
        this.updateing(this.fuels?.arr as Array<Fuel>, (fuel: IParticipants) => {
            this.playerCollision(fuel, () => {
                this.updateFuel(fuelRaiseSpeed);
            })
        });
    }

    updateStars() {
        this.updateing(this.stars?.arr as Array<Star>);
    }

    updateElements() {
        this.updateStars();
        this.player?.update();
        this.updateEnemies();
        this.updateFriends();
        this.updateFuels();
        this.updateBullets();
    }

    update() {
        this.timeCooldown?.update().active(() => {
            this.game.data.time++;
            this.updateTime();
            this.updateFuel(config.fuelConfig.fuelLoseSpeed);
        });

        this.ctx?.clearRect(0, 0, config.game.w, config.game.h);

        this.appendElement();

        this.updateElements();
    }

    updateTime() {
        const game = this.game;
        const time = $('#time');
        if (time) {
            time.innerHTML = `${numberFormat(game.data.time)}`;
        }
    }

    updateFuel(num = 0) {
        const game = this.game;
        const {
            fuelMax,
            fuelLoseSpeed
        } = config.fuelConfig;
        const call = () => {
            const fuel = $('#fuel');
            if(fuel){
                fuel.innerHTML = `${numberFormat(game.data.fuel)}`;
            }
            if (game.data.fuel <= 0) {
                game.data.end = true;
                game.over(game.data);
                //todo undo
            }
        }
        if (num === 0) {
            return call();
        }
        if (num !== fuelLoseSpeed) {
            const start = game.data.fuel;
            const end = start + num;
            incrementAnimation(start, end, (current: number) => {
                if (current > fuelMax) {
                    current = fuelMax;
                }
                game.data.fuel = current;
                if (game.data.end) {
                    return call();
                }
                //todo del comment
                //game.data.end ?? call();
            })
            return;
        }
        game.data.fuel += num;
        call();
    }

    updateScore(num = 0) {
        const game = this.game;
        const score = $('#score');
        const call = () => {
            if(score){
                score.innerHTML = `${numberFormat(game.data.score)}`;
            }
        }
        if (num === 0) {
            return call();
        }
        const start = game.data.score;
        const end = start + num;
        incrementAnimation(start, end, (current: number) => {
            game.data.score = current;
            call();
        })
    }

    updateshoot() {
        const game = this.game;
        game.data.shoot++;
        const shoot = $('#shoot');
        if(shoot){
            shoot.innerHTML = `${numberFormat(game.data.shoot)}`;
        }
    }
/// todo!!!!!!!!!!!!!!!!!!!
    updateFontSize(){
        if($('.content .header .info')){
            // @ts-ignore
            $('.content .header .info').style.fontSize = config.game.fontSize.val + 'px';
        }
    }

    initCanvas() {
        this.canvas = $('#canvas') as HTMLCanvasElement;
        this.canvas.width = config.game.w;
        this.canvas.height = config.game.h;

        this.ctx = (this.canvas?.getContext('2d')) as CanvasRenderingContext2D ;
    }
// todo!!!!!!!!!!!!!!!!!
    initPlayer() {
        // @ts-ignore
        this.player = this.factory(Player);
    }
// todo!!!!!!!!!!!!!!!!!
    draw(data: any) {
        this.ctx?.drawImage.apply(this.ctx, data);
    }

    rotateDraw(conf: IConf) {
        this.ctx?.save();
        this.ctx?.translate(conf.x, conf.y);
        this.ctx?.rotate(conf.deg * Math.PI / 180);
        this.draw(conf.data);
        this.ctx?.restore();
    }

    setFontStyle(font = "20px Arial", yellow = "yellow") {
        if(this.ctx){
            this.ctx.font = font;
            this.ctx.fillStyle = yellow;
        }

    }

    drawText(data: IDrawTextData) {
        this.ctx?.fillText(data.text, data.x, data.y);
    }

    event() {
        const togglePause = ()=>{
            this.pauseFlag ? this.start() : this.pause();
        }
        const toggleMute = ()=>{
            this.muteFlag ? this.speak() : this.mute();
        }
        const fontSize = (status: boolean)=>{
            let {val} =  config.game.fontSize;
            const { max, min } = config.game.fontSize;
            val += (status ? 1 : -1);
            if (val <= min || val >= max) return;
            config.game.fontSize.val = val;
            this.updateFontSize();
        }
        hotkey.reg('p', () => {
            togglePause();
        }, true);
        hotkey.reg('m', () => {
            toggleMute();
        }, true);
        on(
            $('#game-font-size-add') as Element,
            'click',
            ()=>{
                fontSize(true);
            }
        )
        on(
            $('#game-font-size-reduce') as Element,
            'click',
            ()=>{
                fontSize(false);
            }
        )
        on(
            $('#game-pause-btn') as Element,
            'click',
            ()=>{
                togglePause()
            }
        )
        on(
            $('#game-mute-btn') as Element,
            'click',
            ()=>{
                toggleMute()
            }
        )
    }

    shoot() {
        res.replay('destroyed');
    }
}
