import * as React from "react";
import {Participation} from "../../../model/objects/activity/Participation";
import {ParticipationView} from "../../reuseable/ParticipationView";

interface Props {
    participations: Participation[]
}

export const StudentReportView: React.FC<Props> =
    ({
        participations
     }) => (
        <div>
            <h1> Activity report </h1>
            {
                participations.map(p =>
                    <ParticipationView key={`${p.activityEvent.id}:${p.student.id}`} participation={p}/>
                )
            }
        </div>
    );