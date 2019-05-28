import * as React from "react";
import {LoginField} from "../../model/state/login/types";

interface Props {
    username: string;
    password: string;
    onLogin: () => void;
    onChangeInput: (field: LoginField, newValue: string) => void;
    loginFailed: boolean;
    errorMsg: string;
}

export function LoginView(
    {
        onLogin,
        password,
        username,
        onChangeInput,
        loginFailed,
        errorMsg
    }: Props) {

    return (
        <div className="jumbotron flex-fill align-items-center h-auto">
            {
                loginFailed &&
                <div className="alert alert-danger" role="alert">
                    {"Login failed" + ((errorMsg !== "") ? ` message: ${errorMsg}` : "!")}
                </div>
            }
            <div className="container h-100 justify-content-center align-items-center mx-auto">
                <div className="row ">
                    <div className="col">
                        Username
                    </div>
                    <div className="col">
                        <input
                            data-lpignore="true"
                            className="form-control"
                            onChange={({target: {value}}) => onChangeInput("username", value)}
                            value={username}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        Password
                    </div>
                    <div className="col">
                        <input
                            data-lpignore="true"
                            className="form-control"
                            type="password"
                            onChange={({target: {value}}) => onChangeInput("password", value)}
                            value={password}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary" onClick={onLogin}>
                            Log in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}