import * as React from "react";
import {AddParticipationView} from "./AddParticipationView";
import {connect} from "react-redux";

interface Props {

}

const SmartAddParticipationView: React.FC<Props> = ({}) => (
    <AddParticipationView/>
);

function mapStateToProps() {

}

export default connect(mapStateToProps)(SmartAddParticipationView)