import React, {useEffect, useState} from 'react';
import {initialDataNew} from "./data/initial-data";
import {Column} from "./components/Column";
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd'
import styled from "styled-components";
import {IColumnModel} from "./models/IColumnModel";
import DatabaseContext from './context/DatabaseContext';
import {ITaskModel} from "./models/ITaskModel";
import {ColumnButton} from "./components/ColumnButton";

const Container = styled.div`
  display: flex;
`

const Background = styled.div`
  background: #f7d794;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -50;
`

function App() {
  // Данные из базы
  const [columns, setColumns] = useState(initialDataNew)

  useEffect(()=>{
    const data = localStorage.getItem('todos')
    const parsedData: IColumnModel[] = JSON.parse(data!)
    if (parsedData === null){
      setColumns(initialDataNew)
      return
    }
    setColumns(parsedData)
  }, [])

  useEffect(()=>{
    localStorage.setItem('todos', JSON.stringify(columns))
  }, [columns])

  function deleteFromList<T>(list: T[], index: number): [T, T[]] {
    const newList: T[] = Array.from(list)
    const [deleted] = newList.splice(index, 1)

    return [deleted, newList]
  }

  function addToList<T>(list: T[], index: number, object: T): T[] {
    list.splice(index, 0, object)

    return list
  }

  function onDragEnd(result: DropResult) {
    if(!result.destination){
      return
    }

    if(
        result.destination === result.source &&
        result.destination.index === result.source.index
    ){
      return;
    }

    // сортировка колонок
    if(result.type==='column'){
      const [deleted, list] = deleteFromList(Array.from(columns), result.source.index)
      const newColumnOrder = addToList(list, result.destination.index, deleted)

      setColumns(newColumnOrder)
      return;
    }

    const start: IColumnModel = columns[+result.source.droppableId]
    const finish: IColumnModel = columns[+result.destination.droppableId]

    // сортировка задач в одной колонке
    if(start===finish)
    {
      const [deleted, list] = deleteFromList(Array.from(start.tasks), result.source.index)
      const newTasks = addToList(list, result.destination.index, deleted)

      const newColumn = {
        ...start,
        tasks: newTasks
      }

      const newState: IColumnModel[] = [...columns]
      newState[+result.source.droppableId] = newColumn

      setColumns(newState)
      return;
    }

    // сортировка между двумя колонками
    const [deleted, list] = deleteFromList(Array.from(start.tasks), result.source.index)
    const newStart = {
      ...start,
      tasks: list
    }

    const finishTasks = addToList(finish.tasks, result.destination.index, deleted)
    const newFinish = {
      ...columns[+result.destination.droppableId],
      tasks: finishTasks
    }

    const newState: IColumnModel[] = [...columns]
    newState[+result.source.droppableId] = newStart
    newState[+result.destination.droppableId] = newFinish

    setColumns(newState)
  }

  function createTask(columnId: number, task: ITaskModel) {
    const newColumns = Array.from(columns)
    newColumns[columnId].tasks.push(task)

    setColumns(newColumns)
  }

  function removeTask(columnId: number, index: number) {
    const newColumns = Array.from(columns)
    newColumns[columnId].tasks.splice(index, 1)

    setColumns(newColumns)
  }

  function createColumn(title: string) {
    const newColumns = Array.from(columns)
    newColumns.push({
      id: `column-${columns.length+1}`,
      title: title,
      tasks: []
    })

    setColumns(newColumns)
  }

  function removeColumn(index: number) {
    const newColumns = Array.from(columns)
    newColumns.splice(index, 1)

    setColumns(newColumns)
  }

  function setChecked(itemId: string){
    const newColumns = [...columns]
    newColumns.forEach((item)=>{
      item.tasks.forEach((item)=>{
        if(item.id === itemId)
          item.isDone = !item.isDone
      })
    })

    setColumns(newColumns)
  }

  return (
      <DatabaseContext.Provider value={{
        columns: columns,
        createTask: createTask,
        removeTask: removeTask,
        createColumn: createColumn,
        removeColumn: removeColumn,
        setChecked: setChecked
      }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId={'all-column'} direction={'horizontal'} type={'column'}>
            {(provided)=>
                <Container
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {columns.map((column: IColumnModel, index) => {
                    return <Column key={column.id} column={column} tasks ={column.tasks} index={index} />
                  })}
                  <ColumnButton/>
                  {provided.placeholder}
                </Container>
            }
          </Droppable>
        </DragDropContext>
        <Background/>
      </DatabaseContext.Provider>
  )
}

export default App;
