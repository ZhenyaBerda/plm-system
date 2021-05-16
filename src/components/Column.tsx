import React from 'react';
import {Droppable} from "react-beautiful-dnd";
import { Task } from '../dataAccess/models';
import TaskCard from './TaskCard';
import styled from 'styled-components';
import {Typography} from "antd";


interface Props {
    id: string,
    tasks: Task[],
    title: string,
    groupId: string,
}

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props: any )=>
    props.isDraggingOver ? 'skyblue' : 'white'}
  flex-grow: 1;
  min-height: 60vh;
`

const Column = ({id, tasks, title, groupId}: Props) => {

    const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  flex-grow: 1;
  text-align: center;
  margin-right: ${id !== 'column-3' ? '8px' : '0'};
  width: 100px;

  display: flex;
  flex-direction: column;
`
    return (
        <Container>
            <div style={{
                borderBottom: '1px solid lightgrey',
                backgroundColor: '#fff',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Typography.Text>
                    {title}
                </Typography.Text>
            </div>
            <Droppable
                droppableId={id}
            >
                {(provided) => (
                    <TaskList
                        ref={provided.innerRef}
                        className={'column'}
                        {...provided.droppableProps}
                    >
                        {tasks && tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} groupId={groupId}/>)}
                        {provided.placeholder}
                    </TaskList>
                )}

            </Droppable>
        </Container>
    );
}

export default Column;