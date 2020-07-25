import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {FormControl, FormGroup, FormLabel, FormText} from "react-bootstrap";
import LoaderButton from "../LoaderButton/LoaderButton";
import {useFormFields} from "../../libs/hooksLib";
import {onError} from "../../libs/errorLib";
import "./SignUp.css";
import {createUser} from "../../api/springRestApi";
import {useDispatchContext} from "../../libs/dispatchContextLib";
import {ERROR, SUCCESS} from "../../constants/Constants";

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
    const [isLoading, setIsLoading] = useState(false);

    const appDispatch = useDispatchContext();


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
            console.log(response.data);
            setIsLoading(false);
            setNewUser(response.data);
        } catch (e) {
            //onError(e);
            appDispatch({
                type: "notification",
                payload: {value: "Login Failed! " + e.response?.data, severity: ERROR, open: true}
            })
            setIsLoading(false);
        }
    }

    async function handleConfirmationSubmit(event) {
        event.preventDefault();
        if (fields.confirmationCode === "123") {
            appDispatch({type: "login", payload: {value: true, user: newUser}})
            appDispatch({
                type: "notification",
                payload: {value: "Registered successfully!", severity: SUCCESS, open: true}
            })
            history.push("/");
        } else {
            appDispatch({
                type: "notification",
                payload: {value: "Invalid confirmation code!", severity: ERROR, open: true}
            })
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