import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card } from 'antd';
import {Task} from '../dataAccess/models';

interface Props {
    task: Task,
    index: number
}

const TaskCard = ({task ,index}: Props) => {
    return (
        <Draggable
            draggableId={task.id}
            index={index}
        >
            {(provided, snapshot) => {
            return (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <Card
                        style={{ width: 250 }}
                        title={task.title}
                        size={'small'}
                    >
                        <p>{task.content}</p>
                    </Card>
                </div>
            )}
            }
        </Draggable>
    );
}

export default TaskCard;