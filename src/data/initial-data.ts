import {IColumnModel} from "../models/IColumnModel";

export interface InitialData{
    tasks: any
    columns: any
    ColumnOrder: string[]
}

export const initialData: InitialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'kek1', isDone: false},
        'task-2': {id: 'task-2', content: 'kek2', isDone: false},
        'task-3': {id: 'task-3', content: 'kek3', isDone: false},
        'task-4': {id: 'task-4', content: 'kek4', isDone: false},
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To-do',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4']
        },
        'column-2': {
            id: 'column-2',
            title: 'Not To-do',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Post To-do',
            taskIds: []
        }
    },
    ColumnOrder: ['column-1', 'column-2', 'column-3']
}

export const initialDataNew: IColumnModel[] = [
        {
            id: 'column-1',
            title: 'To-do',
            tasks: [
                {id: 'task-1', content: 'kek1', isDone: false},
                {id: 'task-2', content: 'kek2', isDone: false},
                {id: 'task-3', content: 'kek3', isDone: false},
                {id: 'task-4', content: 'kek4', isDone: false}]
        },
        {
            id: 'column-2',
            title: 'Not To-do',
            tasks: []
        },
         {
            id: 'column-3',
            title: 'Post To-do',
            tasks: []
        }
    ]

