import useSWR from 'swr'
import { apiGetExitInterviews } from '@/services/ExitInterviewService'
import { useExitInterviewListStore } from '../store/exitInterviewListStore'
import type { TableQueries } from '@/@types/common'
import type { ExitInterviewData, GetExitInterviewListResponse } from '../types'

export default function useExitInterviewList() {
    const {
        tableData,
        filterData,
        setTableData,
        setFilterData,
        selectedInterviews,
        setSelectedInterviews,
        setSelectAllInterviews,
    } = useExitInterviewListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/exit-interview', { ...tableData, ...filterData }],
        ([_, params]) =>
            apiGetExitInterviews<GetExitInterviewListResponse, TableQueries>(
                params,
            ),
        {
            revalidateOnFocus: false,
        },
    )

    const exitInterviewList = data?.data || []
    const exitInterviewTotal = data?.total || 0

    return {
        exitInterviewList,
        exitInterviewTotal,
        error,
        isLoading,
        mutate,
        tableData,
        filterData,
        setTableData,
        setFilterData,
        selectedInterviews,
        setSelectedInterviews,
        setSelectAllInterviews,
    }
}
