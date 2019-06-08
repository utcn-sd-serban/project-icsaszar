import {Navbar} from "./Navbar";
import * as React from "react";
import {connect} from "react-redux";
import {AppState} from "../../model/state/store";
import {navbarPresenter} from "../../presenter/navbar/NavbarPresenter";
import {Dispatch} from "redux";
import {RouteComponentProps} from "react-router";
import * as H from "history";

interface Props extends RouteComponentProps<any>{
    username?: string;
    onLogout: (history: H.History) => () => void;
}

const SmartNavbar: React.FC<Props> = ({username, onLogout, history}) => (
   <Navbar username={username} onLogout={onLogout(history)}/>
);

function mapStateToProps(state: AppState): Pick<Props, "username"> {
    let currentUser = state.userState.currentUser;
    return {
        username: currentUser ?  currentUser.username : undefined
    }
}

function mapDispatchToProps(dispatch: Dispatch): Pick<Props, "onLogout"> {
    let presenter = navbarPresenter(dispatch);
    return {
        onLogout: (history: H.History) => () => presenter.handleLogout(history)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartNavbar)