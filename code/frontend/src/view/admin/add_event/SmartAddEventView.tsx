import * as React from "react";
import {AddEventView} from "./AddEventView";
import {Activity} from "../../../model/objects/activity/Activity";
import {Round} from "../../../model/objects/activity/ActivityEvent";
import {connect} from "react-redux";
import {AppState} from "../../../model/state/store";
import {Dispatch} from "redux";
import {AddEventSelectedField} from "../../../model/state/add_event/types";
import {findActivityById, findRoundById} from "../../../model/state/activity_data/selectors";
import {addEventPresenter} from "../../../presenter/admin/add_event/AddEventPresenter";


interface Props {
    activities: Activity[];
    rounds: Round[];

    selectedActivityId: number;
    selectedRoundId: number;
    location: string;
    date: Date;

    selectedActivity: Activity;
    selectedRound: Round;

    onChangeSelectedField: (field: AddEventSelectedField, value: number) => void;
    onSubmit: (activity: Activity, round: Round, date: Date, location: string) => () => void;
    onChangeLocation: (newLocation: string) => void;
    onChangeDate: (newDate: string) => void;
}

const SmartAddEventView: React.FC<Props> = (props) => {
    let {
        onSubmit,
        selectedActivity,
        selectedRound,
        location,
        date
    } = props;
    return (
        <AddEventView {...props}
            onSubmit={onSubmit(selectedActivity, selectedRound, new Date(date) , location)}
        />
    )
};

type StateProps = Pick<Props,
    | "location"
    | "activities"
    | "date"
    | "rounds"
    | "selectedActivity"
    | "selectedActivityId"
    | "selectedRound"
    | "selectedRoundId" >

function mapStateToProps(state: AppState): StateProps {
    let {
        location,
        date,
        selectedActivityId,
        selectedRoundId
    } = state.addEventState;
    return {
        activities: state.activityDataState.activities,
        rounds: state.activityDataState.rounds,
        selectedRound: findRoundById(state, selectedRoundId)!!,
        selectedActivity: findActivityById(state, selectedActivityId)!!,
        date: date,
        location: location,
        selectedRoundId: selectedRoundId,
        selectedActivityId: selectedActivityId
    }
}

type DispatchProps = Pick<Props,
    | "onSubmit"
    | "onChangeSelectedField"
    | "onChangeDate"
    | "onChangeLocation">

function mapDispatchToProps(dispatch: Dispatch): DispatchProps{
    let presenter = addEventPresenter(dispatch);
    return {
        onSubmit: (activity, round, date, location) => () => presenter.onSubmit(activity, round, date, location),
        onChangeSelectedField: (field, value) => presenter.onChangeSelectedField(field, value),
        onChangeDate: newDate => presenter.onChangeDate(newDate),
        onChangeLocation: newLocation => presenter.onChangeLocation(newLocation)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartAddEventView);