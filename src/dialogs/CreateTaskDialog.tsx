import React, {ChangeEvent, useState} from 'react';
import {DatePicker, Form, Input, Modal, Select} from "antd";
import {Task, ProcessType, TaskModel, UpdateTaskModel} from '../dataAccess/models';
import TextArea from "antd/es/input/TextArea";
import {createTask, getGroupMembers, getGroupPlans, getPlanTasks, updateTask} from '../dataAccess/api';
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../dataAccess/authConfig";
import {AuthenticationResult} from "@azure/msal-browser";
import moment, { Moment } from 'moment';

interface Props {
    visible: boolean,
    setVisible: (visible: boolean) => void,
    planId: string,
    groupId: string
}

const CreateTaskDialog = ({visible, setVisible, planId, groupId}: Props) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [task, setTask] = useState<Task>({
        id: '',
        planId: '',
        percentComplete: 0,
        assigmentBy: '',
        dueDateTime: '',
        title: '',
        description: ''
    })

    const [options, setOptions] = useState<{label: string, value: string}[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const {instance, accounts} = useMsal();

    const handleCancel = () => {
        setVisible(false)
    }

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTask({...task, title: e.target.value})
    }

    const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTask({...task, description: e.target.value})
    }

    const handleAssign = async (open: boolean) => {
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

        }
        setIsLoading(false)
    }

    const handleChangeAssign = (value: string) => {
        setTask({...task, assigmentBy: value})
    }

    const handleDeadline = (value: Moment | null) => {
        setTask({...task, dueDateTime: moment(value).toISOString()})
    }

    const handleCreateTask = () => {
        setConfirmLoading(true)
        // @ts-ignore
        instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then(async (response: AuthenticationResult) => {
                const taskModel: TaskModel = {
                    planId: planId,
                    title: task.title,
                }
                const res = await createTask(response.accessToken, taskModel);
                const updateTaskModel: UpdateTaskModel = {
                    planId: planId,
                    assignments: {
                        [task.assigmentBy]: {
                            "@odata.type": "#microsoft.graph.plannerAssignment",
                            "orderHint":` !`,
                        }
                    }
                }
                await updateTask(response.accessToken, res.id, updateTaskModel, res['@odata.etag']);
            })
            .catch((e: any) => console.log(e));

        setConfirmLoading(false)
    }

    return (
        <Modal
            title={'Добавить новую задачу'}
            visible={visible}
            confirmLoading={confirmLoading}
            cancelText={'Отмена'}
            okText={'Добавить'}
            onCancel={handleCancel}
            onOk={handleCreateTask}
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

export default CreateTaskDialog;