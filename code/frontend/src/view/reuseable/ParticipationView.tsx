import {Participation, ParticipationReviewStatus} from "../../model/objects/activity/Participation";
import * as React from "react";

interface ParticipationViewProps {
    participation: Participation
    onSave?: (eventId: number, studentId: number, newStatus: ParticipationReviewStatus) => void;

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

export const ParticipationView: React.FC<ParticipationViewProps> =
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
            {
                onSave ?
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
                    :
                    <div className="row">
                        <div className="col">
                            {`Status: ${reviewStatus}`}
                        </div>
                    </div>
            }
        </div>
    );