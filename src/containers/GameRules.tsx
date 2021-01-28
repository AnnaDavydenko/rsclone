import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Column from '../components/Column';
import Button from '../components/Button';
import Message from '../components/Message';
import { res } from '../utils/res';
import { SCENES } from '../App';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import li from './../assets/img/li.png'
import wasd from './../assets/img/was.png'
import spacebar from './../assets/img/spacebar.png'
import pm from './../assets/img/pm.png'

const GameRules = () => {

    const classes = useStyles({});


    return (
        <div className={classes.gameRulesContainer} >
            <Typography variant="h2" className={classes.title}>
                Game Rules
            </Typography>
            <div>
                <ul className={classes.ulist}>
                    <img src={wasd} className={classes.wasd} /><img src={spacebar} className={classes.spacebar} />
                    <li>Use W, A, S, D to control the spacecraft and press Space to launch.</li>
                    <li>The initial fuel value is 15, and it decreases by 1 point per second. When the fuel value is 0, the game ends.</li>
                    <li>Touching a dropped fuel bottle can add 15 points, with a maximum of 30 points.</li>
                    <li>Hit the enemy ship to get 5 points. The planet needs to be hit twice, this will add 10 points. 10 points are deducted for hitting a friendly team.</li>
                    <li>The enemy loses 15 fuel points and 10 points are deducted from the friendly collision.</li>
                    <li>The game allows negative points.</li>
                    <li>Press P to pause the game, press M to mute.</li>
                    <img src={pm} className={classes.pm} />
                </ul>
                    Start your Star Wars!
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    ulist: {
        whiteSpace: 'pre-line',
        color: '#ced8e6',
        fontFamily: 'Cinzel',
        background: 'linear-gradient(180deg, rgb(23 51 98) 0%, rgb(70 113 166) 100%)',
        border: '1px solid #068687',
        padding: '10px 1px',
        boxShadow: '3px -3px 5px 2px #108182',

        '& li': {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            borderRadius: '7px',
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
