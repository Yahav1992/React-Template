import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import {useAppContext} from "../../libs/contextLib";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

export default function CustomizedSnackbars(props) {
    const classes = useStyles();
    const {notificationOpen, setNotificationOpen} = useAppContext();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNotificationOpen(false);
    };

    return (
        <div className={classes.root}>
            <Snackbar open={notificationOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={props.severity}>
                    {props.messages}
                </Alert>
            </Snackbar>
        </div>
    );
}