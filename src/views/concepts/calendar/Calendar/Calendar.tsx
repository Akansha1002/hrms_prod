import { useState } from 'react'
import dayjs from 'dayjs'
import cloneDeep from 'lodash/cloneDeep'
import useSWR from 'swr'
import CalendarView from '@/components/shared/CalendarView'
import Container from '@/components/shared/Container'
import Notification from '@/components/ui/Notification'
import { toast } from '@/components/ui/toast'
import LeaveRequestDialog from './components/LeaveRequestDrawer'
import EventDialog from './components/EventDialog'
// import { apiGetCalendar } from '@/services/CalendarService'
import { apiAddLeaveApplication } from '@/services/LeaveService'
import type {
    GetCalendarResponse,
    SelectedCell,
    CalendarEventParam,
    LeaveRequestSchema
} from './types'
import type {
    EventDropArg,
    EventClickArg,
    DateSelectArg,
} from '@fullcalendar/core'
import { apiGetSingleAttendance } from '@/services/AttendanceService'
import { apiGetCalendar } from '@/mock/fakeApi/calendarFakeApi'
import { useNavigate } from 'react-router-dom'

const Calendar = () => {
    const navigate = useNavigate()
    const [dialogOpen, setDialogOpen] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedCell, setSelectedCell] = useState<SelectedCell>({
        type: '',
    })

    const { data: events, mutate } = useSWR(
        '/api/calendar',
        () => apiGetCalendar(),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            revalidateOnReconnect: false,
        },
    )
    const handleCellSelect = (event: DateSelectArg) => {
        const { start, end } = event
        setSelectedCell({
            type: 'NEW',
            start: dayjs(start).format(),
            end: dayjs(end).format(),
            posting_date: dayjs(start).format('YYYY-MM-DD')
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
            navigate(`/concepts/attendance/regularization-create?date=${dayjs(start).format('YYYY-MM-DD')}`)
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
                posting_date: selectedCell.posting_date ?? dayjs().format('YYYY-MM-DD'),
            };
            await apiAddLeaveApplication({
                ...values,
                employee: 'HR-EMP-00034',
                leave_approver: 'Administrator',
                company: 'Anavadya (Demo)',
            });
            toast.push(<Notification type="success">Leave Request Sent!</Notification>, {
                placement: 'top-center',
            });
            await mutate();
        } catch (error) {
            console.error('Error sending Leave Request', error);
            toast.push(
                <Notification type="danger">Error sending leave request!</Notification>,
                { placement: 'top-center' },
            );
        }
    };

    return (
        <Container className="h-full">
            <CalendarView
                editable
                selectable
                events={events}
                eventClick={handleEventClick}
                select={handleCellSelect}
                eventDrop={handleEventChange}
            />
            <EventDialog
                open={dialogOpen}
                selected={selectedCell}
                submit={handleSubmit}
                onDialogOpen={setDialogOpen}
                employeeId="HR-EMP-00034"
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
