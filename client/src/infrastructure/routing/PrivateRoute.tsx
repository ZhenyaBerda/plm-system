import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { isAuthenticated } from "../auth/authService";
import { LOGIN_PATH } from '../../@types';

const PrivateRoute = ({ children, component: Component, render, ...rest }: RouteProps) => {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!isAuthenticated) {
                    return <Redirect to={{ pathname: LOGIN_PATH, state: { from: props.location } }} />;
                }

                if (Component) {
                    return <Component {...props} />;
                }
                else if (render) {
                    return render(props);
                }
                else {
                    return children;
                }
            }}
        />
    );
};

export default PrivateRoute;