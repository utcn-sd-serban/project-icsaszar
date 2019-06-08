import LoginRestClient from "../../../rest/LoginRestClient";
import {doSetFailedLogin} from "../login/actions";
import {User, UserRole} from "../../objects/user/User";
import {LOGOUT_CURRENT_USER, LogoutCurrentUserAction, SET_CURRENT_USER, SetCurrentUserAction} from "./types";
import {ThunkResult} from "../store";
import {fetchActivityData} from "../activity_data/actions";
import {fetchTeacherData} from "../teacher_data/actions";
import BaseRestClient from "../../../rest/BaseRestClient";
import {fetchParticipationData} from "../participation_data/actions";
import {fetchTeacherReport} from "../report/actions";

export function doSetCurrentUser(id: number,
                                 username: string,
                                 firstName: string,
                                 lastName: string,
                                 role: UserRole): SetCurrentUserAction {
    return {
        type: SET_CURRENT_USER,
        payload: {
            user: {
                id: id,
                username: username,
                firstName: firstName,
                lastName: lastName,
                role: role
            }
        }
    }
}

export function doLogoutCurrentUser(): LogoutCurrentUserAction{
    return {
        type: LOGOUT_CURRENT_USER
    }
}

export function logoutUser(): ThunkResult<Promise<void>> {
    return async function (dispatch) {
        let response = await LoginRestClient.logout();
        if ((response.status === "error") || (response.status === "failed")) {
            console.log("Error logging out");
            return;
        } else {
            dispatch(doLogoutCurrentUser());
        }
    }
}

export function loginUser(username: string, password: string): ThunkResult<Promise<void>> {
    return async function (dispatch) {
        LoginRestClient.initialize(username, password);
        BaseRestClient.initialize(username, password);
        let response = await LoginRestClient.login();
        if ((response.status === "error") || (response.status === "failed")) {
            dispatch(doSetFailedLogin());
            return;
        } else {
            response = await LoginRestClient.fetchDetails();
            if(response.status === "succeeded"){
                let data: User = await response.data.json();
                let {id, username, firstName, lastName, role} = data;
                dispatch(doSetCurrentUser(id, username, firstName, lastName, role));
                await dispatch(fetchActivityData());
                switch (role) {
                    case "STUDENT":
                        await dispatch(fetchTeacherData());
                        await dispatch(fetchParticipationData());
                        break;
                    case "TEACHER":
                        await dispatch(fetchParticipationData());
                        await dispatch(fetchTeacherReport());
                        break;
                    case "ADMIN":
                        break;
                }
            }
        }
    }
}