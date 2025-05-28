import useSWR from 'swr'
import type { TableQueries } from '@/@types/common'
import { useEmployeeSkillMapStore } from '../store/employeeSkillMapStore'
import { apiGetEmployeeSkillMapList } from '@/services/EmployeeSkillMapService'
import { GetEmployeeSkillMapListResponse } from '../types'

export default function useEmployeeSkillMap() {
    const {
        tableData,
        filterData,
        setTableData,
        selectedEmployeeSkillMap,
        setSelectedEmployeeSkillMap,
        setSelectAllEmployeeSkillMap,
        setFilterData,
    } = useEmployeeSkillMapStore((state) => state)

    const { data, error, isLoading, mutate } = useSWR(
        ['/api/employee skill map', { ...tableData, ...filterData }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetEmployeeSkillMapList<GetEmployeeSkillMapListResponse, TableQueries>(params),
        {
            revalidateOnFocus: false,
        },
    )

    const employeeSkillMap = data?.data || []
    const employeeSkillMapTotal = data?.total || 0

    return {
        employeeSkillMap,
        employeeSkillMapTotal,
        error,
        isLoading,
        tableData,
        filterData,
        mutate,
        setTableData,
        selectedEmployeeSkillMap,
        setSelectedEmployeeSkillMap,
        setSelectAllEmployeeSkillMap,
        setFilterData,
    }
}