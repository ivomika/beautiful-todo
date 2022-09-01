import React from "react";
import {IColumnModel} from "../models/IColumnModel";
import {ITaskModel} from "../models/ITaskModel";

interface IDatabaseContext {
    columns: IColumnModel[]
    createTask: (columnId: number, task: ITaskModel) => void
    removeTask: (columnId: number, index: number) => void
    createColumn: (title: string) => void
    removeColumn: (index: number) => void
    setChecked: (itemId: string) => void
}

const DatabaseContext = React.createContext<IDatabaseContext>({} as  IDatabaseContext)

export default DatabaseContext