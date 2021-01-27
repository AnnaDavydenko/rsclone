import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Column from '../components/Column';
import Button from '../components/Button';
import Message from '../components/Message';
import { res } from '../utils/res';
import { SCENES } from '../App';
import { Typography } from '@material-ui/core';
import List from '@material-ui/core/List';

const GameRules = () => {

    const classes = useStyles({});


    return (
        <div className={classes.gameRulesContainer} >
            <Typography variant="h2" className={classes.title}>
                Game Rules
            </Typography>
            <div>
                <ul className={classes.pre}>
                    <li>Use W, A, S, D to control the spacecraft and press Space to launch.</li>
                    <li>The initial fuel value is 15, and it decreases by 1 point per second. When the fuel value is 0, the game ends.</li>
                    <li>Touching a dropped fuel bottle can add 15 points, with a maximum of 30 points.</li>
                    <li>Hit the enemy ship to get 5 points. The planet needs to be hit twice, this will add 10 points. 10 points are deducted for hitting a friendly team.</li>
                    <li>The enemy loses 15 fuel points and 10 points are deducted from the friendly collision.</li>
                    <li>The game allows negative points.</li>
                    <li>Press P to pause the game, press M to mute.</li>
                </ul>
                    Start your Star Wars!
            </div>
        </div>
    );
};

const useStyles = makeStyles({
    pre: {
        whiteSpace: 'pre-line',
        color: '#ced8e6',
        fontFamily: 'Cinzel',
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
        width: '50%',
        padding: '15px',
        transition: 'all 0.5s ease',
    },
});

export default GameRules;
