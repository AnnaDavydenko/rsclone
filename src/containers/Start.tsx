import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Column from '../components/Column';
import Button from '../components/Button';
import Message from '../components/Message';
import { res } from '../utils/res';
import { SCENES } from '../App';
import GameRules from './GameRules';

interface IStart {
    onSceneChange: (scene: string) => void;
    gameRules: boolean;
}


const Start = (props: IStart) => {
    const { onSceneChange, gameRules } = props;


    const handleStart = useCallback(() => {
        res.loadAssets(() => {
            onSceneChange(SCENES.PLAY);
        });
    }, [onSceneChange]);

    return (
        <>
            {!gameRules && (
                <Column id="start">
                    <Button id="start-btn" onClick={handleStart}>
                        <p>Start game</p>
                        <p>Loading...</p>
                    </Button>
                </Column>
            )}
            {gameRules && (
                <GameRules />
            )}
        </>
    );
};


export default Start;
