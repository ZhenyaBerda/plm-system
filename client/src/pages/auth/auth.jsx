import * as React from 'react';
import {Link, Route} from 'react-router-dom';
import LoginForm from '../components/loginForm';
import RegistrationForm from '../components/registrationForm';
import '../style.css';

import { Layout, Menu } from 'antd';
const { Header, Content} = Layout;

const Auth = () => (
    <section className="auth">
        <div>
            <Header>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1">
                        <Link to={'/signin'}>
                            Войти
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={'/signup'}>
                        Зарегистрироваться
                        </Link>
                        </Menu.Item>
                </Menu>
            </Header>

            <Content>
                <Route exact path="/signin" component={LoginForm} />
                <Route exact path="/signup" component={RegistrationForm} />
            </Content>
        </div>
    </section>
);

export default Auth;