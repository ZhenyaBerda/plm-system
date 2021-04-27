import React, {useState} from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import Column from './Column';
import { Button } from 'antd';
import {PlusOutlined} from '@ant-design/icons';

import initialData from '../dataAccess/initData';

import './styles/Board.css';
import CreateTaskDialog from "../dialogs/CreateTaskDialog";

const Board = () => {
    const [state, setState] = useState(initialData)
    const [visibleNewTask, setVisibleNewTask] = useState(false)

    const handleVisibleNewTask = (visible: boolean) => {
        setVisibleNewTask(visible)
    }

    const onDragEnd = (result: any) => {
        const {destination, source, draggableId} = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // @ts-ignore
        const start = state.columns[source.droppableId]
        // @ts-ignore
        const finish = state.columns[destination.droppableId]

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds)
            newTaskIds.splice(source.index, 1)
            // @ts-ignore
            newTaskIds.splice(destination.index, 0, draggableId)

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            }

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn
                }
            }

            setState(newState)
            return
        }

        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds)
        startTaskIds.splice(source.index, 1)
        const newStart = {
            ...start,
            taskIds: startTaskIds
        }

        const finishTaskIds = Array.from(finish.taskIds)
        finishTaskIds.splice(destination.index, 0, draggableId)
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds
        }

        const newState = {
            ...state,
            columns: {
                ...state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish
            }
        }
        setState(newState)
    }

    const handleAddTask = () => {
        setVisibleNewTask(true);
    }


    return (
        <div>
            <div className={'toolbar'}>
                <Button
                    size={'large'}
                    type={'text'}
                    onClick={handleAddTask}
                    icon={<PlusOutlined />}
                >
                    Добавить задачу
                </Button>
            </div>
            <DragDropContext
                onDragEnd={onDragEnd}
            >
                <div style={{display: 'flex'}}>
                    {state.columnOrder.map((columnId) => {
                        // @ts-ignore
                        const column = state.columns[columnId]
                        // @ts-ignore
                        const tasks = column.taskIds.map((taskId: string) => state.tasks[taskId])
                        return (
                            <Column key={column.id} id={column.id} tasks={tasks} title={column.title}/>
                        )
                    })}

                </div>
            </DragDropContext>

            {visibleNewTask && <CreateTaskDialog visible={visibleNewTask} setVisible={handleVisibleNewTask} />}
        </div>
    );
}

export default Board;