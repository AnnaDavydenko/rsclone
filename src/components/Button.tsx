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
        display: 'block',
        fontWeight: 'bold',
        fontSize: '1rem',
        color: 'inherit',
        textDecoration: 'none',
        margin: '0 auto 5px auto',
        border: 'solid 1px #D94E3B',
        background: '#cb3b27',
        textAlign: 'center',
        padding: '6px 20px',
        transition: 'all 0.1s',
        boxShadow: '0px 5px 0px #84261a',
        borderRadius: '20px',
        outline: 'none',
        cursor: 'pointer',
        overflow: 'hidden',
    },
});

export default Button;
