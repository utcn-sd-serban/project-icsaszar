import * as React from "react";
import {Participation, ParticipationReviewStatus} from "../../../model/objects/activity/Participation";
import {PARTICIPATION_FILTERS, ParticipationStatusFilter} from "../../../model/state/review_results/types";
import {ParticipationView} from "../../reuseable/ParticipationView";


interface Props {
    participations: Participation[];
    currentFilter: ParticipationStatusFilter

    onSave: (eventId: number, studentId: number, newStatus: ParticipationReviewStatus) => void;
    onSetFilter: (newFilter: ParticipationStatusFilter) => void;
}

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