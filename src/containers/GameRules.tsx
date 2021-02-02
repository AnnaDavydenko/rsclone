import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import li from './../assets/img/li.png'
import wasd from './../assets/img/was.png'
import spacebar from './../assets/img/spacebar.png'
import pm from './../assets/img/pm.png'
import { useTranslation } from 'react-i18next';

const GameRules = () => {

    const classes = useStyles({});
    const { t, i18n  } = useTranslation();

    return (
        <div className={classes.gameRulesContainer} >
            <Typography variant="h2" className={classes.title}>
                {t("Game Rules")}
            </Typography>
            <div>
                <ul className={classes.ulist}>
                    <img src={wasd} className={classes.wasd} /><img src={spacebar} className={classes.spacebar} />
                    <li>{t('Use W, A, S, D')}</li>
                    <li>{t('The initial fuel value')}</li>
                    <li>{t('Touching a dropped fuel')}</li>
                    <li>{t('Hit the enemy')}</li>
                    <li>{t('The enemy loses')}</li>
                    <li>{t('To move to a new level, you need to add 21 points')}</li>
                    <li>{t('The game allows negative points')}</li>
                    <li>{t('Press P')}</li>
                    <img src={pm} className={classes.pm} />
                </ul>
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    ulist: {
        whiteSpace: 'pre-line',
        color: '#ced8e6',
        fontFamily: 'Cinzel',
        fontWeight: 500,
        background: 'linear-gradient(180deg, rgb(23 51 98 / 65%) 0%, rgb(70 113 166 / 54%) 100%)',
        border: '1px solid #068687',
        borderRadius: '7px',
        padding: '10px 1px',
        boxShadow: '3px -3px 5px 2px #108182',

        '& li': {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',

            '&:before': {
                content: '""',
                display: 'inline-block',
                width: '30px',
                height: '30px',
                background: `url(${li}) no-repeat`,
                backgroundSize: 'contain',
                paddingLeft: '30px',
            },
        },
    },
    wasd: {
        width: '7%',
        position: 'absolute',
        right: 'calc(100% - 82%)',
        top: 'calc(100% - 80%)',
    },
    spacebar: {
        width: '16%',
        position: 'absolute',
        top: 'calc(100% - 61%)',
        right: 'calc(100% - 83%)',
    },
    pm: {
        width: '15%',
        position: 'absolute',
        top: 'calc(100% - 25%)',
        right: 'calc(100% - 83%)',
    },
    title: {
        color: '#ced8e6',
        fontFamily: 'Cinzel',
    },
    gameRulesContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        width: '78%',
        padding: '0 15px',
        transition: 'all 0.5s ease',
        position: 'relative',
        top: '-20px',
    },
});

export default GameRules;
