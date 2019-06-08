import * as React from "react";
import {Category, Organizer} from "../../../model/objects/activity/Activity";
import {AddActivitySelectedField} from "../../../model/state/add_activity/types";


interface Props {
    selectedOrganizerId: number;
    selectedCategoryId: number;
    activityName: string;
    organizers: Organizer[];
    categories: Category[];

    onChangeSelectedField: (field: AddActivitySelectedField, value: number) => void;
    onChangeActivityName: (value: string) => void;
    onSubmit: () => void;
}

export const AddNewActivityView: React.FC<Props> =
    ({
        selectedOrganizerId,
        selectedCategoryId,
        activityName,
        categories,
        onChangeActivityName,
        onChangeSelectedField,
        organizers,
        onSubmit
     }) => (
        <div className="container">
            <h1>Add new activity</h1>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">Name</span>
                </div>
                <input
                    type="text"
                    className="form-control"
                    value={activityName}
                    onChange={({target: {value}}) => onChangeActivityName(value)}
                />
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Organizer</label>
                </div>
                <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    value={selectedOrganizerId}
                    onChange={({target: {value}}) => onChangeSelectedField("selectedOrganizerId", Number.parseInt(value))}
                >
                    {
                        organizers.map(({id, name}) =>
                            <option value={id}>
                                {name}
                            </option>
                        )
                    }
                </select>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Category</label>
                </div>
                <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    value={selectedCategoryId}
                    onChange={({target: {value}}) => onChangeSelectedField("selectedCategoryId", Number.parseInt(value))}
                >
                    {
                        categories.map(({id, name}) =>
                            <option value={id}>
                                {name}
                            </option>
                        )
                    }
                </select>
            </div>
            <button className="btn btn-primary" onClick={onSubmit}>
                Submit
            </button>
        </div>
    );