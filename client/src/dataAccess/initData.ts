const initialData = {
    tasks: {
        '323': { id: '323', title: 'title 1', content: 'Take out the garbage', type: 'Задача' },
        '234': { id: '234', title: 'title 2', content: 'Watch my favorite show', type: 'Задача' },
        '235': { id: '235', title: 'title 3', content: 'Charge my phone', type: 'Задача' },
        '223': { id: '223', title: 'title 4', content: 'Cook dinner', type: 'Задача' }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Новое',
            taskIds: ['323', '234', '235', '223']
        },
        'column-2': {
            id: 'column-2',
            title: 'В процессе',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Выполнено',
            taskIds: []
        }
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData