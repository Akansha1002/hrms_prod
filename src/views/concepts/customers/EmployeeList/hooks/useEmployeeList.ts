import { apiGetCustomersList } from '@/services/CustomersService'
import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { useEmployeeListStore } from '../store/employeeListStore'
import { GetEmployeesListResponse } from '../types'

export default function useEmployeeList() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedEmployee,
        setSelectedEmployee,
        setSelectAllEmployee,
        setFilterData,
    } = useEmployeeListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/customers', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetCustomersList<GetEmployeesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const employeeList = data?.data || []
    const employeeListTotal = data?.total || 0

    return {
        employeeList,
        employeeListTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedEmployee,
        setSelectedEmployee,
        setSelectAllEmployee,
        setFilterData,
    }
}