import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import SmartLoginView from "./view/login/SmartLoginView";
import SmartDashboardView from "./view/dashboard/SmartDashboardView";
import SmartNavbar from "./view/navbar/SmartNavbar";


const App: React.FC = () => {
    return (
        <HashRouter>
            <SmartNavbar/>
            <Switch>
                <Route exact={true} component={SmartLoginView} path={"/"}/>
                <Route exact={true} component={SmartDashboardView} path={"/dashboard"} />
            </Switch>
        </HashRouter>
    );
};

export default App;
