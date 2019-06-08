import {User} from "../../objects/user/User";
import {Action} from "redux";

export const SET_CURRENT_USER = "[USER] SET CURRENT USER";
export const LOGOUT_CURRENT_USER = "[USER] LOGOUT CURRENT USER";

export interface UserState {
    currentUser?: User
}

export interface SetCurrentUserAction extends Action{
    type: typeof SET_CURRENT_USER;
    payload: {
        user: User
    }
}

export interface LogoutCurrentUserAction extends Action{
    type: typeof LOGOUT_CURRENT_USER;
}

export type UserActions = SetCurrentUserAction | LogoutCurrentUserAction