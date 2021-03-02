import * as React from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import {Link} from "react-router-dom";

import './form.css'

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 10,
    },
};


const LoginForm = () => {
    return (
        <Form
            className={'form'}
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            style={{ marginTop: '50px'}}
        >
            <Form.Item
                label={'Username'}
                name={'username'}
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label={'Password'}
                name={'password'}
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    }
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item>
                <Button type='primary' htmlType='submit'>
                    Войти
                </Button>
                {/*<Button type={'link'}>*/}
                {/*    <Link to={'/signup'}>*/}
                {/*        Зарегистрироваться*/}
                {/*    </Link>*/}
                {/*</Button>*/}
            </Form.Item>
        </Form>
    );
}

export default LoginForm;