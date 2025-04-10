import { GetCalendarResponse } from '@/views/concepts/calendar/Calendar/types'
import { mock } from '../MockAdapter'
import { calendarData } from '../data/calendarData'

// mock.onGet(`/api/calendar`).reply(() => {
//     return [200, calendarData]
// })

export const apiGetCalendar = async (): Promise<GetCalendarResponse> => {
    // Simulate API delay
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(calendarData)
        }, 500) // half a second delay for realism
    })
}
