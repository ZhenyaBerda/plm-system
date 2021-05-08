import React, {ChangeEvent, useState} from 'react';
import {Checkbox, Form, Input, Modal, Select} from 'antd';
import { Group, Member } from '../dataAccess/models';
import TextArea from "antd/es/input/TextArea";
import {useMsal} from "@azure/msal-react";
import {loginRequest} from "../dataAccess/authConfig";
import {AuthenticationResult} from "@azure/msal-browser";
import {getUsers} from "../dataAccess/api";

interface Props {
    isVisible: boolean,
    onClose: () => void,
    onCreate: (group: Group) => void,
    isLoading: boolean,
}

const CreationPopup = ({isVisible, onClose, onCreate, isLoading}: Props) => {
    const [group, setGroup] = useState<Group>({
        id: '',
        displayName: '',
        description: null,
        mailEnabled: false,
        mailNickname: null,
        securityEnabled: true,
    });

    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setGroup({...group, displayName: e.target.value});
    };

    const handleDescription = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (!!e.target.value)
            setGroup({...group, description: e.target.value})
        else
            setGroup({...group, description: null})
    };

    const handleNickName = (e: ChangeEvent<HTMLInputElement>) => {
        setGroup({...group, mailNickname: e.target.value});
    };

    return (
        <Modal
            title={'Новая группа'}
            visible={isVisible}
            onCancel={onClose}
            confirmLoading={isLoading}
            onOk={() => onCreate(group)}
            okText={'Создать'}
            cancelText={'Отмена'}
        >
            <Form
                layout="vertical"
            >
                <Form.Item
                    name={'nickname'}
                    label={'Псевдоним группы'}
                    rules={[{required: true, message: 'Введите псевдоним группы'}]}
                >
                    <Input
                        value={group.mailNickname ?? ''}
                        onChange={handleNickName}
                    />
                </Form.Item>
                <Form.Item
                    name={'title'}
                    label={'Отображаемое имя'}
                    rules={[{required: true, message: 'Введите отображаемое имя'}]}
                >
                    <Input
                        value={group.displayName}
                        onChange={handleName}
                    />
                </Form.Item>
                <Form.Item
                    name={'description'}
                    label={'Описание'}
                >
                    <TextArea
                        value={group.description ?? ''}
                        onChange={handleDescription}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default CreationPopup;