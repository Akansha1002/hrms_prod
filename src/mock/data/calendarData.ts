function getDate(dayString: string) {
    const today = new Date()
    const year = today.getFullYear().toString()
    let month = (today.getMonth() + 1).toString()

    if (month.length === 1) {
        month = '0' + month
    }

    return dayString.replace('YEAR', year).replace('MONTH', month)
}

export const calendarData = [
    {
        id: '0',
        title: 'Holiday',
        start: getDate('YEAR-MONTH-01'),
        eventColor: 'yellow',
    },
    {
        id: '1',
        title: 'Holiday',
        start: getDate('YEAR-MONTH-02'),
        eventColor: 'yellow',
    },
    {
        id: '2',
        title: 'Present',
        start: getDate('YEAR-MONTH-03'),
        eventColor: 'green',
    },
    {
        id: '3',
        title: 'Present',
        start: getDate('YEAR-MONTH-04'),
        eventColor: 'green',
    },
    {
        id: '4',
        title: 'Attendance Regularisation',
        start: getDate('YEAR-MONTH-05'),
        eventColor: 'purple',
    },
    {
        id: '5',
        title: 'Present',
        start: getDate('YEAR-MONTH-06'),
        eventColor: 'green',
    },
    {
        id: '6',
        title: 'Present',
        start: getDate('YEAR-MONTH-07'),
        eventColor: 'green',
    },
    {
        id: '7',
        title: 'Holiday',
        start: getDate('YEAR-MONTH-08'),
        eventColor: 'yellow',
    },
    {
        id: '8',
        title: 'Holiday',
        start: getDate('YEAR-MONTH-09'),
        eventColor: 'yellow',
    },
    {
        id: '9',
        title: 'Present',
        start: getDate('YEAR-MONTH-10'),
        eventColor: 'green',
    },
    {
        id: '10',
        title: 'Present',
        start: getDate('YEAR-MONTH-11'),
        eventColor: 'green',
    },
    {
        id: '11',
        title: 'Present',
        start: getDate('YEAR-MONTH-12'),
        eventColor: 'green',
    },
    {
        id: '12',
        title: 'Leave',
        start: getDate('YEAR-MONTH-13'),
        eventColor: 'blue',
    },
    {
        id: '13',
        title: 'Holiday',
        start: getDate('YEAR-MONTH-14'),
        eventColor: 'yellow',
    },
    {
        id: '14',
        title: 'Holiday',
        start: getDate('YEAR-MONTH-15'),
        eventColor: 'yellow',
    },
    {
        id: '15',
        title: 'Holiday',
        start: getDate('YEAR-MONTH-16'),
        eventColor: 'yellow',
    },
    {
        id: '16',
        title: 'Present',
        start: getDate('YEAR-MONTH-17'),
        eventColor: 'green',
    },
    {
        id: '17',
        title: 'Attendance Regularisation',
        start: getDate('YEAR-MONTH-18'),
        eventColor: 'purple',
    },
    {
        id: '18',
        title: 'Present',
        start: getDate('YEAR-MONTH-19'),
        eventColor: 'green',
    },
    {
        id: '19',
        title: 'Absent',
        start: getDate('YEAR-MONTH-20'),
        eventColor: 'red',
    },
    {
        id: '20',
        title: 'Present',
        start: getDate('YEAR-MONTH-21'),
        eventColor: 'green',
    },
    {
        id: '21',
        title: 'Holiday',
        start: getDate('YEAR-MONTH-22'),
        eventColor: 'yellow',
    },
    {
        id: '22',
        title: 'Holiday',
        start: getDate('YEAR-MONTH-23'),
        eventColor: 'yellow',
    },
    {
        id: '23',
        title: 'Present',
        start: getDate('YEAR-MONTH-24'),
        eventColor: 'green',
    },
    {
        id: '24',
        title: 'Present',
        start: getDate('YEAR-MONTH-25'),
        eventColor: 'green',
    },
    {
        id: '25',
        title: 'Present',
        start: getDate('YEAR-MONTH-26'),
        eventColor: 'green',
    },
]
