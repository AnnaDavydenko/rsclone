import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Column from '../components/Column';
import Button from '../components/Button';
import Message from '../components/Message';
import { res } from '../utils/res';
import { SCENES } from '../App';
import GameRules from './GameRules';
import gameRulesImg from '../assets/img/23.svg';
import logo from '../assets/img/download.gif';

interface IStart {
    onSceneChange: (scene: string) => void;
    handleGameRules: () => void;
    showGameRules: boolean;
}


const Start = (props: IStart) => {
    const { onSceneChange, handleGameRules, showGameRules } = props;



    const handleStart = useCallback(() => {
        res.loadAssets(() => {
            onSceneChange(SCENES.PLAY);
        });
    }, [onSceneChange]);


    const classes = useStyles({showGameRules});
    return (
        <>
            <header className={classes.header}>
                <button id="gameRules" className={classes.gameRulesBtn} onClick={handleGameRules}>
                    <img src={gameRulesImg} alt="game rules" />
                </button>
            </header>
            <div className={classes.main}>
                <div>
                    <div className={classes.logo}>
                        <img src={logo} className={classes.logoImage} alt="logo" />
                        <p className={classes.logoText}>
                            <p>To the Moon</p>
                            <p>And Sleep</p>
                        </p>
                    </div>

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
    header:{
        display: 'flex',
        justifyContent: 'flex-end',
    },
    main: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '400px',
    },
    logoImage: ({showGameRules}:{showGameRules:boolean}) => ({
        transition: 'all 0.5s ease',
        width: showGameRules ? '40%' :'50%',
    }),

    logo:({showGameRules}:{showGameRules:boolean}) => ({
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        top: showGameRules ? '-30px' : '0px',
        flexDirection: 'column',
        alignItems: 'center',
    }),
    logoText: ({showGameRules}:{showGameRules:boolean}) => ({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        letterSpacing: '5px',
        right: '345px',
        fontWeight: 500,
        color: '#ced8e6',
        fontFamily: 'Cinzel',
        fontSize: showGameRules ? '12px' : '14px',
        transition: 'all 0.5s ease',
    }),

    gameRulesBtn: {
        width: '90px',
        height: '90px',
        cursor: 'pointer',
        zIndex: 2,
        padding: 0,
        border: 0,
        outline: 'none',
        '& img': {
            transition: 'all 0.5s ease',
            width: '100%',
            height: '100%',
            background: '#101012',
        },
    },
});
export default Start;
