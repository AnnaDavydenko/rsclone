import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface IButton {
    id?: string;
    disabled?: boolean;
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const Button = (props: IButton) => {
    const { id = '', disabled = false, children, onClick } = props;
    const classes = useStyles({});
    return (
        <button id={id} className={classes.root} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};

const useStyles = makeStyles({
    root: {
        position: 'relative',
        display: 'inline-block',
        margin: '0 auto 5px auto',
        cursor: 'pointer',
        borderRadius: '10px',
        textAlign: 'center',
        padding: '6px 20px',
        outline: 'none',
        border: 'none',
        color: '#eff4fb',
        background: 'linear-gradient(180deg, rgb(1 0 2) 0%, rgb(121 18 18) 100%)',
        fontFamily: 'Cinzel',
        fontWeight: 700,
        fontSize: '32px',
        textShadow: '0px 1px #fff, 0px -1px #262F33',
        transition: 'box-shadow .1s ease-in-out',
        boxShadow: '0px 5px 0px #331010',
        '&:hover': {
            color: '#100919',
            textShadow: '1px -1px #781212',
            background: 'linear-gradient(180deg, rgb(15 9 25) 0%, rgba(255 169 108 / 79%) 100%)',
        },
        '&:active': {
            boxShadow: '0px 3px transparent',
            transform: 'translate(0, 5px)',
        }
    },
});

export default Button;
