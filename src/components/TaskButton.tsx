import * as React from 'react'
import styled from "styled-components";
import {useContext} from "react";
import DatabaseContext from "../context/DatabaseContext";

interface TaskButtonProps {
    columnId: number
}

const CreateButton = styled.button`
  border-radius: .5rem;
  border: none;
  background-color: #eaedee;
  padding: 15px;
  font-size: 24px;
  box-shadow: 0 -4px 20px -15px #333;

  :hover {
    background-color: #dbdfe1;
    cursor: pointer;
  }
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