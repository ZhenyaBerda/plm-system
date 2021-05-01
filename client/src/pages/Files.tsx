import React, {useEffect} from 'react';
import{ Link } from "react-router-dom";
import { Pages } from '../@types';
import {Space, Table} from "antd";
import { useState } from 'react';
import {loginRequest} from "../dataAccess/authConfig";
import {AuthenticationResult} from "@azure/msal-common";
import {getGroupFiles} from "../dataAccess/api";
import {useMsal} from "@azure/msal-react";
import { EyeOutlined } from '@ant-design/icons';
import {GroupFile} from "../dataAccess/models";
import {useParams} from "react-router";
import Page from "./Page";

import './Page.css';

const Files = () => {
    const [files, setFiles] = useState<GroupFile[]>([]);

    const {groupId} = useParams<{ groupId: string }>();

    const {instance, accounts} = useMsal();

    useEffect(() => {
        // @ts-ignore
        instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then((response: AuthenticationResult) => {
                getGroupFiles(response.accessToken, groupId).then((response: any) => {
                    setFiles(response.value.map((it: any) => ({
                        id: it.id,
                        key: it.id,
                        name: it.name,
                        createdDate: it.fileSystemInfo.createdDateTime,
                        createdBy: it.createdBy.user ? it.createdBy.user.displayName : it.createdBy.application.displayName,
                        lastModifiedDate: it.fileSystemInfo.lastModifiedDateTime,
                        lastModifiedBy: it.lastModifiedBy.user ? it.lastModifiedBy.user.displayName : it.createdBy.application.displayName,
                        file: it.file
                        })))
                })
            })
            .catch((e: any) => console.log(e));
    }, []);

    return (
        <Page>
            <Space className={'space-link'}>
                <Link className={'link'} to={Pages.GROUPS_PATH}>Вернуться к группам</Link>
            </Space>
            <Table
                className={'table'}
                columns={[
                    {
                        title: 'Название',
                        dataIndex: 'name',
                        key: 'name'
                    },
                    {
                        title: 'Создан',
                        dataIndex: 'createdBy',
                        key: 'createdBy'
                    },
                    {
                        title: 'Дата создания',
                        dataIndex: 'createdDate',
                        key: 'createdDate'

                    },
                    {
                        title: 'Изменен',
                        dataIndex: 'lastModifiedBy',
                        key: 'lastModifiedBy'
                    },
                    {
                        title: 'Дата изменения',
                        dataIndex: 'lastModifiedDate',
                        key: 'lastModifiedDate'
                    },
                    {
                        title: 'Просмотр',
                        dataIndex: 'view',
                        key: 'view',
                        render: () => {
                            return (
                            <EyeOutlined onClick={() => console.log('click')} />
                            )
                        }
                    }
                ]}
                dataSource={files}
                onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {
                            console.log(event)
                        }
                    }
                }}
            />
        </Page>
    );
}

export default Files;