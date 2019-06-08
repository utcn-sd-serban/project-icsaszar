import {
    AddParticipationSelectedField, SET_PARTCIPATION_ALREADY_EXISTS_ERROR,
    SET_SELECTED_ADD_PARTICIPATION_FIELD, SetPartcipationAlreadyExistsErrorAction,
    SetSelectedAddParticipationFieldAction
} from "./types";
import {ActivityEvent} from "../../objects/activity/ActivityEvent";
import {Teacher} from "../../objects/user/Teacher";
import {ParticipationResult} from "../../objects/activity/Participation";
import {ThunkResult} from "../store";
import StudentRestClient from "../../../rest/StudentRestClient";
import {findActivityEventById} from "../activity_data/selectors";
import {ErrorDTO} from "../../objects/error/ErrorDTO";

export function doSetSelectedAddParticipationField(field: AddParticipationSelectedField, value: number): SetSelectedAddParticipationFieldAction{
    return {
        type: SET_SELECTED_ADD_PARTICIPATION_FIELD,
        payload: {
            field: field,
            value: value
        }
    }
}

export function doSetParticipationAlreadyExistsError(errorMsg: string): SetPartcipationAlreadyExistsErrorAction{
    return {
        type: SET_PARTCIPATION_ALREADY_EXISTS_ERROR,
        payload: {
            errorMsg: errorMsg
        }
    }
}

export function sendNewParticipation(event: ActivityEvent, preparingTeacher: Teacher, result: ParticipationResult): ThunkResult<Promise<void>>{
    return async function(dispatch){
        let response = await StudentRestClient.sendParticipation(event, preparingTeacher, result);
        if(response.status === "failed"){
            throw Error("Request failed")
        }
        if(response.status === "error"){
            let data: ErrorDTO = await response.data.json();
            dispatch(doSetParticipationAlreadyExistsError(data.msg))
        }
    }
}


export function setFirstSelectedActivityEvent(): ThunkResult<Promise<void>> {
    return async function(dispatch, getState) {
        let state = getState();
        let {addParticipationState: {selectedActivityId, selectedEventId}} = state;
        let events = state.activityDataState.activities.find(a => a.id === selectedActivityId)!!.events;
        if(events !== []){
            dispatch(doSetSelectedAddParticipationField("selectedEventId", events[0].id))
        }
    }
}