import React from 'react';
import {Breadcrumb, Space, Table} from "antd";
import{ Link } from "react-router-dom";

import './Page.css';
import Page from './Page';
import { Pages } from '../@types';

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
                            title: 'Доска',
                            dataIndex: 'Agile',
                            key: 'agile',
                            render: (text, record) => (
                                <Space key={text} size="middle">
                                    <Link to={Pages.PROJECTS_BOARD_PATH + '/' + record.name}>Доска</Link>
                                </Space>
                            )
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