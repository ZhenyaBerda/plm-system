import Title from 'antd/lib/typography/Title';
import React from 'react';
import {Droppable} from "react-beautiful-dnd";
import { Task } from '../dataAccess/models';
import TaskCard from './TaskCard';
import styled from 'styled-components';


interface Props {
    id: string,
    tasks: Task[],
    title: string
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 260px;

  display: flex;
  flex-direction: column;
`

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props: any )=>
    props.isDraggingOver ? 'skyblue' : 'white'}
  flex-grow: 1;
  min-height: 260px;
`

const Column = ({id, tasks, title}: Props) => {
    return (
        <Container>
            <Title>{title}</Title>
        <Droppable
            droppableId={id}
        >
            {(provided, snapshot) => (
                <TaskList
                    ref={provided.innerRef}
                    className={'column'}
                    {...provided.droppableProps}

                >
                    {tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)}
                    {provided.placeholder}
                </TaskList>
            )}

        </Droppable>
        </Container>
    );
}

export default Column;