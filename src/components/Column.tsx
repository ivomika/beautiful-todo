import * as React from 'react'
import styled from "styled-components";
import {Task} from "./Task";
import {Draggable, Droppable} from "react-beautiful-dnd";
import {IColumnModel} from "../models/IColumnModel";
import {ITaskModel} from "../models/ITaskModel";
import {TaskButton} from "./TaskButton";

interface ColumnProps {
    column: IColumnModel
    tasks: ITaskModel[]
    index: number
}

interface TaskListProps {
    isDraggingOver: boolean
}

const TaskBoard = styled.div`
  min-width: 300px;
  max-width: 300px;
  background: #eaedee;
  border-radius: 1rem;
  margin: 0 40px;

  display: flex;
  flex-direction: column;
`

const Container = styled.div``

const Title = styled.h3`
  padding: 25px 25px 0 25px;
  font-weight: bold;
  font-size: 24px;
`
const TaskList = styled.div<TaskListProps>`
  background: ${props => (props.isDraggingOver? '#b5cbee': '#eaedee')};
  transition: background-color .2s linear;
  flex-grow: 1;
  padding: 25px;
`

export function Column({column, tasks, index}: ColumnProps) {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided)=>
                <Container>
                    <TaskBoard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <Title {...provided.dragHandleProps}>{column.title}</Title>
                        <Droppable droppableId={`${index}`}>
                            {(provided, snapshot)=>(
                                <TaskList
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    isDraggingOver={snapshot.isDraggingOver}
                                >
                                    {tasks.map((task, index)=>
                                        <Task key={task.id} task={task} index={index}/>
                                    )}
                                    {provided.placeholder}
                                </TaskList>
                            )}
                        </Droppable>
                        <TaskButton columnId={index}/>
                    </TaskBoard>
                </Container>
            }
        </Draggable>
    )
}