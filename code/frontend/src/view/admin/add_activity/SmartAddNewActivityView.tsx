import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {AppState} from "../../../model/state/store";
import {AddNewActivityView} from "./AddNewActivityView";
import {Category, Organizer} from "../../../model/objects/activity/Activity";
import {findCategoryById, findOrganizerById} from "../../../model/state/activity_data/selectors";
import {AddActivitySelectedField} from "../../../model/state/add_activity/types";
import {addActivityPresenter} from "../../../presenter/admin/add_activity/AddActivityPresenter";


interface Props {
    selectedOrganizerId: number;
    selectedCategoryId: number;
    activityName: string;
    selectedOrganizer: Organizer;
    selectedCategory: Category;
    organizers: Organizer[];
    categories: Category[];

    onChangeSelectedField: (field: AddActivitySelectedField, value: number) => void;
    onChangeActivityName: (value: string) => void;
    onSubmit: (activityName: string, organizer: Organizer, category: Category) => () => void;
}

const SmartAddNewActivityView: React.FC<Props> = (props) => {
    let {onSubmit, selectedCategory, selectedOrganizer, activityName} = props;
    return (
        <AddNewActivityView
            {...props}
            onSubmit={onSubmit(activityName, selectedOrganizer, selectedCategory)}
        />
    )
};

type StateProps = Pick<Props,
    | "activityName"
    | "selectedCategory"
    | "selectedCategoryId"
    | "selectedOrganizer"
    | "selectedOrganizerId"
    | "organizers"
    | "categories">

function mapStateToProps(state: AppState): StateProps {
    let {selectedCategoryId, activityName, selectedOrganizerId} = state.addActivityState;
    return {
        activityName: activityName,
        selectedCategory: findCategoryById(state, selectedCategoryId)!!,
        selectedCategoryId: selectedCategoryId,
        selectedOrganizer: findOrganizerById(state, selectedOrganizerId)!!,
        selectedOrganizerId: selectedOrganizerId,
        categories: state.activityDataState.categories,
        organizers: state.activityDataState.organizers
    }
}

type DispatchProps = Pick<Props,
    | "onChangeSelectedField"
    | "onChangeActivityName"
    | "onSubmit">

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
    let presenter = addActivityPresenter(dispatch);
    return {
        onChangeActivityName: value => presenter.handleChangeActivityName(value),
        onChangeSelectedField: (field, value) => presenter.handleChangeSelectedField(field, value),
        onSubmit: (activityName, organizer, category) => () => presenter.handleSubmit(activityName, organizer, category)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartAddNewActivityView)