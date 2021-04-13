import React from 'react';
import {Breadcrumb, Table} from "antd";
import{ Link } from "react-router-dom";

import './Page.css';
import Page from './Page';

const Projects = () => {

    const itemRender = (route: any, params: any, routes: any, paths: any) => {
        const last = routes.indexOf(route) === routes.length - 1;
        return last ? (
            <span>{route.breadcrumbName}</span>
        ) : (
            <Breadcrumb.Item><Link to={paths.join('/')}>{route.breadcrumbName}</Link></Breadcrumb.Item>
        );
    }

    return (
        <Page>
            <div className={'projects-wrapper'}>
                <Breadcrumb
                    itemRender={itemRender}
                    routes={[
                        {
                            path: '/projects',
                            breadcrumbName: 'Projects',
                        }
                    ]}
                />
                <Table
                    className={'table'}
                    columns={[
                        {
                            title: 'Название',
                            dataIndex: 'name',
                            key: 'name'
                        },
                        {
                            title: 'Действия',
                            dataIndex: 'action',
                            key: 'action'
                        }
                    ]}
                    dataSource={[
                        {
                            name: 'Проект',
                        }
                    ]}
                />
            </div>
        </Page>
    );
}

export default Projects;