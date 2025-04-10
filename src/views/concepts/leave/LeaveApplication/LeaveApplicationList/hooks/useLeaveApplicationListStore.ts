import useSWR from 'swr'
import {
    apiGetLeaveApplicationList,
    apiAddLeaveApplication,
    apiUpdateLeaveApplication,
} from '@/services/LeaveService'
import { useLeaveApplicationListStore } from '../store/leaveApplicationStore'
import type { TableQueries } from '@/@types/common'
import type { GetLeaveApplicationListResponse } from '../types'

export default function useLeaveApplicationList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedLeaveApplication,
        setSelectedLeaveApplication,
        setSelectAllLeaveApplication,
        setFilterData,
    } = useLeaveApplicationListStore((state) => state)

    console.log('Current Filter Data:', filterData) // Debugging log

    const { data, error, isLoading, mutate } = useSWR(
        () => {
            const filters = []

            if (filterData.status) {
                filters.push(['status', '=', filterData.status])
            }

            return ['/api/Leave Application', { ...tableData, filters }]
        },
        ([_, params]) =>
            apiGetLeaveApplicationList<
                GetLeaveApplicationListResponse,
                TableQueries
            >(params),
        {
            revalidateOnFocus: false,
        },
    )

    const leaveApplicationList = data?.data || []
    const leaveApplicationListTotal = data?.total || 0

    const addLeaveApplication = async (newData: Record<string, unknown>) => {
        await apiAddLeaveApplication(newData)
        mutate()
    }

    const editLeaveApplication = async (
        id: string,
        updatedData: Record<string, unknown>,
    ) => {
        await apiUpdateLeaveApplication(id, updatedData)
        mutate()
    }

    return {
        leaveApplicationList,
        leaveApplicationListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedLeaveApplication,
        setSelectedLeaveApplication,
        setSelectAllLeaveApplication,
        setFilterData,
        addLeaveApplication,
        editLeaveApplication,
    }
}
