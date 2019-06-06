import {AppState} from "../store";
import {Activity, Category, Organizer} from "../../objects/activity/Activity";
import {ActivityEvent, Round} from "../../objects/activity/ActivityEvent";
import {ParticipationResult} from "../../objects/activity/Participation";

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

export function findResultById(state: AppState, id: number): ParticipationResult | undefined {
    return state.activityDataState.results.find(r => r.id === id)
}

export function findActivityEventById(state: AppState, activityEventId: number, activityId?: number): ActivityEvent | undefined {
    let events = undefined;
    if (activityId) {
        let activity = state.activityDataState.activities.find(a => a.id === activityId);
        if (activity) {
            events = activity.events;
        }
    } else {
        events = state.activityDataState.activities
            .flatMap(a => a.events)
    }
    if (events)
        return events.find(ae => ae.id === activityEventId)
}