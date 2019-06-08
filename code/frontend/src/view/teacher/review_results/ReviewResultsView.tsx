import * as React from "react";
import {Participation, ParticipationReviewStatus} from "../../../model/objects/activity/Participation";
import {PARTICIPATION_FILTERS, ParticipationStatusFilter} from "../../../model/state/review_results/types";


interface Props {
    participations: Participation[];
    currentFilter: ParticipationStatusFilter

    onSave: (eventId: number, studentId: number, newStatus: ParticipationReviewStatus) => void;
    onSetFilter: (newFilter: ParticipationStatusFilter) => void;
}

interface ParticipationViewProps {
    participation: Participation
    onSave: (eventId: number, studentId: number, newStatus: ParticipationReviewStatus) => void;

}


interface ButtonProps {
    currentStatus: ParticipationReviewStatus;
    onClick: () => void;
    name: ParticipationReviewStatus
}

const Button: React.FC<ButtonProps> = (props) => (
    <button
        className={"btn " + (props.currentStatus === props.name ? "btn-primary" : "btn-outline-primary")}
        onClick={props.onClick}
    >
        {props.name}
    </button>
);

const ParticipationView: React.FC<ParticipationViewProps> =
    ({
         participation: {
             student,
             activityEvent,
             result,
             reviewStatus
         },
         onSave,

     }) => (
        <div className="container border border-primary p-1 rounded my-1">
            <div className="row">
                <div className="col">
                    {`Student: ${student.firstName} ${student.lastName}`}
                </div>
                <div className="col">
                    {`Group: ${student.group.name}`}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {`Event: ${activityEvent.location}, ${activityEvent.date.toDateString()} - ${activityEvent.round.name} round`}
                </div>
                <div className="col">
                    {`Result: ${result.name}`}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Status:
                </div>
                <div className="col">
                    <Button
                        currentStatus={reviewStatus}
                        name={ParticipationReviewStatus.APPROVED}
                        onClick={() => onSave(activityEvent.id, student.id, ParticipationReviewStatus.APPROVED)}
                    />
                    <Button
                        currentStatus={reviewStatus}
                        name={ParticipationReviewStatus.PENDING}
                        onClick={() => onSave(activityEvent.id, student.id, ParticipationReviewStatus.PENDING)}
                    />
                    <Button
                        currentStatus={reviewStatus}
                        name={ParticipationReviewStatus.REJECTED}
                        onClick={() => onSave(activityEvent.id, student.id, ParticipationReviewStatus.REJECTED)}
                    />
                </div>
            </div>
        </div>
    );

interface FilterButtonProps {
    name: ParticipationStatusFilter
    currentFilter: ParticipationStatusFilter
    onClick: (newFilter: ParticipationStatusFilter) => void

}

function capitalize(str: string): string {
    let [first, ...rest] = str.toLowerCase();
    return first.toUpperCase() + rest.join("")
}

export const FilterButton: React.FC<FilterButtonProps> = ({currentFilter, onClick, name}) => (
    <button
        className={"btn " + (currentFilter === name ? "btn-primary" : "btn-outline-primary")}
        onClick={() => onClick(name)}>
        {capitalize(name)}
    </button>
);

export const ReviewResultsView: React.FC<Props> =
    ({
         onSave,
         participations,
         currentFilter,
         onSetFilter
     }) => (
        <div className="container">
            <h1> Review results </h1>
            <div>
                {
                    PARTICIPATION_FILTERS.map((value, index) =>
                        <FilterButton key={index} name={value} currentFilter={currentFilter} onClick={onSetFilter}/>
                    )
                }
            </div>
            {
                participations.map(p =>
                    <ParticipationView key={`${p.activityEvent.id}:${p.student.id}`} participation={p} onSave={onSave}/>
                )
            }
        </div>
    );