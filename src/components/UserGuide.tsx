import React from 'react';
import { makeStyles, Theme, useTheme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MobileStepper from '@material-ui/core/MobileStepper';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import time from '../assets/img/time3.png';
import fuel from '../assets/img/fuel-station.png';
import score from '../assets/img/score.png';
import playerBulletImg from '../assets/img/playerBullet.png';
import zoom_in from '../assets/img/zoom-in.png';
import zoom_out from '../assets/img/zoom-out.png';
import mute from '../assets/img/mute.png';
import unmute from '../assets/img/audio.png';
import play from '../assets/img/play.png';
import pause from '../assets/img/pause.png';
import { useTranslation } from 'react-i18next';

interface IProps {
    open: boolean;
    handleClose: () => void;
}
const tutorialSteps = [
    {
        label: 'Total playing time',
        imgPath: `${time}`,
    },
    {
        label: 'Remaining fuel',
        imgPath:`${fuel}`,
    },
    {
        label: 'Your score in the game',
        imgPath:`${score}`,
    },
    {
        label: 'Number of defeated opponents',
        imgPath:`${playerBulletImg}`,
    },
    {
        label: 'Increase text in the game',
        imgPath:`${zoom_in}`,
    },
    {
        label: 'Decrease text in the game',
        imgPath:`${zoom_out}`,
    },
    {
        label: 'Turn off the sound',
        imgPath:`${mute}`,
    },
    {
        label: 'Turn on the sound',
        imgPath:`${unmute}`,
    },
    {
        label: 'Pause the game',
        imgPath:`${pause}`,
    },
    {
        label: 'Resume game',
        imgPath:`${play}`,
    },
];

const UserGuide = (props: IProps) => {
const {open, handleClose} = props;
    const classes = useStyles({});
    const theme = useTheme();
    // const [open, setOpen] = React.useState(false);
    //
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    const { t, i18n  } = useTranslation();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Dialog
            open={open}
            classes={{ paper: classes.paper }}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >

            <DialogContent>
                <div className={classes.root}>
                    <Paper square elevation={0} className={classes.header}>
                        <Typography className={classes.headerText}>{t(tutorialSteps[activeStep].label)}</Typography>
                    </Paper>
                    <div className={classes.imgContainer}>
                        <img
                            className={classes.img}
                            src={tutorialSteps[activeStep].imgPath}
                            alt={tutorialSteps[activeStep].label}
                        />
                    </div>
                    <MobileStepper
                        variant="dots"
                        steps={6}
                        position="static"
                        activeStep={activeStep}
                        className={classes.root}
                        nextButton={
                            <Button className={classes.button} size="small" onClick={handleNext} disabled={activeStep === 5}>
                                Next
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button className={classes.button} size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Back
                            </Button>
                        }
                    />
                </div>
            </DialogContent>

            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const useStyles = makeStyles(() =>
    createStyles({
        paper: {
            width: '400px',
            background: '#37364429',
        },
        root: {
            background: '#37364429',
            color: '#ced8e6',
        },
        header: {
            display: 'flex',
            alignItems: 'center',
            height: 50,
            background: '#37364429',
        },
        headerText: {
            fontFamily: 'Cinzel',
            color: '#ced8e6',
        },
        imgContainer: {
            width: '115px',
            height: '95px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            margin: '0 auto',
        },
        img: {},
        button: {
            color: '#ced8e6',
        },
    }),
);

export default UserGuide;
