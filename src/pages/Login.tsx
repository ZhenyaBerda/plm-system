import React, {useState} from 'react';
import { Button, Typography } from 'antd';
import {loginRequest } from '../dataAccess/authConfig';
import { useMsal } from '@azure/msal-react';
import {useDispatch} from "react-redux";
import {callMsGraph, setIsAuthenticated} from "../infrastructure/auth/authService";

import './login.css';
import {AuthenticationResult} from "@azure/msal-common";
import { User } from '../dataAccess/models';
import {appActions} from "../state/appState";
import { RouteComponentProps } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = (props: RouteComponentProps) => {
    const { instance, accounts } = useMsal();
    const [error, setError] = useState(false);

    const dispatch = useDispatch();

    const { history, location } = props;

    const handleLogin = async () => {
        let isError = false;

       await instance.loginPopup(loginRequest)
           .catch(e => {
            isError = true;
        });

        if (isError) {
            setError(true);
            dispatch(appActions.setAuthenticationError('error'));
            return;
        }

        // @ts-ignore
        const response: AuthenticationResult = await instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then((response) => {
               localStorage.setItem('accessToken', response.accessToken);
            })
            .catch(e => isError = true);


        const userData = await callMsGraph(localStorage.getItem('accessToken'));

        if (!userData) {
            dispatch(appActions.setAuthenticationError('error'));
            setError(true);
            return;
        }

        const user: User = {
            id: userData.id,
            firstName: userData.givenName,
            lastName: userData.surname,
            email: userData.mail
        }

        dispatch(appActions.login(user))
        setIsAuthenticated(true);

        const locationState: any = location.state;
        const { from } = (locationState && locationState.from ? locationState : { from: { pathname: "/" } });
        const fromState = locationState?.from.state;
        history.replace(from, fromState);

    }

    return (
        <div className={'login-page'}>
            <div className={'login'}>
                <div className={'loginbox'}>
                <div className={'title'}>
                    <Text type="secondary">Welcome back!</Text>
                    <Title style={{ marginTop: '10px', color: '#001529' }}>
                        Login your account
                    </Title>
                </div>

                        <Button
                            style={{ width: '100%' }}
                            onClick={handleLogin}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button">
                            Log in with Azure AD
                        </Button>
                </div>
            </div>
            <div className={'login-info'}>
d
            </div>
        </div>
    );
}

export default Login;



