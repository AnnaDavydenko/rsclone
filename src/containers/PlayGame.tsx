import React, { useCallback, useEffect, useState } from 'react';
// import { Play } from '../scenes/play';
import { Play } from '../scenes/play';
import timeImg from '../assets/img/time3.png';
import fuelImg from '../assets/img/fuel2.png';
import scoreImg from '../assets/img/score.png';
import playerBulletImg from '../assets/img/playerBullet.png';
import a_plusImg from '../assets/img/a+.png';
import a_minusImg from '../assets/img/a-.png';
import muteImg from '../assets/img/mute.png';
import speakerImg from '../assets/img/speaker.png';
import playImg from '../assets/img/play.png';
import pauseImg from '../assets/img/pause.png';
import { config } from '../config/config';
import { SCENES } from '../App';
import { IGameData } from '../types/game';

interface IPlay {
    gameData: IGameData;
    onSceneChange: (scene: string) => void;
    onGameUpdate: (updates: IGameData) => void;
}

const PlayGame = (props: IPlay) => {
    const { gameData, onGameUpdate, onSceneChange } = props;

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
    }, [onGameUpdate, onSceneChange]);

    return (
        <div id="play" className="absolute">
            <canvas id="canvas" className="absolute" />
            <div className="content absolute">
                <div className="header">
                    <ul className="info">
                        <li>
                            <img src={timeImg} alt="time" />
                            <span id="time">00</span>
                        </li>
                        <li>
                            <img src={fuelImg} alt="fuel" />
                            <span id="fuel">00</span>
                        </li>
                        <li>
                            <img src={scoreImg} alt="score" />
                            <span id="score">00</span>
                        </li>
                        <li>
                            <img src={playerBulletImg} alt="score" />
                            <span id="shoot">00</span>
                        </li>
                    </ul>
                    <ul className="option">
                        <li id="game-font-size-add">
                            <img className="pause" src={a_plusImg} alt="time" />
                        </li>
                        <li id="game-font-size-reduce">
                            <img className="pause" src={a_minusImg} alt="time" />
                        </li>
                        <li id="game-mute-btn">
                            <img className="pause" src={muteImg} alt="time" />
                            <img className="pause" src={speakerImg} alt="time" />
                        </li>
                        <li id="game-pause-btn">
                            <img className="pause" src={playImg} alt="time" />
                            <img className="pause" src={pauseImg} alt="time" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlayGame;
