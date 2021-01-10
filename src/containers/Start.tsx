import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Column from '../components/Column';
import Button from '../components/Button';
import Message from '../components/Message';
import { res } from '../utils/res';
import { SCENES } from '../App';

interface IStart {
    onSceneChange: (scene: string) => void;
}

const Start = (props: IStart) => {
    const { onSceneChange } = props;
    const classes = useStyles({});

    const handleStart = useCallback(() => {
        res.loadAssets(() => {
            onSceneChange(SCENES.PLAY);
        });
    }, [onSceneChange]);

    return (
        <Column id="start">
            <Message classes={classes.pre}>
                1. Используйте W, A, S,D для управления кораблем, нажмите пробел для запуска. 2. Начальное значение топлива-15, уменьшенное
                на 1 пункт в секунду, и когда значение топлива равно 0, игра окончена. 3. Прикосновение к падающей топливной бутылке может
                увеличить 15 очков, максимальное значение-30 очков. 4. Ударьте по вражескому космическому кораблю, чтобы увеличить его на 5
                очков.Планету нужно ударить дважды, увеличив ее на 10 очков.Попадание в дружественную сторону вычитается из 10 очков. 5.
                Поразить противника потерей 15 воспламенительных материалов, поразить друга вычитается 10 очков. 6. Игра допускает
                отрицательные моменты. 7. Нажмите P, чтобы приостановить игру, нажмите M, чтобы отключить звук. Начните свои Звездные войны
                прямо сейчас!
            </Message>
            <Button id="start-btn" onClick={handleStart}>
                <p>Start game</p>
                <p>Loading...</p>
            </Button>
        </Column>
    );
};

const useStyles = makeStyles({
    pre: {
        whiteSpace: 'pre-line',
    },
});

export default Start;
