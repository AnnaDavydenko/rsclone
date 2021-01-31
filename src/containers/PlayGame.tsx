import React, { useCallback, useEffect, useState } from 'react';
import { Play } from '../scenes/play';
import time from '../assets/img/time3.png';
import fuel from '../assets/img/fuel-station.png';
import score from '../assets/img/score.png';
import playerBulletImg from '../assets/img/playerBullet.png';
import zoom_in from '../assets/img/zoom-in.png';
import zoom_out from '../assets/img/zoom-out.png';
import mute from '../assets/img/mute.png';
import unmute from '../assets/img/audio.png';
import play from '../assets/img/play.png';
import pause from '../assets/img/pause.png';
import { config } from '../config/config';
import { SCENES } from '../constant';
import { IGameData } from '../types/game';
import UserGuide from '../components/UserGuide';

interface IPlay {
    gameData: IGameData;
    onSceneChange: (scene: string) => void;
    onGameUpdate: (updates: IGameData) => void;
}

const PlayGame = (props: IPlay) => {
    const { gameData, onGameUpdate, onSceneChange } = props;

    const [userGuideOpen, setUserGuideOpen] = useState<boolean>(true);
    const [gameScene, setScene] = useState();

    useEffect(() => {
        const data = { ...config.data(), end: false };
        const scene = new Play('#play', {
            data,
            over: (gameOverData: IGameData) => {
                scene.uninstall();
                scene.hidden();
                onGameUpdate(gameOverData);
                onSceneChange(SCENES.OVER);
            },
        });
        scene.show();
        scene.setup();
        scene.pause();
        scene.mute();
        // @ts-ignore
        setScene(scene);
        setUserGuideOpen(true);
    }, [onGameUpdate, onSceneChange]);

    const handleCloseGuide = useCallback(() => {
        setUserGuideOpen(false);
        // @ts-ignore
        gameScene.start();
        // @ts-ignore
        gameScene.speak();
    }, [gameScene]);

    return (
        <div id="play" className="absolute">
            <canvas id="canvas" className="absolute" />
            <div className="content absolute">
                <div className="header">
                    <ul className="info">
                        <li>
                            <img src={time} alt="time image" />
                            <span id="time">00</span>
                        </li>
                        <li>
                            <img src={fuel} alt="fuel image" />
                            <span id="fuel">00</span>
                        </li>
                        <li>
                            <img src={score} alt="score image" />
                            <span id="score">00</span>
                        </li>
                        <li>
                            <img src={playerBulletImg} alt="score" />
                            <span id="shoot">00</span>
                        </li>
                    </ul>
                    <ul className="info">
                        <li>
                            <img src={time} alt="time image" />
                            <span id="level">01</span>
                        </li>
                    </ul>
                    <ul className="option">
                        <li id="game-font-size-add">
                            <img className="pause" src={zoom_in} alt="text zoom in" />
                        </li>
                        <li id="game-font-size-reduce">
                            <img className="pause" src={zoom_out} alt="text zoom out" />
                        </li>
                        <li id="game-mute-btn">
                            <img className="pause" src={unmute} alt="unmute image" />
                            <img className="pause" src={mute} alt="mute image" />
                        </li>
                        <li id="game-pause-btn">
                            <img className="pause" src={play} alt="play image" />
                            <img className="pause" src={pause} alt="pause image" />
                        </li>
                    </ul>
                </div>
            </div>
            <UserGuide open={userGuideOpen} handleClose={handleCloseGuide} />
        </div>
    );
};

export default PlayGame;
