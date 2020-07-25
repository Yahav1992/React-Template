import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import {makeStyles} from '@material-ui/core/styles';
import {useStateContext} from "../../libs/stateContextLib";
import {useDispatchContext} from "../../libs/dispatchContextLib";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
        '& .MuiAlert-message':{
            padding: "15px 0",
            fontSize: "medium",
        },
        '& .MuiAlert-icon':{
            padding: "15px 0",
        }
    },
}));

export default function CustomizedSnackbars() {
    const classes = useStyles();
    const appState = useStateContext();
    const {notifications, severity, notificationOpen} = appState;
    const appDispatch = useDispatchContext();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        appDispatch({type: "notification", payload: {value: "", severity: "", open: false}})
    };

    return (
        <div className={classes.root}>
            <Snackbar open={notificationOpen} autoHideDuration={99900} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {notifications}
                </Alert>
            </Snackbar>
        </div>
    );
}