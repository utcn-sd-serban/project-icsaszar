import {ThunkDispatch} from "redux-thunk";
import {AddActivitySelectedField} from "../../../model/state/add_activity/types";
import {doSetActivityName, doSetSelectedAddActivityField, sendActivity} from "../../../model/state/add_activity/actions";
import {AppState} from "../../../model/state/store";
import {Action} from "redux";
import {Category, Organizer} from "../../../model/objects/activity/Activity";


export const addActivityPresenter = (dispatch: ThunkDispatch<AppState, undefined, Action>) => ({

    handleChangeSelectedField: (field: AddActivitySelectedField, value: number) => {
        dispatch(doSetSelectedAddActivityField(field, value))
    },
    handleChangeActivityName: (value: string) => {
        dispatch(doSetActivityName(value))
    },
    handleSubmit: (activityName: string, organizer: Organizer, category: Category) => {
        dispatch(sendActivity(activityName, organizer, category))
    }

});