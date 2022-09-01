import {ITaskModel} from "./ITaskModel";

export interface IColumnModel {
    id: string
    title: string,
    tasks: ITaskModel[]
}