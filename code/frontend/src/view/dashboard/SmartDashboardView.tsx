import React from 'react';
import {UserRole} from "../../model/objects/user/User";
import {connect} from "react-redux";
import {AppState} from "../../model/state/store";
import {DashboardView} from "./DashboardView";
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";
import {Link} from "react-router-dom";
import SmartAddUserView from "../admin/add_user/SmartAddUserView";
import SmartIntroduceActivityView from "../student/introduce_activity/SmartAddParticipationView";
import SmartAddNewActivityView from "../admin/add_activity/SmartAddNewActivityView";
import SmartAddEventView from "../admin/add_event/SmartAddEventView";

interface Props extends RouteComponentProps {
    username: string,
    firstName: string,
    lastName: string,
    role: UserRole;
    userLoggedIn: boolean;
}

const SmartDashboardView: React.FC<Props> = ({
                                                 username,
                                                 firstName,
                                                 lastName,
                                                 role,
                                                 userLoggedIn,
                                                 match
                                             }: Props) => {
    if (!userLoggedIn)
        return (<Redirect to={"/"}/>);

    switch (role) {
        case "STUDENT":
            return (
                <div>
                    <DashboardView username={username} firstName={firstName} lastName={lastName} role={role}>
                        <ul>
                            <li>
                                <Link to={`${match.url}/introduce-activity`}> Introduce activity </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/view-report`}> View report </Link>
                            </li>
                        </ul>
                    </DashboardView>
                    <Switch>
                        <Route exact={true} path={`${match.path}/introduce-activity`}
                               component={SmartIntroduceActivityView}/>
                        {/*<Route exact={true} path={`${match.path}/view-report`} component={}/>*/}
                    </Switch>
                </div>
            );
        case "TEACHER":
            return (
                <DashboardView username={username} firstName={firstName} lastName={lastName} role={role}>
                    <ul>
                        <li>
                            Approve result
                        </li>
                        <li>
                            View report
                        </li>
                    </ul>
                </DashboardView>
            );
        case "ADMIN":
            return (
                <div>
                    <DashboardView username={username} firstName={firstName} lastName={lastName} role={role}>
                        <ul>
                            <li>
                                <Link to={`${match.url}/add-user`}> Manage users </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/add-activity`}> Add activity </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/add-event`}> Add event </Link>
                            </li>
                        </ul>
                    </DashboardView>
                    <Switch>
                        <Route exact={true} path={`${match.path}/add-user`} component={SmartAddUserView}/>
                        <Route exact={true} path={`${match.path}/add-activity`} component={SmartAddNewActivityView}/>
                        <Route exact={true} path={`${match.path}/add-event`} component={SmartAddEventView}/>
                    </Switch>
                </div>
            );
    }
};

function mapStateToProps(appState: AppState): Pick<Props, "username" | "firstName" | "lastName" | "role" | "userLoggedIn"> {
    return {
        ...appState.userState.currentUser!!,
        userLoggedIn: appState.userState.currentUser !== undefined
    }
}

export default connect(mapStateToProps)(SmartDashboardView)