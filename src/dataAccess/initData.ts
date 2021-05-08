const initialData = {
    tasks: {},
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Новые',
            taskIds: []
        },
        'column-2': {
            id: 'column-2',
            title: 'Активные',
            taskIds: []
        },
        'column-3': {
            id: 'column-3',
            title: 'Выполненные',
            taskIds: []
        }
    },
    // Facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData