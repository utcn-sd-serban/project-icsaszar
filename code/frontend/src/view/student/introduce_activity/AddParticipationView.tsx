import * as React from "react";
import {ActivityEvent} from "../../../model/objects/activity/ActivityEvent";
import {Teacher} from "../../../model/objects/user/Teacher";
import {ParticipationResult} from "../../../model/objects/activity/Participation";

interface Props {
    events: ActivityEvent[];
    teachers: Teacher[];
    results: ParticipationResult[];

    selectedEventId: number;
    selectedTeacherId: number;
    selectedResultId: number;

    onChangeSelectedField: (field: string, value: number) => void;
    onSubmit: () => void;
}

export const AddParticipationView: React.FC<Props> = ({}) => (
  <div className="container">
        <h1>Introduce activity</h1>

  </div>
);