import useSWR from 'swr'
import { apiGetEmployeeTransfers } from '@/services/EmployeeTransferService'
import { useEmployeeTransferListStore } from '../store/employeeTransferListStore'
import type { TableQueries } from '@/@types/common'
import type {
  EmployeeTransferData,
  GetEmployeeTransferListResponse,
} from '../types'

export default function useEmployeeTransferList() {
  const {
    tableData,
    filterData,
    setTableData,
    setFilterData,
    selectedTransfers,
    setSelectedTransfers,
    setSelectAllTransfers,
  } = useEmployeeTransferListStore((state) => state)

  const { data, error, isLoading, mutate } = useSWR(
    ['/api/employee-transfer', { ...tableData, ...filterData }],
    ([_, params]) =>
      apiGetEmployeeTransfers<GetEmployeeTransferListResponse, TableQueries>(
        params,
      ),
    {
      revalidateOnFocus: false,
    },
  )

  const transferList = data?.data || []
  const transferListTotal = data?.total || 0

  return {
    transferList,
    transferListTotal,
    error,
    isLoading,
    mutate,
    tableData,
    filterData,
    setTableData,
    setFilterData,
    selectedTransfers,
    setSelectedTransfers,
    setSelectAllTransfers,
  }
}
