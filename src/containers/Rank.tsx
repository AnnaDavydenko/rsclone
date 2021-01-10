import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Column from '../components/Column';
import Button from '../components/Button';
import { SCENES } from '../App';
import { localStorageData, numberFormat } from '../utils/utils';
import { IGameData } from '../types/game';

interface IRank {
    onGameStatusChange: (isFinished: boolean) => void;
    onSceneChange: (scene: string) => void;
}

export const storageDataKey = 'gameData';

const Rank = (props: IRank) => {
    const { onGameStatusChange, onSceneChange } = props;
    const classes = useStyles({});

    const handleRestart = useCallback(() => {
        onGameStatusChange(false);
        onSceneChange(SCENES.START);
    }, [onGameStatusChange, onSceneChange]);

    const gameResults: IGameData[] = sortRanks([].concat(localStorageData.get(storageDataKey).data));

    let position = 0;

    return (
        <Column id="rank" classes={classes.absolute}>
            <table className={classes.scroll}>
                <thead>
                    <tr>
                        <th>Ranking</th>
                        <th>Name</th>
                        <th>Scores</th>
                        <th>Seconds</th>
                    </tr>
                </thead>
                <tbody>
                    {gameResults.map((gameResult: IGameData, index: number) => {
                        const prev: IGameData = gameResults[index - 1];
                        if (prev) {
                            position += some(prev, gameResult) ? 0 : 1;
                        } else {
                            position++;
                        }
                        return (
                            <tr key={position}>
                                <td>{numberFormat(position)}</td>
                                <td>{gameResult.name}</td>
                                <td>{numberFormat(gameResult.score)}</td>
                                <td>{numberFormat(gameResult.time)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Button id="restart-btn" onClick={handleRestart}>
                Restart
            </Button>
        </Column>
    );
};

const some = (a: IGameData, b: IGameData) => a.score === b.score && a.time === b.time;

const sortRanks = (gameResults: IGameData[]) => gameResults.sort((a: IGameData, b: IGameData) => {
        if (a.score === b.score) {
            return a.time < b.time ? 1 : -1;
        }
        return a.score < b.score ? 1 : -1;
    });

const useStyles = makeStyles({
    absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    scroll: {
        '& tbody': {
            display: 'block',
            height: '100%',
            overflowY: 'scroll',
            paddingBottom: '8px',
        },
        '& tbody::-webkit-scrollbar': {
            width: '2px',
        },
        '& thead, tbody tr': {
            display: 'table',
            width: '100%',
            tableLayout: 'fixed',
        },
        '& tbody tr': {
            height: '45px',
        },
        '& thead': {
            width: 'calc(100% - 2px)',
        },
        '& tbody::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
            borderRadius: '10px',
        },
        '& tbody::-webkit-scrollbar-thumb': {
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.5)',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)',
        },
    },
});

export default Rank;
