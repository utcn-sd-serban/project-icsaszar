import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../../../model/state/store";
import {Action} from "redux";
import {ActivityEvent} from "../../../model/objects/activity/ActivityEvent";
import {Teacher} from "../../../model/objects/user/Teacher";
import {ParticipationResult} from "../../../model/objects/activity/Participation";
import {
    doSetSelectedAddParticipationField,
    sendNewParticipation,
    setFirstSelectedActivityEvent
} from "../../../model/state/add_participation/actions";
import {AddParticipationSelectedField} from "../../../model/state/add_participation/types";

export const addParticipationPresenter = (dispatch: ThunkDispatch<AppState, undefined, Action>) => ({
    handleChangeSelectedField: (field: AddParticipationSelectedField, value: number) => {
        dispatch(doSetSelectedAddParticipationField(field, value));
        dispatch(setFirstSelectedActivityEvent());

    },
    handleSubmit: (event: ActivityEvent, preparingTeacher: Teacher, result: ParticipationResult) => {
        dispatch(sendNewParticipation(event, preparingTeacher, result))
    }
});
