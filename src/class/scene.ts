import {$} from '../utils/utils';
import { IElement, IGame } from '../types/game';

export class Scene{
    private el: IElement;
    public game: IGame;
    protected ctx: CanvasRenderingContext2D | null;

    constructor(el: string, game: IGame) {
        this.el = ($(el)) as IElement;
        this.game = game;
        this.ctx = null;
    }

    show() {
        this.el.classList.add('action');
    }

    hidden() {
        this.el.classList.remove('action');
    }

    draw (data: any) {
        const ctxElement = this.ctx as CanvasRenderingContext2D;
        ctxElement.drawImage.apply(this.ctx, data);
    }
}
