import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, Typography } from 'antd';
import {Task} from '../dataAccess/models';
import styled from 'styled-components';

const {Text} = Typography;

interface Props {
    task: Task,
    index: number
}

const Container = styled.div`
  margin-bottom: 8px;
  `

const TaskCard = ({task ,index}: Props) => {
    return (
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
                        style={{ minWidth: 200, textAlign: 'left'  }}
                        size={'small'}
                    >
                        <p><Text strong>#{task.id}: </Text><Text>{task.title}</Text></p>
                        <p><Text type={'secondary'}>Тип: </Text><Text>{task.percentComplete}</Text></p>
                    </Card>
                </Container>
            )}
            }
        </Draggable>
    );
}

export default TaskCard;