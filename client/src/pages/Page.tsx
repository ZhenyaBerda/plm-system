import React from 'react';
import { Layout, Menu } from 'antd';

import {
    Link
} from "react-router-dom";

import './Page.css';


const { Header, Content, Sider, Footer } = Layout;

const Page = (props: React.PropsWithChildren<any>) => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} >
                <div className="logo" >PLM</div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        <Link to={'/'}>Пользователи</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={'/projects'}>Проекты</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff' }} />
                <Content style={{ margin: '0 16px' }}>
                    {props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>PLM System @2021 Created by Evgeniya Berdnikova</Footer>
            </Layout>
        </Layout>
    );
}

export default Page;