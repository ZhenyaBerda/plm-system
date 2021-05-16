import React, {useCallback} from 'react';
import { useHistory } from "react-router";
import { Layout, Menu } from 'antd';
import {Link} from "react-router-dom";
import { Pages } from '../@types';
import {useDispatch, useSelector} from "react-redux";
import {getUser} from "../state/selectors";

import './Page.css';
import {appActions} from "../state/appState";
import {setIsAuthenticated} from "../infrastructure/auth/authService";

const { Header, Content, Sider, Footer } = Layout;

const Page = (props: React.PropsWithChildren<any>) => {
    let selectedKey;
    if (window.location.pathname === Pages.USERS_PATH) {
        selectedKey = ['1']
    } else if (window.location.pathname === Pages.VIEWER_PATH) {
        selectedKey = ['3']
    } else {
        selectedKey = ['2']
    }

    const dispatch = useDispatch();
    const user = useSelector(getUser);
    const history = useHistory();

    const onLogout = useCallback( () => {
        dispatch(appActions.logout())
        setIsAuthenticated(false);
    }, [dispatch, history])

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider width={200}>
                <div className="logo">PLM</div>
                <Menu selectedKeys={selectedKey} theme="dark" mode="inline">
                    <Menu.Item key="1">
                        <Link to={Pages.USERS_PATH}>Пользователи</Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to={Pages.GROUPS_PATH}>Проекты</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to={Pages.VIEWER_PATH}>3D viewer</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header style={{padding: 0, background: '#fff'}}>
                    <div style={{padding: '0 50px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end'}}>
                        <div style={{marginRight: '30px'}}>{user.firstName+ ' ' + user.lastName}</div>
                        <Link to={Pages.LOGIN_PATH} onClick={onLogout}>Выйти</Link>
                    </div>
                </Header>
                <Content style={{margin: '0 16px'}}>
                    {props.children}
                </Content>
                <Footer style={{textAlign: 'center'}}>PLM System @ 2021 Created by Evgeniya Berdnikova</Footer>
            </Layout>
        </Layout>
    );
}

export default Page;