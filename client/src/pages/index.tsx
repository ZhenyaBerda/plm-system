import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import PrivateRoute from "../infrastructure/routing/PrivateRoute";

import {Pages} from "../@types";
import Login from "./Login";
import Projects from "./Projects";
import Users from "./Users";
import Agile from "./Agile";

export default function Index() {
    return (
        <Switch>
            <Route exact path={Pages.LOGIN_PATH} component={Login}/>
            <PrivateRoute exact path={Pages.PROJECTS_PATH} component={Projects}/>
            <PrivateRoute exact path={Pages.USERS_PATH} component={Users}/>
            <PrivateRoute exact path={Pages.PROJECTS_BOARD_PATH + '/:projectName'} component={Agile}/>
            <Redirect to="/" />
        </Switch>
    );
};