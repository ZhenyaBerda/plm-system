import React, {useCallback, useEffect, useState} from 'react';
import {Breadcrumb, Space, Table} from "antd";
import{ Link } from "react-router-dom";
import Page from './Page';
import { Pages } from '../@types';
import {loginRequest} from "../dataAccess/authConfig";
import {AuthenticationResult} from "@azure/msal-common";
import {getGroupLists} from "../dataAccess/api";
import {useMsal} from "@azure/msal-react";
import {Group} from "../dataAccess/models";
import { FileOutlined, AppstoreOutlined, DeleteOutlined } from '@ant-design/icons';

import './Page.css';

const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([])

    const { instance, accounts } = useMsal();

        useEffect(() => {
            // @ts-ignore
            instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
                .then((response:AuthenticationResult) => {
                    getGroupLists(response.accessToken).then((response: any) => {
                        setGroups(response.value.map((it: any) => ({
                            ...it as Group,
                            key: it.id,
                        })))
                        })
                    })
                .catch((e: any) => console.log(e));
        }, []);

    return (
        <Page>
            <div className={'projects-wrapper'}>
                <Table
                    className={'table'}
                    columns={[
                        {
                            title: 'Название',
                            dataIndex: 'displayName',
                            key: 'displayName',
                            align: 'center',
                        },
                        {
                            title: 'Дата создания',
                            dataIndex: 'createdDateTime',
                            key: 'createdDateTime',
                            align: 'center',
                            render: (text) => {
                                const date = new Date(text);
                                return (
                                    <span>{date.toLocaleString()}</span>
                                )
                            }
                        },
                        {
                            title: 'Agile доска',
                            dataIndex: 'Agile',
                            key: 'agile',
                            align: 'center',
                            render: (text, record) => (
                                <Space key={text} size="middle">
                                    <Link to={Pages.GROUPS_BOARD_PATH + '/' + record.id}>
                                        <AppstoreOutlined />
                                    </Link>
                                </Space>
                            )
                        },
                        {
                            title: 'Документы',
                            dataIndex: 'docs',
                            key: 'docs',
                            align: 'center',
                            render: (text, render) => (
                                <Link to={Pages.GROUPS_PATH + '/' + render.id}>
                                    <FileOutlined />
                                </Link>
                            )
                        }
                    ]}
                    dataSource={groups}
                />
            </div>
        </Page>
    );
}

export default Groups;