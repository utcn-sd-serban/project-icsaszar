import {LoginField} from "../../model/state/login/types";
import React from "react";
import {AppState} from "../../model/state/store";
import {Dispatch} from "redux";
import {loginPresenter} from "../../presenter/login/LoginPresenter";
import {connect} from "react-redux";
import {LoginView} from "./LoginView";
import {RouteComponentProps, } from "react-router";
import * as H from 'history'

interface Props extends RouteComponentProps<any>{
    username: string;
    password: string;
    onLogin: (username: string, password: string, history: H.History) => () => void;
    onChangeInput: (field: LoginField, value: string) => void;
    loginFailed: boolean;
    errorMsg: string;
}

const SmartLoginView: React.FC<Props> =
    ({
         errorMsg,
         loginFailed,
         onChangeInput,
         username,
         password,
         onLogin,
         history
     }: Props) => (
        <LoginView
            errorMsg={errorMsg}
            loginFailed={loginFailed}
            username={username}
            password={password}
            onLogin={onLogin(username, password, history)}
            onChangeInput={onChangeInput}
        />
    );

function mapStateToProps(state: AppState): Pick<Props, "password" | "username" | "loginFailed" | "errorMsg"> {
    return {
        username: state.loginState.usernameState,
        password: state.loginState.passwordState,
        loginFailed: state.loginState.failed,
        errorMsg: state.loginState.errorMsg
    }
}

function mapDispatchToProps(dispatch: Dispatch): Pick<Props, "onChangeInput" | "onLogin"> {
    const presenter = loginPresenter(dispatch);
    return {
        onLogin: (username, password, history) => () =>
            presenter.handleLogin(username, password, history),
        onChangeInput: (field, value) =>
            presenter.handleInputChange(field, value)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartLoginView);
