// hooks/useAttendanceList.ts
import useSWR from 'swr'
import { apiGetAttendanceEntries } from '@/services/AttendanceService'
import { useAttendanceListStore } from '../store/attendanceListStore'
import type { TableQueries } from '@/@types/common'
import type { AttendanceData } from '../types'

export default function useAttendanceList() {
  const {
    tableData,
    filterData,
    setTableData,
    setFilterData,
    selectedAttendance,
    setSelectedAttendance,
    setSelectAllAttendance,
  } = useAttendanceListStore((state) => state)

  const { data, error, isLoading, mutate } = useSWR(
    ['/api/attendance', { ...tableData, ...filterData }],
    ([_, params]) => apiGetAttendanceEntries<{ data: AttendanceData[] }, TableQueries>(params),
    { revalidateOnFocus: false }
  )

  const attendanceList = data?.data || []
  const attendanceTotal = data?.total || 0

  return {
    attendanceList,
    attendanceTotal,
    error,
    isLoading,
    mutate,
    tableData,
    filterData,
    setTableData,
    setFilterData,
    selectedAttendance,
    setSelectedAttendance,
    setSelectAllAttendance,
  }
}
