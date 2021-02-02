import React, { useCallback, useMemo, useState } from 'react';
import Start from './containers/Start';
import PlayGame from './containers/PlayGame';
import Over from './containers/Over';
import Rank from './containers/Rank';
import {SCENES} from './constant';
import { makeStyles } from '@material-ui/core/styles';
import { IGameData } from './types/game';
import { config } from './config/config';
import background from './assets/img/25.png';
import background1 from './assets/img/1268307.png';
import background3 from './assets/img/5.png';
import background4 from './assets/img/26.png';
import RSSchool from './assets/img/rs_school_js.png';
import './style.css';
import './common.css';
import Footer from './components/Footer';

function App() {
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const [scene, setScene] = useState<string>(SCENES.START);
    const [gameData, setGameData] = useState<IGameData>({ ...config.data(), end: false });
    const [showGameRules, setShowGameRules] = useState<boolean>(false);

    const backgroundImage = useMemo(() => {
        let image = null;
        if (scene === SCENES.OVER) {
            image = background1;
        } else if (scene === SCENES.RANK){
            image = background4;
        } else {
            image = background;
        }
        if (showGameRules) {
            image = background3;
        }
        return image;
    }, [showGameRules, scene]);

    const handleSceneChange = useCallback((scene: string) => {
        setScene(scene);
    }, []);

    const handleGameRules = useCallback(() => {
        setShowGameRules(!showGameRules);
    }, [showGameRules]);

    const updateGameStatus = useCallback(
        (isFinished: boolean) => {
            setGameData({ ...gameData, end: isFinished });
        },
        [gameData, setGameData]
    );

    const updateGame = useCallback((updates: IGameData) => setGameData(updates), []);

    const handleBackgroundLoad = useCallback(() => setImageLoaded(true), []);

    const classes = useStyles({backgroundImage, imageLoaded});

    return (
        <>
            <div id="app" className={classes.app}>
                {scene === SCENES.START && (
                    <Start
                        onSceneChange={handleSceneChange}
                        handleGameRules={handleGameRules}
                        showGameRules={showGameRules}
                    />
                )}
                {scene === SCENES.PLAY && (
                    <div id="container" className={classes.absolute}>
                        <PlayGame onGameUpdate={updateGame} onSceneChange={handleSceneChange} />
                    </div>
                )}
                {scene === SCENES.OVER && <Over gameData={gameData} onSceneChange={handleSceneChange} />}
                {scene === SCENES.RANK && <Rank onSceneChange={handleSceneChange} onGameStatusChange={updateGameStatus} />}
            </div>
            <img className={classes.fakeImage} src={backgroundImage} alt="fake bg" onLoad={handleBackgroundLoad} />
            {scene === SCENES.START && !showGameRules && <Footer />}
        </>
    );
}

const useStyles = makeStyles({
    absolute: {

    },
    fakeImage: {
        display: 'none',
    },
    app: ({backgroundImage, imageLoaded}: {backgroundImage: string, imageLoaded: boolean}) => ({
        backgroundImage: imageLoaded ?  `url(${backgroundImage})` : 'initial',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        fontSize: '14px',
        boxShadow: '5px 5px 10px -5px #000',
        overflow: 'hidden',
    }),
});

export default App;
