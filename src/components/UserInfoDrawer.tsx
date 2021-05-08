import {Col, Divider, Drawer, Row} from 'antd';
import React, {useEffect, useState} from 'react';
import {loginRequest} from "../dataAccess/authConfig";
import {AuthenticationResult} from "@azure/msal-common";
import {getUserInfo} from "../dataAccess/api";
import {useMsal} from "@azure/msal-react";
import DescriptionItem from "./DescriptionItem";
import {User} from "../dataAccess/models";

import "./styles/Drawer.css";

interface Props {
    userId: string,
    isVisible: boolean,
    onClose: () => void,
}

const UserInfoDrawer = ({userId, isVisible, onClose}: Props) => {
    const [user, setUser] = useState<User | null>(null);

    const {instance, accounts} = useMsal();

    useEffect(() => {
        // @ts-ignore
        instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then(async (response: AuthenticationResult) => {
                const user = await getUserInfo(response.accessToken, userId);
                console.log(user)
                setUser({
                    id: user.id,
                    firstName: user.givenName,
                    lastName: user.surname,
                    email: user.mail,
                    businessPhone: user.businessPhones ? user.businessPhones[0] : null,
                    jobTitle: user.jobTitle,
                    officeLocation: user.officeLocation,
                })
            })
            .catch(e => console.log(e));
    }, []);

    return (
        <Drawer
            width={640}
            placement="right"
            closable={true}
            onClose={onClose}
            visible={isVisible}
        >
            {user && <>
                <p className="site-description-item-profile-p" style={{marginBottom: 24}}>
                    Информация о пользователе
                </p>
                <p className="site-description-item-profile-p">Персональные данные</p>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Имя" content={user.firstName}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Фамилия" content={user.lastName}/>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <DescriptionItem title="Должность" content={user.jobTitle ?? "-"}/>
                    </Col>
                    <Col span={12}>
                        <DescriptionItem title="Офис" content={user.officeLocation ?? "-"}/>
                    </Col>
                </Row>
                <Divider/>
                <p className="site-description-item-profile-p">Контакты</p>
                <Row>
                    <DescriptionItem title="Email" content={user.email}/>
                </Row>
                <Row>
                    <DescriptionItem title="Телефон" content={user.businessPhone ?? "-"}/>
                </Row>
            </>
            }
        </Drawer>
    );
}

export default UserInfoDrawer;