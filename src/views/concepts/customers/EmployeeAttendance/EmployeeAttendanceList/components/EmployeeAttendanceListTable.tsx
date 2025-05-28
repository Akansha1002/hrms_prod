import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'

import type { TableQueries } from '@/@types/common'
import type { OnSortParam, Row } from '@/components/shared/DataTable'
import type { AttendanceData } from '../types'

import useAttendanceList from '../hooks/useAttendanceList'

const statusColor: Record<string, string> = {
  Present: 'bg-success-subtle text-success',
  Absent: 'bg-error-subtle text-error',
  HalfDay: 'bg-warning-subtle text-warning',
}

const EmployeeColumn = ({ row }: { row: AttendanceData }) => (
  <Link
    className="hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100"
    to={`/employee/details/${row.employee}`}
  >
    {row.employee}
  </Link>
)

const AttendanceListTable = () => {
  const {
    attendanceList = [],
    attendanceTotal,
    tableData,
    isLoading,
    setTableData,
    selectedAttendance,
    setSelectedAttendance,
    setSelectAllAttendance,
  } = useAttendanceList()

 

  const columns = useMemo(
    () => [
      {
        header: 'Employee ID',
        accessorKey: 'employee',
        cell: (props) => {
          const row = props.row.original
          return <EmployeeColumn row={row} />
        },
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return (
            <Tag className={statusColor[row.status] || 'bg-gray-200'}>
              <span className="capitalize">{row.status || 'Unknown'}</span>
            </Tag>
          )
        },
      },
      {
        header: 'Date',
        accessorKey: 'attendance_date',
      },
      {
        header: 'ID',
        accessorKey: 'name',
      },
    ],
    []
  )

  const handleSetTableData = (data: TableQueries) => {
    setTableData(data)
    if (selectedAttendance.length > 0) {
      setSelectAllAttendance([])
    }
  }

  const handlePaginationChange = (page: number) => {
    const newTableData = cloneDeep(tableData)
    newTableData.pageIndex = page
    handleSetTableData(newTableData)
  }

  const handleSelectChange = (value: number) => {
    const newTableData = cloneDeep(tableData)
    newTableData.pageSize = Number(value)
    newTableData.pageIndex = 1
    handleSetTableData(newTableData)
  }

  const handleSort = (sort: OnSortParam) => {
    const newTableData = cloneDeep(tableData)
    newTableData.sort = sort
    handleSetTableData(newTableData)
  }

  const handleRowSelect = (checked: boolean, row: AttendanceData) => {
    setSelectedAttendance(checked, row)
  }

  const handleAllRowSelect = (checked: boolean, rows: Row<AttendanceData>[]) => {
    if (checked) {
      const originals = rows.map((row) => row.original)
      setSelectAllAttendance(originals)
    } else {
      setSelectAllAttendance([])
    }
  }

  return (
    <DataTable
      selectable
      columns={columns}
      data={attendanceList}
      noData={!isLoading && attendanceList.length === 0}
      skeletonAvatarColumns={[0]}
      skeletonAvatarProps={{ width: 28, height: 28 }}
      loading={isLoading}
      pagingData={{
        total: attendanceTotal,
        pageIndex: tableData.pageIndex as number,
        pageSize: tableData.pageSize as number,
      }}
      checkboxChecked={(row) =>
        selectedAttendance.some((selected) => selected.name === row.name)
      }
      onPaginationChange={handlePaginationChange}
      onSelectChange={handleSelectChange}
      onSort={handleSort}
      onCheckBoxChange={handleRowSelect}
      onIndeterminateCheckBoxChange={handleAllRowSelect}
    />
  )
}

export default AttendanceListTable
