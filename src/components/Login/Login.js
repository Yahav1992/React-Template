import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {ControlLabel, FormControl, FormGroup} from "react-bootstrap";
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import {useAppContext} from "../../libs/contextLib";
import {useFormFields} from "../../libs/hooksLib";
import {onError} from "../../libs/errorLib";
import "./Login.css";
import {loginUser} from "../../api/springRestApi";


export default function Login() {
    const history = useHistory();
    const {userHasAuthenticated, userList} = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });


    function validateForm() {
        return fields.email.length > 0 && fields.password.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);

        const newUser = {
            name: "",
            password: fields.password,
            email: fields.email
        };
        try {
            await loginUser(newUser);
            userHasAuthenticated(true);
            setTimeout(() => history.push("/"), 1000);
        }catch(e){
            onError(e);
            setIsLoading(false);
        }

    }

    return (
        <div className="Login">
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
                <LoaderButton
                    block
                    type="submit"
                    bsSize="large"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Login
                </LoaderButton>
            </form>
        </div>
    );
}