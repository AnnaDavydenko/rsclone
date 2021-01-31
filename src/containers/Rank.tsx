import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '../components/Button';
import { SCENES } from '../constant';
import { localStorageData, numberFormat } from '../utils/utils';
import { IGameData } from '../types/game';
import { useTranslation } from 'react-i18next';

interface IRank {
    onGameStatusChange: (isFinished: boolean) => void;
    onSceneChange: (scene: string) => void;
}

export const storageDataKey = 'gameData';

const Rank = (props: IRank) => {
    const { onGameStatusChange, onSceneChange } = props;
    const classes = useStyles({});
    const { t, i18n  } = useTranslation();

    const handleRestart = useCallback(() => {
        onGameStatusChange(false);
        onSceneChange(SCENES.START);
    }, [onGameStatusChange, onSceneChange]);

    const gameResults: IGameData[] = sortRanks([].concat(localStorageData.get(storageDataKey).data));

    let position = 0;

    return (
        <div id="rank" className={classes.absolute}>
            <table className={classes.scroll}>
                <thead className={classes.tableHeader}>
                    <tr>
                        <th>{t('Ranking')}</th>
                        <th>{t('Name')}</th>
                        <th>{t('Scores')}</th>
                        <th>{t('Seconds')}</th>
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
                            <tr key={index} >
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
        </div>
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
        height: '100%',
        textAlign: 'center',
    },
    tableHeader: {
        fontSize: '18px',
    },
    scroll: {
        height: 'calc(100% - 120px)',
        overflow: 'hidden',
        background: '#00000069',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        margin: '25px auto',
        justifyContent: 'center',
        textAlign: 'center',
        borderRadius: '7px',
        border: '2px solid #150304',
        padding: '10px',
        fontFamily: 'Cinzel',
        '& tbody': {
            display: 'block',
            height: '100%',
            overflowY: 'scroll',
            paddingBottom: '8px',
        },
        '& tbody::-webkit-scrollbar': {
            width: '3px',
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
            background: '#ffa96cc9',
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.5)',
        },
    },
});

export default Rank;
