import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import Column from '../components/Column';
import Button from '../components/Button';
import { res } from '../utils/res';
import { SCENES } from '../constant';
import { LANGUAGE } from '../constant';
import GameRules from './GameRules';
import gameRulesImg from '../assets/img/23.svg';
import logo from '../assets/img/download.gif';
import rus from '../assets/img/russia.png';
import eng from '../assets/img/uk.png';
import { updateLanguage } from '../i18n';

interface IStart {
    onSceneChange: (scene: string) => void;
    handleGameRules: () => void;
    showGameRules: boolean;
}

const Start = (props: IStart) => {
    const { t, i18n  } = useTranslation();
    const { onSceneChange, handleGameRules, showGameRules } = props;

    const handleStart = useCallback(() => {
        res.loadAssets(() => {
            onSceneChange(SCENES.PLAY);
        });
    }, [onSceneChange]);

    const handleLanguageChange = useCallback((lang: string) => () => {
        updateLanguage(lang);
    }, []);

    const classes = useStyles({showGameRules});
    return (
        <>
            <header className={classes.header}>
                <div>
                    <div className={classes.languageContainer}>
                        <button className={classes.language} onClick={handleLanguageChange(LANGUAGE.RU)}>
                            <img src={rus} alt="russuan language" />
                        </button>
                        <button className={classes.language} onClick={handleLanguageChange(LANGUAGE.EN)}>
                            <img src={eng} alt="english language" />
                        </button>
                    </div>

                    <button id="gameRules" className={classes.gameRulesBtn} onClick={handleGameRules}>
                        <img src={gameRulesImg} alt="game rules" />
                    </button>
                </div>
            </header>
            <div className={classes.main}>
                <div className={classes.logo}>
                    <img src={logo} className={classes.logoImage} alt="logo" />
                    <div className={classes.logoText}>
                        <p>To the Moon</p>
                        <p>And Sleep</p>
                    </div>
                </div>
                {!showGameRules && 
                    <Column id="start">
                        <Button id="start-btn" onClick={handleStart}>
                            <p>{t('Start game')}</p>
                        </Button>
                    </Column>
                }
                {showGameRules && 
                    <GameRules />
                }
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
        background: 'transparent',
        '& img': {
            transition: 'all 0.5s ease',
            width: '100%',
            height: '100%',
        },
    },
    languageContainer: {
        display: 'flex',
        justifyContent: 'space-around',
    },
    language: {
        width: '25px',
        height: '25px',
        cursor: 'pointer',
        zIndex: 2,
        padding: 0,
        border: 0,
        outline: 'none',
        background: 'transparent',
        '& img': {
            transition: 'all 0.5s ease',
            width: '100%',
            height: '100%',
        },
    }
});
export default Start;
