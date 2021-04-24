import React from 'react';
import { Layout, Menu } from 'antd';

import {
    Link
} from "react-router-dom";

import './Page.css';
import { Pages } from '../@types';


const { Header, Content, Sider, Footer } = Layout;

const Page = (props: React.PropsWithChildren<any>) => {
    const selectedKey = window.location.pathname === Pages.USERS_PATH ? ['1'] : ['2']

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider width={200}>
                <div className="logo">PLM</div>
                <Menu selectedKeys={selectedKey} theme="dark" mode="inline">
                    <Menu.Item key="1">
                        <Link to={Pages.USERS_PATH}>Пользователи</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={Pages.PROJECTS_PATH}>Проекты</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: '#fff'}}>
                    <div style={{padding: '0 50px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <div style={{marginRight: '30px'}}>User Name</div>
                        <Link to={Pages.LOGIN_PATH}>Выйти</Link>
                    </div>
                </Header>
                <Content style={{margin: '0 16px'}}>
                    {props.children}
                </Content>
                <Footer style={{textAlign: 'center'}}>PLM System @2021 Created by Evgeniya Berdnikova</Footer>
            </Layout>
        </Layout>
    );
}

export default Page;