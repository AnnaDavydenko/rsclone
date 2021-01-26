import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Column from '../components/Column';
import Button from '../components/Button';
import Message from '../components/Message';
import { res } from '../utils/res';
import { SCENES } from '../App';
import GameRules from './GameRules';
import gameRulesImg from '../assets/img/game-rules-512.svg';
import logo from '../assets/img/download.gif';

interface IStart {
    onSceneChange: (scene: string) => void;}


const Start = (props: IStart) => {
    const { onSceneChange } = props;
    const classes = useStyles({});
    const [showGameRules, setShowGameRules] = useState<boolean>(false);

    const handleStart = useCallback(() => {
        res.loadAssets(() => {
            onSceneChange(SCENES.PLAY);
        });
    }, [onSceneChange]);

    const handleGameRules = useCallback(() => {
        setShowGameRules(!showGameRules);
    }, [showGameRules]);

    return (
        <>
            <header className={classes.header}>
                <button id="gameRules" className={classes.gameRules} onClick={handleGameRules}>
                    <img src={gameRulesImg} alt="game rules" />
                </button>
            </header>
            <div className={classes.main}>
                <div>
                    <div className={classes.logo}>
                        <img src={logo} alt="logo" />
                    </div>
                    <p className={classes.logoText}>
                        <p>To the Moon</p>
                        <p>And Sleep</p>
                    </p>
                </div>

                {!showGameRules && (
                    <Column id="start">
                        <Button id="start-btn" onClick={handleStart}>
                            <p>Start game</p>
                            <p>Loading...</p>
                        </Button>
                    </Column>
                )}
                {showGameRules && (
                    <GameRules />
                )}
            </div>

        </>
    );
};

const useStyles = makeStyles({
    header: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '400px',
    },

    logo: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        '& img': {
            transition: 'all 0.5s ease',
            width: '50%',
        },
    },
    logoText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        letterSpacing: '5px',
        right: '345px',
        fontWeight: 500,
        color: '#ced8e6',
        fontFamily: 'Cinzel',
    },

    gameRules: {
        width: '90px',
        height: '90px',
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
    },
});
export default Start;
