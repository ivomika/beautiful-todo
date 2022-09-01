import * as React from 'react'
import styled from "styled-components";
import {useContext} from "react";
import DatabaseContext from "../context/DatabaseContext";

interface ColumnProps {

}

const Container = styled.div`
      margin: 20px;
      padding: 10px 20px;
      background: azure;
      width: 300px;
      min-width: 300px;
      max-width: 300px;
      border: 2px black solid;
      height: 500px;
  
      display: flex;
      flex-direction: column;
    `
const Title = styled.h3`
      margin-bottom: 15px;
      font-weight: bold;
      font-size: 24px;
    `
const Button = styled.button`
      width: 100%;
      height: 100%;
      font-size: 40px;
      background: azure;
    `

export function ColumnButton(props: ColumnProps) {
    const databaseContext = useContext(DatabaseContext)

    function clickHandler() {
        databaseContext.createColumn(`column-${databaseContext.columns.length+1}`)
    }

    return (
        <div>
            <Container>
                <Title>Add-new-сolumn</Title>
                <Button onClick={clickHandler}>+</Button>
            </Container>
        </div>
    )
}