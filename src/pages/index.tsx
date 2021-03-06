import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import PrivateRoute from "../infrastructure/routing/PrivateRoute";

import {Pages} from "../@types";
import Login from "./Login";
import Groups from "./Groups";
import Users from "./Users";
import Agile from "./Agile";
import Files from "./Files";
import Viewer from "../viewer/Viewer";

export default function Index() {
    return (
        <Switch>
            <Route exact path={Pages.LOGIN_PATH} component={Login}/>
            <PrivateRoute exact path={Pages.GROUPS_PATH} component={Groups}/>
            <PrivateRoute exact path={Pages.USERS_PATH} component={Users}/>
            <PrivateRoute exact path={Pages.GROUPS_PATH + '/:groupId'} component={Files}/>
            <PrivateRoute exact path={Pages.GROUPS_BOARD_PATH + '/:groupId'} component={Agile}/>
            <PrivateRoute exact path={Pages.VIEWER_PATH} component={Viewer}/>
            <Redirect to="/" />
        </Switch>
    );
};