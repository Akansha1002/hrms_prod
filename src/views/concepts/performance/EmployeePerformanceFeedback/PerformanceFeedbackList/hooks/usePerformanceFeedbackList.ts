import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { usePerformanceFeedbackListStore } from '../store/performanceFeedbackStore'
import { GetPerformanceFeedbackListResponse } from '../types'
import { apiGetPerformanceFeedbackList } from '@/services/EmployeePerformanceFeedbackService'

export default function usePerformanceFeedbackList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedPerformanceFeedback,
        setSelectedPerformanceFeedback,
        setSelectAllPerformanceFeedback,
        setFilterData,
    } = usePerformanceFeedbackListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/Employee Performance Feedback', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetPerformanceFeedbackList<GetPerformanceFeedbackListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const performanceFeedbackList = data?.data || []
    const performanceFeedbackListTotal = data?.total || 0

    return {
        performanceFeedbackList,
        performanceFeedbackListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedPerformanceFeedback,
        setSelectedPerformanceFeedback,
        setSelectAllPerformanceFeedback,
        setFilterData,
    }
}