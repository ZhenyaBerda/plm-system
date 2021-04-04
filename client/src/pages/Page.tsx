import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Sider, Footer } = Layout;

interface Props {

}

const Page = () => {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} >
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                        Option 1
                    </Menu.Item>
                    <Menu.Item key="2">
                        Option 2
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: '#fff' }} />
                <Content style={{ margin: '0 16px' }}>Content</Content>
                <Footer style={{ textAlign: 'center' }}>Footer</Footer>
            </Layout>
        </Layout>
    );
}

export default Page;