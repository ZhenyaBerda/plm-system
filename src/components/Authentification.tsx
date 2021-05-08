import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { appActions } from "../state/appState";
import { getAuthenticated, getAuthenticationError } from "../state/selectors";
import {AuthenticationResult} from "@azure/msal-common";
import {loginRequest} from "../dataAccess/authConfig";
import {useMsal} from "@azure/msal-react";
import {callMsGraph} from "../infrastructure/auth/authService";
import {User} from "../dataAccess/models";
import {IPublicClientApplication} from "@azure/msal-browser";


const authenticate = async (dispatch: Dispatch<any>, instance: IPublicClientApplication, accounts: any, isAuthenticated: any) => {

    if (accounts && accounts[0] && !isAuthenticated) {
        await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0]
        }).then((response: AuthenticationResult) => {
            callMsGraph(response.accessToken)
                .then((response) => {
                    const user: User = {
                        id: response.id,
                        firstName: response.givenName,
                        lastName: response.surname,
                        email: response.mail
                    }
                    dispatch(appActions.login(user));
                })
        }) .catch(() => dispatch(appActions.logout()))
    }

};

interface Props {
    children: React.ReactNode;
}

const Authentication = ({ children }: Props) => {
    const isAuthenticated = useSelector(getAuthenticated);
    const authenticationError = useSelector(getAuthenticationError);

    const { instance, accounts } = useMsal();

    const dispatch = useDispatch();

    useEffect(() => {
        void authenticate(dispatch, instance, accounts, isAuthenticated);
    }, [authenticationError, dispatch, accounts, accounts]);


    if (isAuthenticated !== null) {
        return <>{children}</>;
    }
    else if (authenticationError) {
        return <div>{authenticationError}</div>;
    }
    else {
        return <div>loading...</div>
    }
};

export default Authentication;
