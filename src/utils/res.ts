import {config} from "../config/config";
import {loadAudios, loadImages} from "./utils";
import { IImagesObject } from '../types/image';

type IAudioObject = { [key: string]: HTMLAudioElement } | null;

interface IObject {
    loop: (key: string) => void;
    imageBy: (key: string) => HTMLImageElement | null;
    play: (key: string) => void;
    pause: (key: string) => void;
    end: (key: string) => void;
    replay: (key: string) => void;
    mute: () => void;
    speak: () => void;
    loadAssets: (callback: any) => void;
}
export const res = (() => {

    const o: IObject = {
        imageBy: (key: string) => {
            return _images && (_images[key] as HTMLImageElement);
        },
        play: (key)=>{
            setTimeout(()=>{
                _audios && _audios[key].play();
            },50);
        },
        loop: (key)=>{
            if(_audios){
                _audios[key].loop = true;
            }
        },
        pause: (key)=>{
            _audios && _audios[key].pause();
        },
        end: (key)=>{
            if(_audios){
                _audios[key].currentTime = 0;
                _audios[key].pause();
            }
        },
        replay: (key)=>{
            o.end(key);
            o.play(key);
        },
        mute: ()=>{
            if(_audios){
                for (const el of Object.values(_audios)){
                    el.muted = true;
                }
            }
        },
        speak: ()=>{
            if(_audios){
                for (const el of Object.values(_audios)){
                    el.muted = false;
                }
            }
        },
        loadAssets: (callback) => {
            loadImages(config.images, (images: IImagesObject) => {
                _images = images;
                call(callback);
            });
            loadAudios(config.audios, (audios: IAudioObject) => {
                _audios = audios;
                call(callback);
            });
        },
    };

    let _images: IImagesObject = null;
    let _audios: IAudioObject = null;

    const call = (callback: () => void) => {
        if (_images && _audios) {
            callback();
            o.loop('bg');
        }
    };

    return o;
})();
