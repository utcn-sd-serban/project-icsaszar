import {Action} from "redux";


export const SET_SELECTED_ADD_PARTICIPATION_FIELD = "[ADD PARTICIPATION] SET SELECTED FIELD";

export interface AddParticipationState {
    selectedEventId: number;
    selectedTeacherId: number;
    selectedResultId: number;
    selectedActivityId: number;
}

export type AddParticipationSelectedField = keyof Pick<AddParticipationState,
    | "selectedEventId"
    | "selectedResultId"
    | "selectedTeacherId"
    | "selectedActivityId" >

export interface SetSelectedAddParticipationFieldAction extends Action {
    type: typeof SET_SELECTED_ADD_PARTICIPATION_FIELD;
    payload: {
        field: AddParticipationSelectedField;
        value: number;
    }
}

export type AddParticipationActions = SetSelectedAddParticipationFieldAction;