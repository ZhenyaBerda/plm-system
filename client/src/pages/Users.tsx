import React from 'react';
import { Table } from 'antd';

import './Page.css';
import Page from './Page';

const Users = () => {
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
                dataSource={[
                    {
                        name: 'ivan',
                        email: 'eeee@dddd.xx'
                    }
                ]}
            />
        </Page>
    );
}

export default Users;