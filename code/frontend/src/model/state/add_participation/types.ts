import {Action} from "redux";


export const SET_SELECTED_ADD_PARTICIPATION_FIELD = "[ADD PARTICIPATION] SET SELECTED FIELD";
export const SET_PARTCIPATION_ALREADY_EXISTS_ERROR = "[ADD PARTICIPATION] SET ALREADY EXISTS ERROR";

export interface AddParticipationState {
    selectedEventId: number;
    selectedTeacherId: number;
    selectedResultId: number;
    selectedActivityId: number;
    alreadyExistsError: string | undefined;
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

export interface SetPartcipationAlreadyExistsErrorAction extends Action{
    type: typeof SET_PARTCIPATION_ALREADY_EXISTS_ERROR
    payload: {
        errorMsg: string
    }
}

export type AddParticipationActions =
    | SetSelectedAddParticipationFieldAction
    | SetPartcipationAlreadyExistsErrorAction