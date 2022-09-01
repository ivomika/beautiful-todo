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

const Container = styled.div`
      margin: 20px;
      padding: 10px 20px;
      background: azure;
      width: 300px;
      border: 2px black solid;
  
      display: flex;
      flex-direction: column;
    `
const Title = styled.h3`
      margin-bottom: 15px;
      font-weight: bold;
      font-size: 24px;
    `
const TaskList = styled.div<TaskListProps>`
      background: ${props => (props.isDraggingOver? 'aqua': 'azure')};
      flex-grow: 1;
    `

export function Column({column, tasks, index}: ColumnProps) {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided)=>
                <div>
                    <Container
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
                    </Container>
                </div>
            }
        </Draggable>
    )
}