import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import LoaderButton from "../LoaderButton/LoaderButton";
import {useAppContext} from "../../libs/contextLib";
import {useFormFields} from "../../libs/hooksLib";
import {onError} from "../../libs/errorLib";
import "./SignUp.css";
import {createUser} from "../../api/springRestApi";

export default function SignUp() {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
        confirmationCode: "",
    });
    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const {userHasAuthenticated, setUserList, userList} = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try{
            const newUser = {
                name: "",
                password: fields.password,
                email: fields.email
            };
            await createUser(newUser);
            setIsLoading(false);
            userList.push(newUser);
            setUserList(userList);
            setNewUser(newUser);
        }catch(e){
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();
        if (fields.confirmationCode === "123") {
            localStorage.setItem("loggedIn", "true");
            userHasAuthenticated(true);
            history.push("/");
        } else {
            onError(new Error("Invalid confirmation code!"));
            setIsLoading(false);
        }
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" bsSize="large">
                    <ControlLabel>Confirmation Code</ControlLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                    <HelpBlock>Please check your email for the code.</HelpBlock>
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateConfirmationForm()}
                >
                    Verify
                </LoaderButton>
            </form>
        );
    }

    function renderForm() {
        return (
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" bsSize="large">
                    <ControlLabel>Confirm Password</ControlLabel>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Register
                </LoaderButton>
            </form>
        );
    }

    return (
        <div className="SignUp">
            {newUser === null ? renderForm() : renderConfirmationForm()}
        </div>
    );
}