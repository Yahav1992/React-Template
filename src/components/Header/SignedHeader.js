import React from 'react';
import {NavLink} from "react-router-dom";
import {useDispatchContext} from "../../libs/dispatchContextLib";
import FaceIcon from '@material-ui/icons/Face';
import IconButton from "@material-ui/core/IconButton";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const SignedHeader = () => {
    const classes = useStyles();
    const appDispatch = useDispatchContext();

    function handleLogout() {
        appDispatch({type: "login", payload: {value: false, user: {}}});
    }

    return (
        <div>
            <NavLink activeClassName="is-active" to="/profile">
                <IconButton aria-label="delete" className={classes.margin} size="medium">
                    <FaceIcon fontSize="medium"/>
                </IconButton>
            </NavLink>
            <NavLink activeClassName="is-active" to="/" onClick={handleLogout}>Logout</NavLink>
        </div>
    );
};

export default SignedHeader;