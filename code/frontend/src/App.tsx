import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import SmartLoginView from "./view/login/SmartLoginView";
import SmartDashboardView from "./view/dashboard/SmartDashboardView";
import SmartNavbar from "./view/navbar/SmartNavbar";


export type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

const App: React.FC = () => {
    return (
        <HashRouter>
            <Route component={SmartNavbar}/>
            <Switch>
                <Route exact={true} component={SmartLoginView} path={"/"}/>
                <Route component={SmartDashboardView} path={"/dashboard"} />
            </Switch>
        </HashRouter>
    );
};

export default App;
