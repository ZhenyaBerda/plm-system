import React, {ChangeEvent, useEffect, useState} from 'react';
import {Task, UpdateTaskModel } from '../dataAccess/models';
import {DatePicker, Form, Input, Modal, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import moment, {Moment} from "moment";
import {loginRequest} from "../dataAccess/authConfig";
import {AuthenticationResult} from "@azure/msal-browser";
import {getGroupMembers, getTask, getTaskDetail} from "../dataAccess/api";
import {Option} from "antd/es/mentions";
import {useMsal} from "@azure/msal-react";

interface Props {
    taskId: string,
    isVisible: boolean,
    onClose: () => void,
    groupId: string,
}

const TaskDialog = ({isVisible, onClose, groupId, taskId}: Props) => {
    const [task, setTask] = useState<Task>({
        id: taskId,
        planId: '',
        percentComplete: 0,
        assigmentBy: '',
        dueDateTime: '',
        title: '',
        description: '',
        createdBy: '',

    })
    const [isModified, setIsModified] = useState(false);
    const [options, setOptions] = useState<{label: string, value: string}[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [lastEtag, setLastEtag] = useState('');
    const {instance, accounts} = useMsal();

    console.log(task)


    useEffect(() => {
        if (isVisible) {
            // @ts-ignore
            instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
                .then(async (response: AuthenticationResult) => {
                    const taskInfo = await getTask(response.accessToken, taskId);
                    const taskDetail = await getTaskDetail(response.accessToken, taskId);


                    setTask({
                        ...task,
                        planId: taskInfo.planId,
                        percentComplete: taskInfo.percentComplete,
                        assigmentBy: Object.keys(taskInfo.assignments)[0] ?? '',
                        dueDateTime: taskInfo.dueDateTime ?? '',
                        title: taskInfo.title,
                        description: taskDetail.description ?? '',
                        createdBy: taskInfo.createdBy.user.id ?? ''
                    })

                    setLastEtag(taskDetail['@odata.etag'])
                })
                .catch((e: any) => console.log(e));
        }
    }, [isVisible]);

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTask({...task, title: e.target.value});
        setIsModified(true);
    }

    const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTask({...task, description: e.target.value});
        setIsModified(true);
    }

    const handleAssign = async (open: boolean) => {
        setIsModified(true);
        if (open) {
            setIsLoading(true)

            // @ts-ignore
            instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
                .then(async (response: AuthenticationResult) => {
                    const data = await getGroupMembers(response.accessToken, groupId);
                    setOptions(data.value.map((it: any) => ({
                        label: it.displayName,
                        value: it.id,
                    })))
                })
                .catch((e: any) => console.log(e));
        }else {
            setOptions([]);
        }
        setIsLoading(false)
    }

    const handleChangeAssign = (value: string) => {
        setTask({...task, assigmentBy: value});
        setIsModified(true);
    }

    const handleDeadline = (value: Moment | null) => {
        setTask({...task, dueDateTime: moment(value).toISOString()});
        setIsModified(true);
    }

    const handleStatusChange = (value: string) => {
        setTask({...task, percentComplete: Number(value)});
        setIsModified(true);
    }

    const handleUpdateTask = () => {
        // @ts-ignore
        instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then(async (response: AuthenticationResult) => {

            })
            .catch((e: any) => console.log(e));
    }

    return (
        <Modal
            visible={isVisible}
            onCancel={onClose}
            onOk={handleUpdateTask}
            okText={"Изменить"}
            cancelText={"Назад"}
        >
            <Form
                layout="vertical"
            >
                <Form.Item
                    name={'title'}
                    label={'Задача'}
                    rules={[{ required: true, message: 'Введите название задачи' }]}
                >
                    <Input
                        value={task.title}
                        onChange={handleTitle}
                    />
                </Form.Item>
                <Form.Item
                    name={'description'}
                    label={'Описание'}
                >
                    <TextArea
                        value={task.description}
                        onChange={handleDescription}
                    />
                </Form.Item>
                <Form.Item
                    label={'Назначить'}
                >
                    <Select
                        placeholder={'Назначить'}
                        value={task.assigmentBy}
                        onDropdownVisibleChange={handleAssign}
                        onChange={handleChangeAssign}
                        options={options}
                        loading={isLoading}
                    />
                </Form.Item>
                <Form.Item
                    label={"Статус"}
                >
                    <Select
                        value={task.percentComplete.toString()}
                        placeholder={"Новая"}
                        onChange={handleStatusChange}
                    >
                        <Option value={"0"}>Новая</Option>
                        <Option value={"50"}>Активная</Option>
                        <Option value={"100"}>Выполненная</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={'Срок выполнения'}
                >
                    <DatePicker
                        placeholder={'Срок'}
                        value={!!task.dueDateTime ? moment(task.dueDateTime) : null}
                        format={'DD.MM.YYYY'}
                        onChange={handleDeadline}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default TaskDialog;