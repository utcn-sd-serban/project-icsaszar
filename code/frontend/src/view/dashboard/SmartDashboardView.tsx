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
import SmartReviewResultsView from "../teacher/review_results/SmartReviewResultsView";
import SmartStudentReportView from "../student/view_report/SmartStudentReportView";
import SmartTeacherReportView from "../teacher/view_report/SmartTeacherReportView";

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
                        <Route exact={true} path={`${match.path}/view-report`} component={SmartStudentReportView}/>
                    </Switch>
                </div>
            );
        case "TEACHER":
            return (
                <div>
                    <DashboardView username={username} firstName={firstName} lastName={lastName} role={role}>
                        <ul>
                            <li>
                                <Link to={`${match.url}/review-results`}> Review results </Link>
                            </li>
                            <li>
                                <Link to={`${match.url}/report`}> View report </Link>
                            </li>
                        </ul>
                    </DashboardView>
                    <Switch>
                        <Route exact={true} path={`${match.path}/review-results`} component={SmartReviewResultsView}/>
                        <Route exact={true} path={`${match.path}/report`} component={SmartTeacherReportView}/>
                    </Switch>
                </div>
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