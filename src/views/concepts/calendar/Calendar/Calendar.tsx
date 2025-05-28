import { useState, useMemo } from 'react'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import useSWR from 'swr'
import CalendarView from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
import Notification from '@/components/ui/Notification'
import { toast } from '@/components/ui/toast'
import LeaveRequestDialog from './components/LeaveRequestDrawer'
import EventDialog from './components/EventDialog'
import { apiAddLeaveApplication } from '@/services/LeaveService'
import {
    apiGetAttendanceByEmployee,
    apiGetSingleAttendance,
} from '@/services/AttendanceService'
import { apiGetCalendar } from '@/mock/fakeApi/calendarFakeApi'
import { useNavigate } from 'react-router-dom'
import { apiGetEmployeeNameList } from '@/services/HolidayService'

import Select from '@/components/ui/Select' // \U0001f448 imported Select component

import type {
    GetCalendarResponse,
    SelectedCell,
    CalendarEventParam,
    LeaveRequestSchema,
    AttendanceDetail,
} from './types'
import type {
    EventDropArg,
    EventClickArg,
    DateSelectArg,
} from '@fullcalendar/core'

const Calendar = () => {
    const navigate = useNavigate()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedCell, setSelectedCell] = useState<SelectedCell>({
        type: '',
    })

    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(
        null,
    )

    const { data: employeeData, isLoading: isEmployeeLoading } = useSWR(
        ['/api/resource/Employee/attendance', {}],
        ([_, params]) =>
            apiGetEmployeeNameList<
                { data: { name: string; employee_name: string }[] },
                Record<string, unknown>
            >(params),
        { revalidateOnFocus: false },
    )

    const employeeOptions =
        employeeData?.data?.map((emp) => ({
            value: emp.name,
            label: `${emp.employee_name} (${emp.name})`,
        })) || []

    const { data: events, mutate } = useSWR(
        '/api/calendar',
        () => apiGetCalendar(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )

    const { data: attendanceData, isLoading } = useSWR(
        selectedEmployee ? ['attendanceByEmployee', selectedEmployee] : null,
        ([_, id]) =>
            apiGetAttendanceByEmployee<
                { data: AttendanceDetail[] },
                { employeeId: string }
            >({
                employeeId: id,
            }),
    )

    console.log('attendanceData', attendanceData)

    const attendanceEvents = useMemo(() => {
        if (attendanceData?.data) {
            return attendanceData.data.map((entry, idx) => ({
                id: `${idx}`,
                title: entry.status,
                start: dayjs(entry.attendance_date).format(),
                allDay: true,
                eventColor:
                    entry.status === 'Present'
                        ? 'green'
                        : entry.status === 'Absent'
                          ? 'red'
                          : entry.status === 'On Leave'
                            ? 'purple'
                            : 'gray',
            }))
        }

        return []
    }, [attendanceData])

    const handleCellSelect = (event: DateSelectArg) => {
        const { start, end } = event
        setSelectedCell({
            type: 'NEW',
            start: dayjs(start).format(),
            end: dayjs(end).format(),
            posting_date: dayjs(start).format('YYYY-MM-DD'),
        })
        setDialogOpen(true)
        // setDrawerOpen(true)
    }

    // const handleEventClick = (arg: EventClickArg) => {
    //     const { start, end, id, title, extendedProps } = arg.event

    //     setSelectedCell({
    //         type: 'EDIT',
    //         eventColor: extendedProps.eventColor,
    //         title,
    //         start: start ? dayjs(start).toISOString() : undefined,
    //         end: end ? dayjs(end).toISOString() : undefined,
    //         id,
    //     })
    //     setDialogOpen(true)
    //     // setDrawerOpen(true)
    // }

    const handleEventClick = (arg: EventClickArg) => {
        const { start, extendedProps } = arg.event

        // Check if eventColor is purple
        if (extendedProps.eventColor === 'purple') {
            // Redirect to your desired page
            navigate(
                `/concepts/attendance/regularization-create?date=${dayjs(start).format('YYYY-MM-DD')}`,
            )
            return
        }

        // Prevent dialog from opening for past dates
        const eventDate = dayjs(start).startOf('day')
        const today = dayjs().startOf('day')

        if (eventDate.isBefore(today)) {
            return
        }
        setDialogOpen(true)
    }

    const handleEventChange = (arg: EventDropArg) => {
        const newEvents = cloneDeep(events)?.map((event) => {
            if (arg.event.id === event.id) {
                const { id, extendedProps, start, end, title } = arg.event
                event = {
                    id,
                    start: dayjs(start).format(),
                    end: dayjs(end).format(),
                    title,
                    eventColor: extendedProps.eventColor,
                }
            }
            return event
        })
        mutate(newEvents, false)
    }

    const handleSubmit = async (formData: LeaveRequestSchema) => {
        try {
            const values: LeaveRequestSchema = {
                ...formData,
                from_date: dayjs(formData.from_date).format('YYYY-MM-DD'),
                to_date: dayjs(formData.to_date).format('YYYY-MM-DD'),
                posting_date:
                    selectedCell.posting_date ?? dayjs().format('YYYY-MM-DD'),
            }
            await apiAddLeaveApplication({
                ...values,
                employee: selectedEmployee,
                leave_approver: 'Administrator',
                company: 'Anavadya (Demo)',
            })
            toast.push(
                <Notification type="success">Leave Request Sent!</Notification>,
                {
                    placement: 'top-center',
                },
            )
            await mutate()
        } catch (error) {
            console.error('Error sending Leave Request', error)
            toast.push(
                <Notification type="danger">
                    Error sending leave request!
                </Notification>,
                { placement: 'top-center' },
            )
        }
    }

    return (
        <Container className="h-full space-y-4">
            <div className="w-72">
                <Select
                    options={
                        isEmployeeLoading
                            ? [{ value: '', label: 'Loading...' }]
                            : employeeOptions
                    }
                    value={
                        employeeOptions.find(
                            (opt) => opt.value === selectedEmployee,
                        ) || null
                    }
                    onChange={(option) =>
                        setSelectedEmployee(option ? option.value : null)
                    }
                    placeholder="Select Employee"
                />
            </div>

            <CalendarView
                editable
                selectable
                events={attendanceEvents}
                eventClick={handleEventClick}
                select={handleCellSelect}
                eventDrop={handleEventChange}
            />

            <EventDialog
                open={dialogOpen}
                selected={selectedCell}
                submit={handleSubmit}
                onDialogOpen={setDialogOpen}
                employeeId={selectedEmployee}
            />

            {/* <LeaveRequestDialog
                // open={drawerOpen}
                selected={selectedCell}
                submit={handleSubmit}
                onDrawerOpen={setDrawerOpen}
            /> */}
        </Container>
    )
}

export default Calendar
