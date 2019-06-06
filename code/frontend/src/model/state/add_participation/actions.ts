import {
    AddParticipationSelectedField,
    SET_SELECTED_ADD_PARTICIPATION_FIELD,
    SetSelectedAddParticipationFieldAction
} from "./types";

export function doSetSelectedAddParticipation(field: AddParticipationSelectedField, value: number): SetSelectedAddParticipationFieldAction{
    return {
        type: SET_SELECTED_ADD_PARTICIPATION_FIELD,
        payload: {
            field: field,
            value: value
        }
    }
}