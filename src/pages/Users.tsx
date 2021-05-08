import React, {useEffect, useState} from 'react';
import { Table } from 'antd';
import Page from './Page';
import {getUserInfo, getUsers} from '../dataAccess/api';
import {AuthenticationResult} from "@azure/msal-common";
import {loginRequest} from "../dataAccess/authConfig";
import {useMsal} from "@azure/msal-react";
import {User} from "../dataAccess/models";
import {UserOutlined} from '@ant-design/icons';

import './Page.css';
import UserInfoDrawer from '../components/UserInfoDrawer';

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState('');
    const [showUserInfo, setShowUserInfo] = useState(false);

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
    }, []);

    const getUser = (userId: string) => {
        setSelectedUser(userId);
        setShowUserInfo(true);
    }

    const handleUserInfoDrawer = () => {
        setShowUserInfo(false);
        setSelectedUser('');
    }

    return (
        <Page>
            {selectedUser &&
            <UserInfoDrawer
                userId={selectedUser}
                isVisible={showUserInfo}
                onClose={handleUserInfoDrawer}
            />
            }
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
                        title: 'Подробно',
                        dataIndex: 'info',
                        key: 'info',
                        align: 'center',
                        render: (text, record) => (
                            <UserOutlined style={{ color: '#1890ff' }} onClick={() => getUser(record.id)} />
                        )
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