import {Action} from "redux";


export const SET_SELECTED_ADD_EVENT_FIELD = "[ADD EVENT] SET SELECTED FIELD";
export const SET_NEW_EVENT_LOCATION = "[ADD EVENT] SET LOCATION";
export const SET_NEW_EVENT_DATE = "[ADD EVENT] SET DATE";

export interface AddEventState {
    location: string;
    selectedActivityId: number;
    selectedRoundId: number;
    date: Date;
}

export type AddEventSelectedField = keyof Pick<AddEventState, "selectedActivityId" | "selectedRoundId">

export interface SetSelectedAddEventFieldAction extends Action{
    type: typeof SET_SELECTED_ADD_EVENT_FIELD
    payload: {
        field: AddEventSelectedField;
        value: number;
    }
}

export interface SetNewEventLocationAction extends Action{
    type: typeof SET_NEW_EVENT_LOCATION
    payload: {
        value: string;
    }
}

export interface SetNewEventDateAction extends Action{
    type: typeof SET_NEW_EVENT_DATE
    payload: {
        value: Date;
    }
}

export type AddEventActions =
    | SetSelectedAddEventFieldAction
    | SetNewEventLocationAction
    | SetNewEventDateAction

