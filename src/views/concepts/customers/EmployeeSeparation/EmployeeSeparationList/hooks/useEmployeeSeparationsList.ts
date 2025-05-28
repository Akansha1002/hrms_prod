import useSWR from 'swr'
import { apiGetEmployeeSeparations } from '@/services/EmployeeSeparationService'
import { useEmployeeSeparationListStore } from '../store/employeeSeparationListStore'
import type { TableQueries } from '@/@types/common'
import type {
  EmployeeSeparationData,
  GetEmployeeSeparationResponse,
} from '../types'

export default function useEmployeeSeparationList() {
  const {
    tableData,
    filterData,
    setTableData,
    selectedSeparations,
    setSelectedSeparations,
    setSelectAllSeparations,
    setFilterData,
  } = useEmployeeSeparationListStore((state) => state)

  const { data, error, isLoading, mutate } = useSWR(
    ['/api/employee-separation', { ...tableData, ...filterData }],
    ([_, params]) =>
      apiGetEmployeeSeparations<GetEmployeeSeparationResponse, TableQueries>(
        params,
      ),
    {
      revalidateOnFocus: false,
    },
  )

  const separationList = data?.data || []
  const separationListTotal = data?.total || 0

  return {
    separationList,
    separationListTotal,
    error,
    isLoading,
    tableData,
    filterData,
    mutate,
    setTableData,
    selectedSeparations,
    setSelectedSeparations,
    setSelectAllSeparations,
    setFilterData,
  }
}
