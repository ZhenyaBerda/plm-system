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

import './Page.css';


const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([])

    const { instance, accounts } = useMsal();

    const itemRender = (route: any, params: any, routes: any, paths: any) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <Breadcrumb.Item><Link to={paths.join('/')}>{route.breadcrumbName}</Link></Breadcrumb.Item>
        );
    }

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
                <Breadcrumb
                    itemRender={itemRender}
                    routes={[
                        {
                            path: '/groups',
                            breadcrumbName: 'Группы',
                        }
                    ]}
                />
                <Table
                    className={'table'}
                    columns={[
                        {
                            title: 'Название',
                            dataIndex: 'displayName',
                            key: 'displayName'
                        },
                        {
                            title: 'Почта',
                            dataIndex: 'mail',
                            key: 'mail',
                        },
                        {
                            title: 'Доска',
                            dataIndex: 'Agile',
                            key: 'agile',
                            render: (text, record) => (
                                <Space key={text} size="middle">
                                    <Link to={Pages.GROUPS_BOARD_PATH + '/' + record.displayName}>Доска</Link>
                                </Space>
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