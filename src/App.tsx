import React, { useCallback, useState } from 'react';
import Start from './containers/Start';
import PlayGame from './containers/PlayGame';
import Over from './containers/Over';
import Rank from './containers/Rank';
import { makeStyles } from '@material-ui/core/styles';
import { IGameData } from './types/game';
import { config } from './config/config';
import logo from './assets/img/logo-01.png';
import './style.css';
import './common.css';

export const SCENES = {
    START: 'start',
    PLAY: 'play',
    OVER: 'over',
    RANK: 'rank',
};

function App() {
    const classes = useStyles({});

    const [scene, setScene] = useState<string>(SCENES.START);
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

    return (
        <>
            <div id="app" className={classes.app}>
                <div id="logo" className={classes.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <div id="container" className={classes.absolute}>
                    {scene === SCENES.START && <Start onSceneChange={handleSceneChange} />}
                    {scene === SCENES.PLAY && <PlayGame gameData={gameData} onGameUpdate={updateGame} onSceneChange={handleSceneChange} />}
                    {scene === SCENES.OVER && <Over gameData={gameData} onSceneChange={handleSceneChange} />}
                    {scene === SCENES.RANK && <Rank onSceneChange={handleSceneChange} onGameStatusChange={updateGameStatus} />}
                </div>
            </div>
            <footer>
                <span>
                    Crafted with by
                    <a href="http://4ark.me"> @4Ark</a>/<a href="https://github.com/gd4Ark/star-battle">GitHub</a>
                </span>
            </footer>
        </>
    );
}

const useStyles = makeStyles({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    app: {
        position: 'relative',
        margin: '10px auto',
        background: '#222',
        fontSize: '14px',
        boxShadow: '5px 5px 10px -5px #000',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    logo: {
        pointerEvents: 'none',
        position: 'relative',
        zIndex: 2,
        padding: '0.8% 0',
        width: '100%',
        textAlign: 'center',
        '& img': {
            transition: 'all 0.5s ease',
            width: '10%',
        },
    },
});

export default App;
