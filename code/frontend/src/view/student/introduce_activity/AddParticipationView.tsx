import * as React from "react";
import {ActivityEvent} from "../../../model/objects/activity/ActivityEvent";
import {Teacher} from "../../../model/objects/user/Teacher";
import {ParticipationResult} from "../../../model/objects/activity/Participation";
import {AddParticipationSelectedField} from "../../../model/state/add_participation/types";
import {Activity} from "../../../model/objects/activity/Activity";

interface Props {
    activities: Activity[];
    events: ActivityEvent[];
    teachers: Teacher[];
    results: ParticipationResult[];

    selectedEventId: number;
    selectedTeacherId: number;
    selectedResultId: number;
    selectedActivityId: number;

    onChangeSelectedField: (field: AddParticipationSelectedField, value: number) => void;
    onSubmit: () => void;
}

export const AddParticipationView: React.FC<Props> =
    ({
         selectedTeacherId,
         selectedEventId,
         teachers,
         events,
         selectedResultId,
         activities,
         onSubmit,
         selectedActivityId,
         onChangeSelectedField,
         results
     }) => (
        <div className="container">
            <h1>Introduce activity</h1>
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
                                {name}
                            </option>
                        )
                    }
                </select>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Event</label>
                </div>
                <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    value={selectedEventId}
                    onChange={({target: {value}}) => onChangeSelectedField("selectedEventId", Number.parseInt(value))}
                >
                    {
                        events.map((event) =>
                            <option value={event.id}>
                                {`${event.round.name}-${event.date.toDateString()}-${event.location}`}
                            </option>
                        )
                    }
                </select>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Result</label>
                </div>
                <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    value={selectedResultId}
                    onChange={({target: {value}}) => onChangeSelectedField("selectedResultId", Number.parseInt(value))}
                >
                    {
                        results.map(({id, name}) =>
                            <option value={id}>
                                {name}
                            </option>
                        )
                    }
                </select>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Teacher</label>
                </div>
                <select
                    className="custom-select"
                    id="inputGroupSelect01"
                    value={selectedTeacherId}
                    onChange={({target: {value}}) => onChangeSelectedField("selectedTeacherId", Number.parseInt(value))}
                >
                    {
                        teachers.map(({id, firstName, lastName}) =>
                            <option value={id}>
                                {firstName + " " + lastName}
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