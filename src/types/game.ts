import { Element as ElementClass } from '../class/element';

export interface IGameData {
    level: number;
    fuel: number;
    score: number;
    shoot: number;
    time: number;
    name: string;
    end?: boolean;
}

export interface IGame {
    scene?: number;
    scenes?: number;
    data: IGameData;
    over: (data: IGameData) => void;
}

export type IElement = ElementClass & Element;
