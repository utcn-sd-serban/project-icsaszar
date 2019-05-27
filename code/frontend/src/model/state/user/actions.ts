import {AppState} from "../store";
import {ThunkAction} from "redux-thunk";
import {Action} from "redux";
import RestClient from "../../../rest/RestClient";
import {doSetFailedLogin} from "../login/actions";
import {User, UserRole} from "../../objects/User";
import {SET_CURRENT_USER, SetCurrentUserAction} from "./types";

type ThunkResult<R> = ThunkAction<R, AppState, undefined, Action>;

export function doSetCurrentUser(username: string,
                                 firstName: string,
                                 lastName: string,
                                 role: UserRole): SetCurrentUserAction {
    return {
        type: SET_CURRENT_USER,
        payload: {
            username: username,
            firstName: firstName,
            lastName: lastName,
            role: role
        }
    }
}

export function loginUser(username: string, password: string): ThunkResult<Promise<void>> {
    return async function (dispatch) {
        RestClient.initialize(username, password);
        let response = await RestClient.login();
        if ((response.status === "error") || (response.status === "failed")) {
            dispatch(doSetFailedLogin());
            return;
        } else {
            response = await RestClient.fetchDetails();
            if(response.status === "succeeded"){
                let data: User = await response.data.json();
                let {username, firstName, lastName, role} = data;
                dispatch(doSetCurrentUser(username, firstName, lastName, role));
            }

        }
    }
}