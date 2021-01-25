import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Column from '../components/Column';
import Button from '../components/Button';
import Message from '../components/Message';
import { res } from '../utils/res';
import { SCENES } from '../App';


const GameRules = () => {

    const classes = useStyles({});


    return (
        <Column id="start">
            <Message classes={classes.pre}>
                    1) Use W, A, S, D to control the spacecraft and press Space to launch.
                    The initial fuel value is 15, and it decreases by 1 point per second. When the fuel value is 0, the game ends.
                    Touching a dropped fuel bottle can add 15 points, with a maximum of 30 points.
                    Hit the enemy ship to get 5 points. The planet needs to be hit twice, this will add 10 points. 10 points are deducted for hitting a friendly team.
                    The enemy loses 15 fuel points and 10 points are deducted from the friendly collision.
                    The game allows negative points.
                    Press P to pause the game, press M to mute.
                    Start your Star Wars!
            </Message>
        </Column>
    );
};

const useStyles = makeStyles({
    pre: {
        whiteSpace: 'pre-line',
    },
});

export default GameRules;
