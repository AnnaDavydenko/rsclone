import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';

interface IColumn {
    id?: string;
    classes?: string;
    children: React.ReactNode;
}

const Column = (props: IColumn) => {
    const classes = useStyles({});
    return (
        <div id={props.id} className={classnames(classes.root, props.classes)}>
            {props.children}
        </div>
    );
};

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
});

export default Column;
