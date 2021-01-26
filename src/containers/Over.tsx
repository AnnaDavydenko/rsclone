import React, { useCallback, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Column from '../components/Column';
import Button from '../components/Button';
import Message from '../components/Message';
import { IGameData } from '../types/game';
import { SCENES } from '../App';
import { localStorageData, numberFormat } from '../utils/utils';
import { storageDataKey } from './Rank';
import playerBullet from '../assets/img/playerBullet.png';
import score from '../assets/img/score.png';
import time from '../assets/img/time3.png';

interface IOver {
    gameData: IGameData;
    onSceneChange: (scene: string) => void;
}

const Over = (props: IOver) => {
    const { gameData, onSceneChange } = props;
    const classes = useStyles({});

    const [name, setName] = useState<string>('');

    const handleSubmit = useCallback(() => {
        const { score, time } = gameData;
        localStorageData.add(storageDataKey, { name, score, time });
        onSceneChange(SCENES.RANK);
    }, [gameData, name, onSceneChange]);

    const handleChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);

    return (
        <Column id="over" classes={classes.absolute}>
            <div className={classes.gameIcons}>
                <Message>
                    <span>
                        <img src={time} alt="time" />
                    </span>
                    <span>--</span>
                    <span>{numberFormat(gameData.time)}</span>
                </Message>
                <Message>
                    <span>
                        <img src={score} alt="score" />
                    </span>
                    <span>--</span>
                    <span>{numberFormat(gameData.score)}</span>
                </Message>
                <Message>
                    <span>
                        <img src={playerBullet} alt="player bullet" />
                    </span>
                    <span>--</span>
                    <span>{numberFormat(gameData.shoot)}</span>
                </Message>
            </div>
            <input type="text" id="name" placeholder="Please enter your name" onChange={handleChangeName} />
            <Button id="submit-btn" disabled={!name} onClick={handleSubmit}>
                Continue
            </Button>
        </Column>
    );
};

const useStyles = makeStyles({
    absolute: {
        height: '100%',
    },
    gameIcons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '60%',
    },
});

export default Over;
