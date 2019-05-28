import {Navbar} from "./Navbar";
import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../model/state/store";

interface Props {
    username?: string
}

const SmartNavbar: React.FC<Props> = ({username}) => (
   <Navbar username={username}/>
);

function mapStateToProps(state: AppState): Pick<Props, "username"> {
    let currentUser = state.userState.currentUser;
    return {
        username: currentUser ?  currentUser.username : undefined
    }
}

export default connect(mapStateToProps)(SmartNavbar)