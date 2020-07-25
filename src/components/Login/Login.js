import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import FormControl from '@material-ui/core/FormControl';
import LoaderButton from "../../components/LoaderButton/LoaderButton";
import {useFormFields} from "../../libs/hooksLib";
import "./Login.css";
import {loginUser} from "../../api/springRestApi";
import TextField from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
import {ERROR, SUCCESS} from "../../constants/Constants";
import {useDispatchContext} from "../../libs/dispatchContextLib";

const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#fff',
            fontSize: '1rem'
        },
        '& .MuiFormLabel-filled': {
            color: '#fff',
            fontSize: '1rem'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#fff',
        },
        '& label': {
            color: '#337ab7',
            fontSize: '1.5rem'
        },
        '& input': {
            color: '#fff',
            fontSize: '1.5rem'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#337ab7',
            },
            '&:hover fieldset': {
                borderColor: '#fff',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#fff',
            },
        },
    },
})(TextField);

const LoginForm = ({values, changed}) => (<>
    <FormControl>
        <CssTextField
            id="userName"
            label="User Name"
            type="userName"
            variant="outlined"
            value={values.userName}
            onChange={changed}
        />
    </FormControl>
    <FormControl>
        <CssTextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            value={values.password}
            onChange={changed}
        />
    </FormControl>
</>)

export default function Login() {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [fields, handleFieldChange] = useFormFields({
        password: "",
        userName: "",
        email: "",
    });
    const appDispatch = useDispatchContext();

    function validateForm() {
        return fields.password.length > 0 && fields.userName.length > 0;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const newUser = {...fields};
        try {
            const response = await loginUser(newUser);
            console.log(response);
            appDispatch({
                type: "notification",
                payload: {value: "Login successfully!", severity: SUCCESS, open: true}
            })
            setIsLoading(true);
            appDispatch({type: "login", payload: {value: true, user: response.data}})
            history.push("/");
        } catch (e) {
            //onError(e);
            appDispatch({
                type: "notification",
                payload: {value: "Login Failed! " + e.response?.data, severity: ERROR, open: true}
            })
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <LoginForm values={fields} changed={handleFieldChange}/>
                <LoaderButton
                    block
                    type="submit"
                    size="lg"
                    isLoading={isLoading}
                    disabled={!validateForm()}
                >
                    Login
                </LoaderButton>
            </form>
        </div>
    );
}