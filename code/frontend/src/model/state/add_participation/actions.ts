import {
    AddParticipationSelectedField,
    SET_SELECTED_ADD_PARTICIPATION_FIELD,
    SetSelectedAddParticipationFieldAction
} from "./types";
import {ActivityEvent} from "../../objects/activity/ActivityEvent";
import {Teacher} from "../../objects/user/Teacher";
import {ParticipationResult} from "../../objects/activity/Participation";
import {ThunkResult} from "../store";
import StudentRestClient from "../../../rest/StudentRestClient";
import {findActivityEventById} from "../activity_data/selectors";

export function doSetSelectedAddParticipationField(field: AddParticipationSelectedField, value: number): SetSelectedAddParticipationFieldAction{
    return {
        type: SET_SELECTED_ADD_PARTICIPATION_FIELD,
        payload: {
            field: field,
            value: value
        }
    }
}

export function sendNewParticipation(event: ActivityEvent, preparingTeacher: Teacher, result: ParticipationResult): ThunkResult<Promise<void>>{
    return async function(dispatch){
        await StudentRestClient.sendParticipation(event, preparingTeacher, result)
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