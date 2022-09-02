import * as React from 'react'
import styled from "styled-components";
import {useContext} from "react";
import DatabaseContext from "../context/DatabaseContext";

const Button = styled.button`
      position: fixed;
      left: 1rem;
      top: 1rem;
      width: 50px;
      height: 50px;
      border-radius: 100%;
      font-size: 24px;
      border: none;
    
      :hover {
        background-color: #dbdfe1;
        cursor: pointer;
      }
    `

export function ColumnButton() {
    const databaseContext = useContext(DatabaseContext)

    function clickHandler() {
        databaseContext.createColumn(`column-${databaseContext.columns.length+1}`)
    }

    return (
        <Button onClick={clickHandler}>+</Button>
    )
}