import {
    ADD_PARTICIPATION_DATA,
    AddParticipationDataAction,
    RECEIVE_PARTICIPATION_DATA,
    ReceiveParticipationDataAction,
    REQUEST_PARTICIPATION_DATA,
    RequestParticipationDataAction
} from "./types";
import {Participation} from "../../objects/activity/Participation";
import {ThunkResult} from "../store";
import TeacherRestClient from "../../../rest/TeacherRestClient";
import StudentRestClient from "../../../rest/StudentRestClient";
import {ResponseData} from "../../../rest/BaseRestClient";

export function doRequestParticipationData(): RequestParticipationDataAction {
    return {
        type: REQUEST_PARTICIPATION_DATA
    }
}

export function doReceiveParticipationData(data: Participation[]): ReceiveParticipationDataAction {
    return {
        type: RECEIVE_PARTICIPATION_DATA,
        payload: {
            data: data
        }
    }
}

export function doAddParticipationData(data: Participation): AddParticipationDataAction {
    return {
        type: ADD_PARTICIPATION_DATA,
        payload: {
            data: data
        }
    }
}

export function fetchParticipationData(): ThunkResult<Promise<void>> {
    return async function (dispatch, getState) {
        let {userState: {currentUser}} = getState();

        if(currentUser === undefined)
            return;

        if((currentUser.role !== "STUDENT") && (currentUser.role !== "TEACHER"))
            return;

        dispatch(doRequestParticipationData);
        let response: ResponseData;


        if(currentUser.role === "STUDENT")
            response = await StudentRestClient.fetchParticipationData();
        else
            response = await TeacherRestClient.fetchParticipationData();


        if(response.status === "failed" || response.status === "error")
            throw Error("Could not fetch participation data");

        let data: Participation[] = await response.data.json();
        dispatch(doReceiveParticipationData(data))
    }
}