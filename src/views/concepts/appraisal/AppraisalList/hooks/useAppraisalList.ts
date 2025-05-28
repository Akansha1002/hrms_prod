import useSWR from 'swr'
import { apiGetAppraisals } from '@/services/AppraisalService'
import { useAppraisalListStore } from '../store/appraisalListStore'
import type { TableQueries } from '@/@types/common'
import type { AppraisalData, GetAppraisalListResponse } from '../types'

export default function useAppraisalList() {
    const {
        tableData,
        filterData,
        setTableData,
        setFilterData,
        selectedAppraisals,
        setSelectedAppraisals,
        setSelectAllAppraisals,
    } = useAppraisalListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/appraisal', { ...tableData, ...filterData }],
        ([_, params]) =>
            apiGetAppraisals<GetAppraisalListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const appraisalList = data?.data || []
    const appraisalTotal = data?.total || 0

    return {
        appraisalList,
        appraisalTotal,
        error,
        isLoading,
        mutate,
        tableData,
        filterData,
        setTableData,
        setFilterData,
        selectedAppraisals,
        setSelectedAppraisals,
        setSelectAllAppraisals,
    }
}
