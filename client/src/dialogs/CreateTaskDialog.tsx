import React, {ChangeEvent, useState} from 'react';
import {Form, Input, Modal, Select} from "antd";
import {Task, TaskType} from '../dataAccess/models';
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

interface Props {
    visible: boolean,
    setVisible: (visible: boolean) => void,
}

const CreateTaskDialog = ({visible, setVisible}: Props) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [task, setTask] = useState<Task>({
        id: '0',
        title: '',
        content: '',
        type: TaskType.TASK,
        time: ''
    })

    const handleAddButton = () => {
        setConfirmLoading(true)
    }

    const handleCancel = () => {
        setVisible(false)
    }

    const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTask({...task, title: e.target.value})
    }

    const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTask({...task, content: e.target.value})
    }

    const handleType = (value: any) => {
        setTask({...task, type: value})
    }

    return (
        <Modal
            title={'Добавить новую задачу'}
            visible={visible}
            confirmLoading={confirmLoading}
            cancelText={'Отмена'}
            okText={'Добавить'}
            onCancel={handleCancel}
            onOk={handleAddButton}
        >
            <Form
                layout="vertical"
            >
                <Form.Item
                    label={'Задача'}
                >
                    <Input
                        value={task.title}
                        onChange={handleTitle}
                    />
                </Form.Item>
                <Form.Item
                    label={'Описание'}
                >
                    <TextArea
                        value={task.content}
                        onChange={handleDescription}
                    />
                </Form.Item>
                <Form.Item
                    label={'Тип'}
                >
                    <Select
                        placeholder={'Выберете тип задачи'}
                        value={task.type}
                        onChange={handleType}
                    >
                        <Option value={TaskType.TASK}>Задача</Option>
                        <Option value={TaskType.DOC}>Документация</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label={'Время выполнения'}
                >
                    <Input value={task.time}/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreateTaskDialog;