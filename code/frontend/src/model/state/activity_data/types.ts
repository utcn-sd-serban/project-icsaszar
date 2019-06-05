import {Activity, Category, Organizer} from "../../objects/activity/Activity";
import {Round} from "../../objects/activity/ActivityEvent";
import {Action} from "redux";
import {Omit} from "../../../App";

export const REQUEST_ACTIVITY_DATA = "[ACTIVITY DATA] REQUEST DATA";
export const RECEIVE_ACTIVITY_DATA = "[ACTIVITY DATA] RECEIVE DATA";

export interface ActivityDataState {
    organizers: Organizer[];
    categories: Category[];
    activities: Activity[];
    rounds: Round[];
    isFetching: boolean;
}

export type ActivityData = Omit<ActivityDataState, "isFetching">

export interface RequestActivityDataAction extends Action {
    type: typeof REQUEST_ACTIVITY_DATA;
}

export interface ReceiveActivityDataAction extends Action{
    type: typeof RECEIVE_ACTIVITY_DATA;
    payload: ActivityData
}

export type ActivityDataActions = ReceiveActivityDataAction | RequestActivityDataAction;