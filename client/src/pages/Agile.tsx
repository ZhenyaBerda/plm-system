import React, {useEffect, useState} from 'react';
import Board from '../components/Board';
import Page from "./Page";
import {useMsal} from "@azure/msal-react";
import { AuthenticationResult } from '@azure/msal-browser';
import {loginRequest} from "../dataAccess/authConfig";
import {getGroupPlans, getPlanTasks} from "../dataAccess/api";
import {useParams} from "react-router";

import initialData from '../dataAccess/initData';
import { Task } from '../dataAccess/models';

const Agile = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [data, setData] = useState(initialData);
    const [planId, setPlanId] = useState('');

    const {groupId} = useParams<{ groupId: string }>();

    const {instance, accounts} = useMsal();

    useEffect(() => {
        // @ts-ignore
        instance.acquireTokenSilent({...loginRequest, account: accounts[0]})
            .then(async (response: AuthenticationResult) => {
                const data = await getGroupPlans(response.accessToken, groupId);
                const tasks = await getPlanTasks(response.accessToken, data.value[0].id)
                setPlanId(data.value[0].id);
                setTasks(tasks.value.map((it: any) => ({
                        id: it.id,
                        planId: it.planId,
                        percentComplete: it.percentComplete,
                        assigmentBy: Object.keys(it.assignments) ? Object.keys(it.assignments) : '',
                        dueDateTime: it.dueDateTime,
                        title: it.title,
                        description: it.description ? it.description : ''
                    })));
            })
            .catch((e: any) => console.log(e));
    }, []);

    useEffect(() => {
        if (!!tasks) {
            const tasksData = {
                ...initialData
            };

            for (let task of tasks) {
                // @ts-ignore
                tasksData.tasks[task.id] = task;
                if (task.percentComplete === 0) {
                    // @ts-ignore
                    tasksData.columns['column-1'].taskIds.push(task.id)
                } else if (task.percentComplete === 50) {
                    // @ts-ignore
                    tasksData.columns['column-2'].taskIds.push(task.id)
                } else {
                    // @ts-ignore
                    tasksData.columns['column-3'].taskIds.push(task.id)
                }

            }

            setData(tasksData);
        }
    }, [tasks])

    return (
        <Page>
            {planId &&
                <Board
                    data={data}
                    planId={planId}
                    groupId={groupId}
                />
            }
        </Page>
    );
}

export default Agile;