import React, {useState} from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, Typography } from 'antd';
import {Task} from '../dataAccess/models';
import styled from 'styled-components';
import moment from 'moment';
import TaskDialog from "../dialogs/TaskDialog";

import './styles/TaskCard.css';

const {Text} = Typography;

interface Props {
    task: Task,
    index: number,
    groupId: string,
}

const Container = styled.div`
  margin-bottom: 8px;
  `

const TaskCard = ({task ,index, groupId}: Props) => {
    const [showTask, setShowTask] = useState(false);

    const closeTaskDialog = () => {
        setShowTask(false)
    }

    return (
        <>
            <TaskDialog taskId={task.id} isVisible={showTask} onClose={closeTaskDialog} groupId={groupId} />
            <Draggable
                draggableId={task.id}
                index={index}
            >
                {(provided) => {
                    return (
                        <Container
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                        >
                            <Card
                                style={{minWidth: 200, textAlign: 'left'}}
                                size={'small'}
                            >
                                <p><Text strong><a onClick={() => setShowTask(true)}
                                                   className={'task-link'}>{task.title}</a></Text></p>
                                <p><Text
                                    type={'secondary'}>Срок: </Text><Text>{task.dueDateTime ? moment(task.dueDateTime).format("DD.MM.YYYY") : "-"}</Text>
                                </p>
                            </Card>
                        </Container>
                    )
                }
                }
            </Draggable>
        </>
    );
}

export default TaskCard;