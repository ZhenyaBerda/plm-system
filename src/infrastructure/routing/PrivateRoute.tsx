import { useIsAuthenticated } from "@azure/msal-react";
import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

import { LOGIN_PATH } from '../../@types';
import { isAuthenticated } from "../auth/authService";

const PrivateRoute = ({ children, component: Component, render, ...rest }: RouteProps) => {
    const isAuthenticated = useIsAuthenticated();
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