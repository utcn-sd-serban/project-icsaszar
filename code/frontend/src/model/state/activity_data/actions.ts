import {
    ActivityData,
    RECEIVE_ACTIVITY_DATA,
    ReceiveActivityDataAction,
    REQUEST_ACTIVITY_DATA,
    RequestActivityDataAction
} from "./types";
import {ThunkResult} from "../store";
import DataRestClient from "../../../rest/DataRestClient";

export function doReceiveActivityData(data: ActivityData): ReceiveActivityDataAction {
    return {
        type: RECEIVE_ACTIVITY_DATA,
        payload: data
    }
}

export function doRequestActivityData(): RequestActivityDataAction {
    return {
        type: REQUEST_ACTIVITY_DATA
    }
}

export function fetchActivityData(): ThunkResult<Promise<void>> {
    return async function (dispatch) {
        dispatch(doRequestActivityData);
        let response = await DataRestClient.fetchActivityData();
        if(response.status === "error" || response.status === "failed")
            throw Error("Could not fetch activity data");
        let data: ActivityData = await response.data.json();
        dispatch(doReceiveActivityData(data))
    }
}
