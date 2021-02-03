import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';
import pug from '../assets/img/pug.png';
import squirel from '../assets/img/belka.png';
import comandos from '../assets/img/comandos.png';

const GameLore = () => {

    const classes = useStyles({});
    const { t, i18n  } = useTranslation();

    return (
        <div className={classes.gameLoreContainer} >
            <Typography variant="h2" className={classes.title}>
                {t('Game Lore')}
            </Typography>
            <div className={classes.body}>
                <img src={pug} className={classes.pug} />
                {t('The experiment with Belka and Strelka')}
            </div>
            <div className={classes.body}>
                <img src={squirel} className={classes.squirel} />
                {t('At the same time')}
            </div>
            <p className={classes.body}>
                {t('Distant relatives of a person')}
            </p>
            <div className={classes.body}>
                <img src={comandos} className={classes.comandos} />
                {t('The pug commando has decided to defend the Earth')}
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    gameLoreContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        width: '58%',
        transition: 'all 0.5s ease',
        position: 'relative',
        top: '-20px',
    },
    title: {
        color: '#ced8e6',
        fontFamily: 'Cinzel',
        textAlign: 'center',
    },
    body: {
        color: '#ced8e6',
        fontFamily: 'Cinzel',
        fontWeight: 500,
        background: 'linear-gradient(180deg, rgb(23 51 98 / 65%) 0%, rgb(70 113 166 / 54%) 100%)',
        borderRadius: '7px',
        padding: '10px 1px',
    },
    pug: {
        width: '17%',
        position: 'absolute',
        right: 'calc(100% - 110%)',
        top: 'calc(100% - 100%)',
    },
    squirel: {
        width: '12%',
        position: 'absolute',
        right: 'calc(100% - 1%)',
        top: 'calc(100% - 55%)',
        transform: 'rotate(-21deg)',
    },
    comandos: {
        width: '12%',
        position: 'absolute',
        right: 'calc(100% - 74%)',
        top: 'calc(100% - 8%)',
    },
});

export default GameLore;
