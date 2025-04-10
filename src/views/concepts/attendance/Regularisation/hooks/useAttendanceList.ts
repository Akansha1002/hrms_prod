import useSWR from 'swr'
import {
    apiGetAttendances,
    createAttendance,
    getAttendances,
    updateAttendance,
} from '@/services/AttendanceRegularisationService'
import { useAttendanceListStore } from '../store/attendanceListStore'
import type { TableQueries } from '@/@types/common'
import type { AttendanceData, GetAttendanceListResponse } from '../type'

export default function useAttendanceList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedAttendance,
        setSelectedAttendance,
        setSelectAllAttendance,
        setFilterData,
    } = useAttendanceListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/attendance', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetAttendances<GetAttendanceListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const attendanceList = data?.data || []
    const attendanceListTotal = data?.total || 0

    const addAttendance = async (newData: Record<string, unknown>) => {
        await createAttendance(newData)
        mutate()
    }

    const editAttendance = async (
        id: string,
        updatedData: Record<string, unknown>,
    ) => {
        await updateAttendance(id, updatedData)
        mutate()
    }

    return {
        attendanceList,
        attendanceListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedAttendance,
        setSelectedAttendance,
        setSelectAllAttendance,
        setFilterData,
        addAttendance,
        editAttendance,
    }
}
