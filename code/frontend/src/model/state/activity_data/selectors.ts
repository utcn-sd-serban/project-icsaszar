import {AppState} from "../store";
import {Activity, Category, Organizer} from "../../objects/activity/Activity";
import {Round} from "../../objects/activity/ActivityEvent";

export function findOrganizerById(state: AppState, id: number): Organizer | undefined {
    return state.activityDataState.organizers.find(o => o.id === id)
}

export function findCategoryById(state: AppState, id: number): Category | undefined {
    return state.activityDataState.categories.find(c => c.id === id)
}

export function findRoundById(state: AppState, id: number): Round | undefined {
    return state.activityDataState.rounds.find(r => r.id === id)
}

export function findActivityById(state: AppState, id: number): Activity | undefined {
    return state.activityDataState.activities.find(a => a.id === id)
}