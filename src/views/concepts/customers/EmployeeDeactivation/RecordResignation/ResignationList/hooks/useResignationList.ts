import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { GetEmployeeResignationListResponse } from '../types'
import { useEmployeeResignationStore } from '../store/resignationListStore'
import { apiGetResignationList } from '@/services/RecordResignationService'

export default function useEmployeeResignation() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedEmployeeResignation,
        setSelectedEmployeeResignation,
        setSelectAllEmployeeResignation,
        setFilterData,
    } = useEmployeeResignationStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/employee resignation', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetResignationList<GetEmployeeResignationListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const employeeResignation = data?.data || []
    const employeeResignationTotal = data?.total || 0

    return {
        employeeResignation,
        employeeResignationTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedEmployeeResignation,
        setSelectedEmployeeResignation,
        setSelectAllEmployeeResignation,
        setFilterData,
    }
}