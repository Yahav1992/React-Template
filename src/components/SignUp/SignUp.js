import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {FormControl, FormGroup, FormLabel, FormText} from "react-bootstrap";
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
        userName: "",
        confirmPassword: "",
        confirmationCode: "",
    });
    const history = useHistory();
    const [newUser, setNewUser] = useState(null);
    const {setLoggedIn} = useAppContext();
    const [isLoading, setIsLoading] = useState(false);

    function validateForm() {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.userName.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const newUser = {
                ...fields
            };
            const response = await createUser(newUser);
            console.log(response);
            setIsLoading(false);
            setNewUser(newUser);
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();
        if (fields.confirmationCode === "123") {
            localStorage.setItem("loggedIn", "true");
            setLoggedIn(true);
            history.push("/");
        } else {
            onError(new Error("Invalid confirmation code!"));
            setIsLoading(false);
        }
    }

    function renderConfirmationForm() {
        return (
            <form onSubmit={handleConfirmationSubmit}>
                <FormGroup controlId="confirmationCode" size="lg">
                    <FormLabel>Confirmation Code</FormLabel>
                    <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                    />
                    <FormText>Please check your email for the code.</FormText>
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    size="lg"
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
                <FormGroup controlId="userName" size="lg">
                    <FormLabel>User Name</FormLabel>
                    <FormControl
                        autoFocus
                        type="userName"
                        value={fields.userName}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="email" size="lg">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" size="lg">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <FormGroup controlId="confirmPassword" size="lg">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        type="password"
                        onChange={handleFieldChange}
                        value={fields.confirmPassword}
                    />
                </FormGroup>
                <LoaderButton
                    block
                    type="submit"
                    size="lg"
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