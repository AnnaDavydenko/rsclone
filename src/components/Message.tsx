import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

interface IMessage {
    classes?: string;
    children: React.ReactNode;
}

const Message = (props: IMessage) => {
    const classes = useStyles({});
    return <p className={classnames(classes.root, props.classes)}>{props.children}</p>;
};

const useStyles = makeStyles({
    root: {
        margin: '0 auto',
        fontSize: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Message;
