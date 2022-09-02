import * as React from 'react'
import styled from "styled-components";
import {Draggable} from "react-beautiful-dnd";
import {ITaskModel} from "../models/ITaskModel";
import {useContext} from "react";
import DatabaseContext from "../context/DatabaseContext";

interface TaskProps {
    task: ITaskModel
    index: number
}

interface ContainerProps{
    isDragging: boolean
    isDone: boolean
}

const Container = styled.div<ContainerProps>`
  padding: 15px 25px;
  margin-bottom: 8px;
  border-radius: .5rem;
  opacity: ${props => (props.isDragging ? '.4' : '1')};
  text-decoration: ${props => (props.isDone ? 'line-through' : 'none')};
  color: ${props => (props.isDone ? 'gray' : 'black')};
  background-color: ${props=> (props.isDone ? '#ababbd' : '#e0e3e7')};
`

export function Task({task, index}: TaskProps) {

    const databaseContext = useContext(DatabaseContext)

    function clickHandler(event: React.MouseEvent) {
        databaseContext.setChecked(task.id)
    }

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot)=>(
                <Container
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                    isDragging={snapshot.isDragging}
                    isDone={task.isDone}
                    onClick={clickHandler}
                >
                    <p>{task.content}</p>
                </Container>
            )}
        </Draggable>
    )
}