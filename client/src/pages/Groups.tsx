import React, {useEffect, useState} from 'react';
import {Breadcrumb, Space, Table} from "antd";
import{ Link } from "react-router-dom";
import Page from './Page';
import { Pages } from '../@types';
import {loginRequest} from "../dataAccess/authConfig";
import {AuthenticationResult} from "@azure/msal-common";
import {getGroupLists} from "../dataAccess/api";
import {useMsal} from "@azure/msal-react";
import {Group} from "../dataAccess/models";
import { FileOutlined, AppstoreOutlined } from '@ant-design/icons';

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
        }, [])

    return (
        <Page>
            <div className={'projects-wrapper'}>
                <Table
                    className={'table'}
                    columns={[
                        {
                            title: 'Название',
                            dataIndex: 'displayName',
                            key: 'displayName'
                        },
                        {
                            title: 'Дата создания',
                            dataIndex: 'createdDateTime',
                            key: 'createdDateTime',
                            render: (text) => {
                                const date = new Date(text);

                                let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
                                let month = date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth();
                                let year = date.getFullYear().toString()

                                return (
                                    <span>{day}.{month}.{year}</span>
                                )
                            }
                        },
                        {
                            title: 'Agile доска',
                            dataIndex: 'Agile',
                            key: 'agile',
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