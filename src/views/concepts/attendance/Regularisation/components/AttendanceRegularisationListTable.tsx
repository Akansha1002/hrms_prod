import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'


import useAttendanceList from '../hooks/useAttendanceList'
import { AttendanceData } from '../type'
import Button from '@/components/ui/Button'
import { FaEdit } from 'react-icons/fa'


const statusColor: Record<string, string> = {
  approved: 'bg-success-subtle text-success',
  rejected: 'bg-error-subtle text-error',
  pending: 'bg-warning-subtle text-warning',
}

const EmployeeColumn = ({ row }: { row: AttendanceData }) => {
  return (
    <>
      <Link
        className={`hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
        to={`/concepts/customers/details/${row.name}`}
      >
        {row.employee_name}
      </Link>
    </>
  )
}

const AttendanceRegularisationListTable = (props: { handleEdit: any }) => {
  const { handleEdit } = props
  const {
    attendanceList = [],
    attendanceListTotal,
    tableData,
    isLoading,
    setTableData,
    setSelectAllAttendance,
    setSelectedAttendance,
    selectedAttendance,
  } = useAttendanceList()

  const columns = useMemo(
    () => [
      {
        header: "Employee Name",
        accessorKey: "employee_name",

        cell: (props) => {
          const row = props.row.original
          return <EmployeeColumn row={row} />
        }
      },
      {
        header: "Date",
        accessorKey: "date",

        filterFn: (row, columnId, filterValue) => {
          const rowDate = new Date(row.getValue(columnId)).getTime();

          const fromDate = new Date(filterValue[0]).getTime();
          const toDate = new Date(filterValue[1]).getTime();

          return rowDate >= fromDate && rowDate <= toDate;
        },
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center">
              <Tag className={statusColor[row.status]}>
                <span className="capitalize">{row.status}</span>
              </Tag>
            </div>
          )
        },

      },
      {
        header: "Actions",
        accessorKey: "actions",
        cell: (props) => (
          <Button size="sm" className="flex items-center justify-end" onClick={() => handleEdit(props.row.original)}>
            <FaEdit className="h-4 w-4 mr-1" /> Edit
          </Button>
        ),
      },
    ],
    []
  );


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
      const originalRows = rows.map((row) => row.original)
      setSelectAllAttendance(originalRows)
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
        total: attendanceListTotal,
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

export default AttendanceRegularisationListTable