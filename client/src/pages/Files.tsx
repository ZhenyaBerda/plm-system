import React, {useEffect} from 'react';
import{ Link } from "react-router-dom";
import { Pages } from '../@types';
import {Space, Table} from "antd";
import { useState } from 'react';
import {loginRequest} from "../dataAccess/authConfig";
import {AuthenticationResult} from "@azure/msal-common";
import {getGroupFiles, getItemPreview} from "../dataAccess/api";
import {useMsal} from "@azure/msal-react";
import { EyeOutlined } from '@ant-design/icons';
import {GroupFile, Preview} from "../dataAccess/models";
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
                        file: it.file,
                        webUrl: it.webUrl,
                    })))
                })
            })
            .catch((e: any) => console.log(e));
    }, []);

    const onPreview = async (url: string) => {
        let data: Preview | null = null;
        // @ts-ignore
        await instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then(async (response: AuthenticationResult) => {
                data = await getItemPreview(response.accessToken, groupId, url)
            })
            .catch((e: any) => console.log(e));

        if (data !== null) {
            const link = document.createElement('a');
            // @ts-ignore
            link.href = data.link.webUrl;
            link.setAttribute('target', '_blank');
            document.body.appendChild(link);
            link.click()
            link.remove();
        }
    }

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
                        key: 'name',
                        align: 'center',

                    },
                    {
                        title: 'Создан',
                        dataIndex: 'createdBy',
                        key: 'createdBy',
                        align: 'center',

                    },
                    {
                        title: 'Дата создания',
                        dataIndex: 'createdDate',
                        key: 'createdDate',
                        align: 'center',
                        render: (text) => {
                            const date = new Date(text);
                            return (
                                <span>{date.toLocaleString()}</span>
                            )
                        }

                    },
                    {
                        title: 'Изменен',
                        dataIndex: 'lastModifiedBy',
                        key: 'lastModifiedBy',
                        align: 'center',

                    },
                    {
                        title: 'Дата изменения',
                        dataIndex: 'lastModifiedDate',
                        key: 'lastModifiedDate',
                        align: 'center',
                        render: (text) => {
                            const date = new Date(text);
                            return (
                                <span>{date.toLocaleString()}</span>
                            )
                        }
                    },
                    {
                        title: 'Просмотр',
                        dataIndex: 'webUrl',
                        key: 'webUrl',
                        align: 'center',
                        render: (text, render) => {
                            return (
                                <EyeOutlined onClick={() => onPreview(render.id)} />
                            )
                        }
                    }
                ]}
                dataSource={files}
            />
        </Page>
    );
}

export default Files;