import {Action} from "redux";

export const CHANGE_LOGIN_FIELD = "[LOGIN] CHANGE LOGIN FIELD";
export const CLEAR_LOGIN_FIELDS = "[LOGIN] CLEAR LOGIN FIELDS";
export const SET_FAILED_LOGIN = "[LOGIN] SET FAILED LOGIN";

export interface LoginState {
    usernameState: string,
    passwordState: string,
    failed: boolean,
    errorMsg: string
}

export type LoginField = "username" | "password";

export interface ChangeLoginFieldAction extends Action{
    type: typeof CHANGE_LOGIN_FIELD
    payload: {
        field: LoginField,
        value: string
    }
}

export interface ClearLoginFieldsAction extends Action{
    type: typeof CLEAR_LOGIN_FIELDS
}

export interface SetFailedLoginAction extends Action{
    type: typeof SET_FAILED_LOGIN
    payload: {
        errorMsg: string
    }
}

export type LoginActions = ChangeLoginFieldAction | ClearLoginFieldsAction | SetFailedLoginAction

