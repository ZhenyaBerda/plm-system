import React, {useEffect, useState} from 'react';
import { Table } from 'antd';

import './Page.css';
import Page from './Page';
import { getUsers } from '../dataAccess/api';
import {AuthenticationResult} from "@azure/msal-common";
import {loginRequest} from "../dataAccess/authConfig";
import {useMsal} from "@azure/msal-react";
import {User} from "../dataAccess/models";

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);

    const { instance, accounts } = useMsal();

    useEffect(() => {
        // @ts-ignore
        instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then((response:AuthenticationResult) => {
                getUsers(response.accessToken).then((response: any) => {
                    setUsers(response.value.map((it: any) => {
                        return {
                            id: it.id,
                            firstName: it.givenName,
                            lastName: it.surname,
                            email: it.userPrincipalName
                        } as User
                    }))
                })
            })
            .catch(e => console.log(e));
    }, [])
    return (
        <Page>
            <Table
                className={'table'}
                columns={[
                    {
                        title: 'Имя пользователя',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: 'Email',
                        dataIndex: 'email',
                        key: 'email'
                    },
                    {
                        title: 'Действия',
                        dataIndex: 'action',
                        key: 'action'
                    }
                ]}
                dataSource={users ? users.map(user => {
                        return {
                            key: user.id,
                            id: user.id,
                            name: `${user.firstName} ${user.lastName}`,
                            email: user.email,
                        }
                    }
                    ) : []}
            />
        </Page>
    );
}

export default Users;