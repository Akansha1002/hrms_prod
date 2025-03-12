import { apiGetCustomersList } from '@/services/CustomersService'
import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { useEmployeeListStore } from '../store/employeeListStore'
import { GetEmployeesListResponse } from '../types'

export default function useEmployeeList() {
    const {
        tableData,
        setTableData,
        selectedEmployee,
        setSelectedEmployee,
        setSelectAllEmployee,
    } = useEmployeeListStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/customers', { ...tableData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetCustomersList<GetEmployeesListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const employeeList = data?.data || []

    return {
        employeeList,
        error,
        isLoading,
        tableData,
        mutate,
        setTableData,
        selectedEmployee,
        setSelectedEmployee,
        setSelectAllEmployee,
    }
}