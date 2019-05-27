import {User} from "../../objects/User";
import {Action} from "redux";

export const SET_CURRENT_USER = "[USER] SET CURRENT USER";

export interface UserState {
    currentUser?: User
}

export interface SetCurrentUserAction extends Action{
    type: typeof SET_CURRENT_USER;
    payload: User
}

export type UserActions = SetCurrentUserAction