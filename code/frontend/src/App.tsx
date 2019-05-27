import React from 'react';
import './App.css';
import {HashRouter, Route, Switch} from "react-router-dom";
import SmartLoginView from "./view/login/SmartLoginView";


const App: React.FC = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact={true} component={SmartLoginView} path={"/"}/>
                <Route exact={true} component={SmartLoginView} path={"/dashboard"} />
            </Switch>
        </HashRouter>
    );
};

export default App;
