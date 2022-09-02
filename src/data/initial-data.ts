import {IColumnModel} from "../models/IColumnModel";


export const initialDataNew: IColumnModel[] = [
        {
            id: 'column-1',
            title: 'Lorem Ipsum',
            tasks: [
                    {id: 'task-1', content: 'В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов.', isDone: false},
                    {id: 'task-2', content: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.', isDone: false},
                    {id: 'task-3', content: 'Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь.', isDone: false},
                    {id: 'task-4', content: 'Первая строка Lorem Ipsum, "Lorem ipsum dolor sit amet..", происходит от одной из строк в разделе 1.10.32', isDone: false}
                ]
        },
        {
            id: 'column-2',
            title: 'To-do',
            tasks: []
        },
         {
            id: 'column-3',
            title: 'Posts',
            tasks: []
        }
    ]

