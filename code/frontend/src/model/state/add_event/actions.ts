import {
    AddEventSelectedField, SET_NEW_EVENT_DATE, SET_NEW_EVENT_LOCATION,
    SET_SELECTED_ADD_EVENT_FIELD, SetNewEventDateAction,
    SetNewEventLocationAction,
    SetSelectedAddEventFieldAction
} from "./types";
import {Activity} from "../../objects/activity/Activity";
import {ActivityEvent, Round} from "../../objects/activity/ActivityEvent";
import {ThunkResult} from "../store";
import RestClient from "../../../rest/RestClient";


export function doSetSelectedAddEventField(field: AddEventSelectedField, value: number): SetSelectedAddEventFieldAction{
    return {
        type: SET_SELECTED_ADD_EVENT_FIELD,
        payload: {
            field: field,
            value: value
        }
    }
}

export function doSetNewEventLocation(newLocation: string): SetNewEventLocationAction{
    return {
        type: SET_NEW_EVENT_LOCATION,
        payload: {
            value: newLocation
        }
    }
}

export function doSetNewEventDate(newDate: Date): SetNewEventDateAction{
    return {
        type: SET_NEW_EVENT_DATE,
        payload: {
            value: newDate
        }
    }
}

export function sendEvent(activity: Activity, round: Round, date: Date, location: string): ThunkResult<Promise<void>>{
    return async function (dispatch) {
        let activityEvent = new ActivityEvent(round, date, location);
        let response = await RestClient.sendActivityEvent(activity, activityEvent);
        if(response.status === "failed" || response.status === "error"){
            throw Error("Could not send event")
        }
        //TODO
    }
}