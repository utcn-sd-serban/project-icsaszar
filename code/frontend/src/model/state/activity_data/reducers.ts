import {ActivityDataActions, ActivityDataState, RECEIVE_ACTIVITY_DATA, REQUEST_ACTIVITY_DATA} from "./types";
import {Activity, Category, Organizer} from "../../objects/activity/Activity";
import {ActivityEvent} from "../../objects/activity/ActivityEvent";

const initialState: ActivityDataState = {
    activities: [],
    categories: [new Category("Y", 1), new Category("X", 2)],
    organizers: [new Organizer("A", 1), new Organizer("B", 2)],
    results: [],
    rounds: [],
    isFetching: false
};

export function activityDataReducer(state: ActivityDataState = initialState, action: ActivityDataActions): ActivityDataState {
    switch (action.type) {
        case RECEIVE_ACTIVITY_DATA:
            return {
                ...state,
                ...action.payload,
                activities: action.payload.activities.map(a =>
                    Activity.fromObject({
                        ...a,
                        events: a.events.map(e =>
                                ActivityEvent.fromJSON(e)
                            )
                    })
                ),
                isFetching: false
            };
        case REQUEST_ACTIVITY_DATA:
            return {
                ...state,
                isFetching: true
            };
        default:
            return state;
    }
}