
import {RECEIVE_REPORT, ReportActions, ReportState, REQUEST_REPORT} from "./types";

const initialState: ReportState = {
    report: undefined,
    isFetching: false
};

export function reportReducer(state: ReportState = initialState, action: ReportActions): ReportState {
    switch (action.type) {
        case RECEIVE_REPORT:
            return {
                ...state,
                report: action.payload.data,
                isFetching: false
            };
        case REQUEST_REPORT:
            return {
                ...state,
                isFetching: true
            };
        default:
            return state;
    }
}