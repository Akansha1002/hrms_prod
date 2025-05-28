import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { useEmployeePromotionStore } from '../store/employeePromotionStore'
import { GetEmployeePromotionListResponse } from '../types'
import { apiGetEmployeePromotion } from '@/services/EmployeePromotionService'

export default function useEmployeePromotion() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedEmployeePromotion,
        setSelectedEmployeePromotion,
        setSelectAllEmployeePromotion,
        setFilterData,
    } = useEmployeePromotionStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/employee promotion', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetEmployeePromotion<GetEmployeePromotionListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const employeePromotion = data?.data || []
    const employeePromotionTotal = data?.total || 0

    return {
        employeePromotion,
        employeePromotionTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedEmployeePromotion,
        setSelectedEmployeePromotion,
        setSelectAllEmployeePromotion,
        setFilterData,
    }
}