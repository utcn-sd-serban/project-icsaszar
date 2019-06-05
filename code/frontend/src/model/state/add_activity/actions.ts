import {
    AddActivitySelectedField,
    AddActivityState, SET_ACTIVITY_NAME,
    SET_SELECTED_ADD_ACTIVITY_FIELD,
    SetActivityNameAction,
    SetSelectedAddActivityFieldAction
} from "./types";
import {Activity, Category, Organizer} from "../../objects/activity/Activity";
import {ThunkResult} from "../store";
import RestClient from "../../../rest/RestClient";


export function doSetSelectedAddActivityField(field: AddActivitySelectedField, value: number): SetSelectedAddActivityFieldAction {
    return {
        type: SET_SELECTED_ADD_ACTIVITY_FIELD,
        payload: {
            field: field,
            value: value
        }
    }
}

export function doSetActivityName(newName: string): SetActivityNameAction {
    return {
        type: SET_ACTIVITY_NAME,
        payload: {
            value: newName
        }
    }
}

export function sendActivity(activityName: string, organizer: Organizer, category: Category): ThunkResult<Promise<void>>{
    return async function (dispatch, getState){
        let activity: Activity = new Activity(activityName, organizer, category);
        let response = await RestClient.sendActivity(activity);
        if(response.status === "error" || response.status === "failed"){
            throw Error("Could not send activity")
        }
        //TODO maybe do stuff with the response
    }
}