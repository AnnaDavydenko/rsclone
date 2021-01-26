import React, { useCallback, useState } from 'react';
import Start from './containers/Start';
import PlayGame from './containers/PlayGame';
import Over from './containers/Over';
import Rank from './containers/Rank';
import { makeStyles } from '@material-ui/core/styles';
import { IGameData } from './types/game';
import { config } from './config/config';
import background from './assets/img/25.png';
import background1 from './assets/img/1268307.png';
import logo from './assets/img/download.gif';
import gameRulesImg from './assets/img/game-rules-512.svg';
import './style.css';
import './common.css';
import { res } from './utils/res';

export const SCENES = {
    START: 'start',
    PLAY: 'play',
    OVER: 'over',
    RANK: 'rank',
};

function App() {

    const [scene, setScene] = useState<string>(SCENES.OVER);
    const [gameData, setGameData] = useState<IGameData>({ ...config.data(), end: false });

    const handleSceneChange = useCallback((scene: string) => {
        setScene(scene);
    }, []);

    const updateGameStatus = useCallback(
        (isFinished: boolean) => {
            setGameData({ ...gameData, end: isFinished });
        },
        [gameData, setGameData]
    );

    const updateGame = useCallback((updates: IGameData) => setGameData(updates), []);

    const classes = useStyles({scene});

    return (
        <>
            <div id="app" className={classes.app}>
                {scene === SCENES.START && <Start onSceneChange={handleSceneChange} />}
                {scene === SCENES.PLAY && (
                    <div id="container" className={classes.absolute}>
                        <PlayGame gameData={gameData} onGameUpdate={updateGame} onSceneChange={handleSceneChange} />
                    </div>
                )}
                {scene === SCENES.OVER && <Over gameData={gameData} onSceneChange={handleSceneChange} />}
                {scene === SCENES.RANK && <Rank onSceneChange={handleSceneChange} onGameStatusChange={updateGameStatus} />}
            </div>
            <footer className={classes.footer}>
                <span>
                    Created by
                    <a href="https://github.com/AnnaDavydenko">GitHub</a>
                </span>
            </footer>
        </>
    );
}

const useStyles = makeStyles({
    absolute: {

    },
    app:({scene}: {scene: string}) => ({
        backgroundImage: `url(${scene === SCENES.OVER ? background1 : background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        fontSize: '14px',
        boxShadow: '5px 5px 10px -5px #000',
        borderRadius: '5px',
        overflow: 'hidden',
    }),

    footer: {
        display: 'none',
    }
});

export default App;
