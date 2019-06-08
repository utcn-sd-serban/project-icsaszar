import * as React from "react";
import {Activity} from "../../../model/objects/activity/Activity";
import {Round} from "../../../model/objects/activity/ActivityEvent";
import {AddEventSelectedField} from "../../../model/state/add_event/types";

interface Props {
    activities: Activity[];
    rounds: Round[];

    selectedActivityId: number;
    selectedRoundId: number;
    location: string;
    date: Date;

    onChangeSelectedField: (field: AddEventSelectedField, value: number) => void;
    onSubmit: () => void;
    onChangeLocation: (newLocation: string) => void;
    onChangeDate: (newDate: string) => void;
}

function formatDate(date: Date): string{
    let day = date.getDate();
    let month = date.getMonth();
    let yearStr = date.getFullYear().toString();

    let dayStr = day.toString();
    if (day <= 9)
        dayStr = '0' + dayStr;

    let monthStr = month.toString();
    if (month <= 9)
        monthStr = '0' + monthStr;

    return `${yearStr}-${monthStr}-${dayStr}`;
}

export const AddEventView: React.FC<Props> =
    ({
        location,
        date,
        activities,
        rounds,
        selectedActivityId,
        onChangeSelectedField,
        onChangeDate,
        onChangeLocation,
        onSubmit,
        selectedRoundId
     }) => (
    <div className="container">
        <h1>Add Event</h1>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Activity</label>
            </div>
            <select
                className="custom-select"
                id="inputGroupSelect01"
                value={selectedActivityId}
                onChange={({target: {value}}) => onChangeSelectedField("selectedActivityId", Number.parseInt(value))}
            >
                {
                    activities.map(({id, name}) =>
                        <option value={id}>
                            {name.toLowerCase()}
                        </option>
                    )
                }
            </select>
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text" htmlFor="inputGroupSelect01">Round</label>
            </div>
            <select
                className="custom-select"
                id="inputGroupSelect01"
                value={selectedRoundId}
                onChange={({target: {value}}) => onChangeSelectedField("selectedRoundId", Number.parseInt(value))}
            >
                {
                    rounds.map(({id, name}) =>
                        <option value={id}>
                            {name.toLowerCase()}
                        </option>
                    )
                }
            </select>
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Location</span>
            </div>
            <input
                type="text"
                className="form-control"
                value={location}
                onChange={({target: {value}}) => onChangeLocation(value)}
            />
        </div>
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Date</span>
            </div>
            <input
                type="date"
                className="form-control"
                value={formatDate(date)}
                onChange={({target: {value}}) => onChangeDate(value)}
            />
        </div>
        <button className="btn btn-primary" onClick={onSubmit}>
            Submit
        </button>
    </div>
);