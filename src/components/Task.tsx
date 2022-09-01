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
      border: 1px black solid;
      padding: 10px 15px;
      margin-bottom: 8px;
      background: ${props => (props.isDragging ? 'white' : 'azure')};
      text-decoration: ${props => (props.isDone ? 'line-through' : 'none')};
      color: ${props => (props.isDone ? 'gray' : 'black')};
`

export function Task({task, index}: TaskProps) {

    // const [done, setDone] = useState(task.isDone)
    const databaseContext = useContext(DatabaseContext)

    function clickHandler(event: React.MouseEvent) {
        databaseContext.setChecked(task.id)
        // setDone(!done)
    //    TODO: Добавить в базу изменение
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