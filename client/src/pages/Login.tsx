import React, {useState} from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import './login.css';

const { Title, Text } = Typography;

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);

    const handleEmail = (value: string) => {
        setEmail(value)
    }

    const handlePassword = (value: string) => {
        setPassword(value)
    }

    const handleChecked = (value: boolean) => {
        setIsRemember(value)
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <div className={'login-page'}>
            <div className={'login'}>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    style={{ minWidth: '450px' }}
                >
                    <div className={'title'}>
                        <Text type="secondary">Welcome back!</Text>
                        <Title style={{ marginTop: '10px', color: '#001529' }}>
                            Login your account
                        </Title>
                    </div>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />}
                               placeholder="Email"
                               value={email}
                               onChange={(e) => handleEmail(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => handlePassword(e.target.value)}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox
                                checked={isRemember}
                                onChange={(e) => handleChecked(e.target.checked)}
                            >
                                Remember me
                            </Checkbox>
                        </Form.Item>

                    </Form.Item>

                    <Form.Item>
                        <Button
                            style={{ width: '100%' }}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button">
                            Log in
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className={'login-info'}>
d
            </div>
        </div>
    );
}

export default Login;