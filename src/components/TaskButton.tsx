import * as React from 'react'
import styled from "styled-components";
import {useContext} from "react";
import DatabaseContext from "../context/DatabaseContext";

interface TaskButtonProps {
    columnId: number
}

const CreateButton = styled.button`
  border: 1px black solid;
  padding: 10px 15px;
  margin-bottom: 8px;
  background: azure;
  font-size: 42px;
  
`

export function TaskButton({columnId}: TaskButtonProps) {
    const databaseContext = useContext(DatabaseContext)

    let tasksLength = 1
    databaseContext.columns.forEach((item)=>{
        tasksLength += item.tasks.length
    })
    function clickHandler() {
        databaseContext.createTask(columnId, {
            id: `task-${tasksLength}`,
            content: `task-${tasksLength}`,
            isDone: false
        })
    }

    return (
        <CreateButton onClick={clickHandler}>
            +
        </CreateButton>
    )
}