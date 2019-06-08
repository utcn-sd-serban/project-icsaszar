import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../../../model/state/store";
import {Action} from "redux";
import {Activity} from "../../../model/objects/activity/Activity";
import {Round} from "../../../model/objects/activity/ActivityEvent";
import {
    doSetNewEventDate,
    doSetNewEventLocation,
    doSetSelectedAddEventField,
    sendEvent
} from "../../../model/state/add_event/actions";
import {AddEventSelectedField} from "../../../model/state/add_event/types";

export const addEventPresenter = (dispatch: ThunkDispatch<AppState, undefined, Action>) => ({
    onChangeSelectedField: (field: AddEventSelectedField, value: number) => {
        dispatch(doSetSelectedAddEventField(field, value))
    },
    onSubmit: (activity: Activity, round: Round, date: Date, location: string) => {
        dispatch(sendEvent(activity, round, date, location))
    },
    onChangeLocation: (newLocation: string) => {
        dispatch(doSetNewEventLocation(newLocation))
    },
    onChangeDate: (newDate: string) => {
        let offset = Date.parse(newDate);
        let date = new Date(offset);
        dispatch(doSetNewEventDate(date))
    }
});