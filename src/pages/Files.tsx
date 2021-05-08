import React, {useCallback, useEffect} from 'react';
import{ Link } from "react-router-dom";
import { Pages } from '../@types';
import {Button, Space, Table} from "antd";
import { useState } from 'react';
import {loginRequest} from "../dataAccess/authConfig";
import {AuthenticationResult} from "@azure/msal-common";
import {deleteGroupFile, getGroupFiles, getItemPreview, uploadFile} from "../dataAccess/api";
import {useMsal} from "@azure/msal-react";
import {DeleteOutlined, EyeOutlined} from '@ant-design/icons';
import {GroupFile, Preview} from "../dataAccess/models";
import {useParams} from "react-router";
import Page from "./Page";
import UploadDialog from "../dialogs/UploadDialog";

import './Page.css';

const Files = () => {
    const [files, setFiles] = useState<GroupFile[]>([]);
    const [showUploader, setShowUploader] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);

    const {groupId} = useParams<{ groupId: string }>();

    const {instance, accounts} = useMsal();

    const getFiles = async () => {
        // @ts-ignore
        instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then( async (response: AuthenticationResult) => {
                await getGroupFiles(response.accessToken, groupId).then((response: any) => {
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
    }

    useEffect(() => {
        getFiles();
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
    };

    const onDelete = useCallback(async (item: GroupFile) => {
        // @ts-ignore
        await instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then(async (response: AuthenticationResult) => {
                await deleteGroupFile(response.accessToken, groupId, item.id);
            })
            .catch((e: any) => console.log(e));

        await getFiles();
    }, []);

    const onUpload = async (fileName: string, file: any) => {
        setIsLoading(true);

        //@ts-ignore
        await instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then(async (response: AuthenticationResult) => {
                const data = await uploadFile(response.accessToken, groupId, fileName, file);
                console.log(data)
            })
            .catch((e: any) => console.log(e));

        await getFiles();

        setIsLoading(false);
    };

    const handleUploaderClose = () => {
        setShowUploader(false)
    }

    return (
        <Page>
            <UploadDialog
                isVisible={showUploader}
                onClose={handleUploaderClose}
                onUpload={onUpload}
                isLoading={isLoading}
            />

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
                                <EyeOutlined style={{ color: '#1890ff' }} onClick={() => onPreview(render.id)} />
                            )
                        }
                    },
                    {
                        title: 'Удалить',
                        dataIndex: 'delete',
                        key: 'delete',
                        align: 'center',
                        render: (text, render) => (
                            <DeleteOutlined style={{ color: 'red' }} onClick={() => onDelete(render)} />
                        )
                    }
                ]}
                dataSource={files}
                footer={() =>
                    <Button onClick={() => setShowUploader(true)}>Загрузить файл</Button>
                }
            />
        </Page>
    );
}

export default Files;