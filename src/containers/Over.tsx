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
import { OutlinedInputProps, TextField } from '@material-ui/core';

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
        <div id="over" className={classes.absolute}>
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

            <form className={classes.inputContainer} noValidate autoComplete="off">
                <TextField id="outlined-basic" label="Your name" variant="outlined"
                           InputProps={{ classes: { input: classes.input } }}
                           InputLabelProps={{
                               classes: {
                                   root: classes.label,
                                   focused: classes.focusedLabel,
                               },
                           }}
                           onChange={handleChangeName}
                />
            </form>

            <Button id="submit-btn" disabled={!name} onClick={handleSubmit}>
                Continue
            </Button>
        </div>
    );
};

const useStyles = makeStyles({
    absolute: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    gameIcons: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        height: '60%',
    },
    inputContainer: {
        alignSelf: 'center',
        background: '#7711115c',
        borderRadius: '7px',
    },
    input: {
        color: "#eff4fb",
        fontSize: '20px',
    },
    label: {
        color: '#ca875b',
        fontSize: '16px',
        "&$focusedLabel": {
            color: "#ca875b",
        },
        "&$erroredLabel": {
            color: "orange"
        }
    },
    focusedLabel: {},
});

export default Over;
