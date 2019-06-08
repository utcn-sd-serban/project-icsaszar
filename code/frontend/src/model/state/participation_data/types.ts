import {Participation} from "../../objects/activity/Participation";
import {Action} from "redux";

export const REQUEST_PARTICIPATION_DATA = "[PARTICIPATION DATA] REQUEST DATA";
export const RECEIVE_PARTICIPATION_DATA = "[PARTICIPATION DATA] RECEIVE DATA";
export const ADD_PARTICIPATION_DATA = "[PARTICIPATION DATA] ADD";

export interface ParticipationDataState {
    participations: Participation[];
    isFetching: boolean;
}

export interface RequestParticipationDataAction extends Action{
    type: typeof REQUEST_PARTICIPATION_DATA
}

export interface ReceiveParticipationDataAction extends Action{
    type: typeof RECEIVE_PARTICIPATION_DATA
    payload: {
        data: Participation[]
    }
}

export interface AddParticipationDataAction extends Action{
    type: typeof ADD_PARTICIPATION_DATA
    payload: {
        data: Participation
    }
}

export type ParticipationDataActions =
    | ReceiveParticipationDataAction
    | RequestParticipationDataAction
    | AddParticipationDataAction

