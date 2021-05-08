import React, {useCallback, useEffect, useState} from 'react';
import {Breadcrumb, Button, Space, Table} from "antd";
import{ Link } from "react-router-dom";
import Page from './Page';
import { Pages } from '../@types';
import {loginRequest} from "../dataAccess/authConfig";
import {AuthenticationResult} from "@azure/msal-common";
import {createGroup, getGroupLists} from "../dataAccess/api";
import {useMsal} from "@azure/msal-react";
import {Group} from "../dataAccess/models";
import { FileOutlined, AppstoreOutlined, DeleteOutlined } from '@ant-design/icons';

import './Page.css';
import CreationPopup from "../dialogs/CreationPopup";

const Groups = () => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [showCreationPopup, setShowCreationPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {instance, accounts} = useMsal();

    useEffect(() => {
        // @ts-ignore
        instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then((response: AuthenticationResult) => {
                getGroupLists(response.accessToken).then((response: any) => {
                    setGroups(response.value.map((it: any) => ({
                        ...it as Group,
                        key: it.id,
                    })))
                })
            })
            .catch((e: any) => console.log(e));
    }, []);

    const handleCreateGroup = async (group: Group) => {
        setIsLoading(true);

        // @ts-ignore
        instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then(async (response: AuthenticationResult) => {
                await createGroup(response.accessToken, group);
            })
            .catch((e: any) => console.log(e));

        setIsLoading(false);
        setShowCreationPopup(false);
    };

    const closeCreationPopup = useCallback(() => {
        setShowCreationPopup(false);
    }, [setShowCreationPopup])

    return (
        <Page>
            <CreationPopup isVisible={showCreationPopup} onClose={closeCreationPopup} onCreate={handleCreateGroup} isLoading={isLoading} />
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
                                        <AppstoreOutlined/>
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
                                    <FileOutlined/>
                                </Link>
                            )
                        }
                    ]}
                    dataSource={groups}
                    footer={() => (
                        <Button onClick={() => setShowCreationPopup(true)}>Создать группу</Button>
                    )}
                />
            </div>
        </Page>
    );
}

export default Groups;