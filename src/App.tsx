import React, { useCallback, useState } from 'react';
import Start from './containers/Start';
import PlayGame from './containers/PlayGame';
import Over from './containers/Over';
import Rank from './containers/Rank';
import { makeStyles } from '@material-ui/core/styles';
import { IGameData } from './types/game';
import { config } from './config/config';
import background from './assets/img/25.jpg';
import logo from './assets/img/download.gif';
import cosmonavt from './assets/img/cosmonavt.png';
import gameRulesImg from './assets/img/game-rules-512.png';
import happyPug from './assets/img/eA9IRlBEpQ-removebg-preview.png';
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
    const classes = useStyles({});

    const [scene, setScene] = useState<string>(SCENES.START);
    const [gameData, setGameData] = useState<IGameData>({ ...config.data(), end: false });
    const [gameRules, setGameRules] = useState<boolean>(false);

    const handleGameRules = useCallback(() => {
        setGameRules(!gameRules);
        // if(gameRules === false){
        //     setGameRules(true);
        // } else {
        //     setGameRules(false);
        // }
    }, [gameRules]);

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
                <header className={classes.header}>
                    <button id="gameRules" className={classes.gameRules} onClick={handleGameRules}>
                        <img src={gameRulesImg} alt="game rules" />
                    </button>
                </header>
                <div className={classes.logo}>
                    <img src={logo} alt="logo" />
                </div>
                <p className={classes.logoText}>
                    <p>To the Moon</p>
                    <p>And Sleep</p>
                </p>

                <div className={classes.cosmonavt}>
                    <img src={cosmonavt} alt="cosmonavt" />
                </div>
                <div className={classes.happyPug}>
                    <img src={happyPug} alt="happy pug" />
                </div>
                <div id="container" className={classes.absolute}>
                    {scene === SCENES.START && <Start onSceneChange={handleSceneChange} gameRules={gameRules} />}
                    {scene === SCENES.PLAY && <PlayGame gameData={gameData} onGameUpdate={updateGame} onSceneChange={handleSceneChange} />}
                    {scene === SCENES.OVER && <Over gameData={gameData} onSceneChange={handleSceneChange} />}
                    {scene === SCENES.RANK && <Rank onSceneChange={handleSceneChange} onGameStatusChange={updateGameStatus} />}
                </div>
            </div>
            <footer>
                <span>
                    Created by
                    <a href="https://github.com/AnnaDavydenko">GitHub</a>
                </span>
            </footer>
        </>
    );
}

const useStyles = makeStyles({
    header: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    app: {
        position: 'relative',
        margin: '10px auto',
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        fontSize: '14px',
        boxShadow: '5px 5px 10px -5px #000',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    logo: {
        display: 'flex',
        justifyContent: 'center',
        '& img': {
            transition: 'all 0.5s ease',
        },
    },
    logoText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        letterSpacing: '5px',
        position: 'absolute',
        right: '345px',
        fontWeight: 500,
        color: '#ced8e6',
        fontFamily: 'Cinzel',
    },
    cosmonavt: {
        position: 'relative',
        bottom: '185px',
        right: '22px',
        '& img': {
            transform: 'rotate(-47deg)',
            width: '15%',
        },
    },
    happyPug: {
        position: 'relative',
        bottom: '477px',
        left: '882px',
        '& img': {
            width: '11%',
        },
    },
    gameRules: {
        width: '70px',
        height: '70px',
        cursor: 'pointer',
        zIndex: 2,
        padding: 0,
        border: 0,
        '& img': {
            transition: 'all 0.5s ease',
            width: '100%',
            height: '100%',
            background: '#101012',
        },
    }
});

export default App;
