import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import RSSchool from '../assets/img/rs_school_js.png';
import { useTranslation } from 'react-i18next';

const Footer = () => {

    const classes = useStyles({});
    const { t, i18n  } = useTranslation();

    return (
            <footer className={classes.footer}>
                <span>
                    {t('Created by')}
                    <a className={classes.link} href="https://github.com/AnnaDavydenko">  Anna Davydenko</a>
                </span>
                <span>
                        <div className={classes.linkSchool}>
                            <a className={classes.link} href="https://rs.school/js/" >
                                <img src={RSSchool} alt="rs school logo" />
                            </a>
                            <span>2021</span>
                        </div>
                </span>
            </footer>
    );
};

const useStyles = makeStyles({
    footer: {
        top: '-25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        position: 'relative',
        color: '#f1dfd6',
        fontFamily: 'Cinzel',
    },
    link: {
        color: '#ced8e6',
        outline: 'none',
        textDecoration: 'none',
        '&:hover':{
            color: '#ffc69dc9',
        }
    },
    linkSchool: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100px',
        '& img': {
            width: '55px',
        },

    },
});

export default Footer;
