import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'

import type { TableQueries } from '@/@types/common'
import type { OnSortParam, Row } from '@/components/shared/DataTable'
import type { EmployeeTransferData } from '../types'

import useEmployeeTransferList from '../hooks/useEmployeeTransferList'

const statusColor: Record<string, string> = {
  Approved: 'bg-success-subtle text-success',
  Pending: 'bg-warning-subtle text-warning',
  'Pending Employee End': 'bg-error-subtle text-error',
}

const EmployeeColumn = ({ row }: { row: EmployeeTransferData }) => (
  <Link
    className="hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100"
    to={`/concepts/customers/details/${row.name}`}
  >
    {row.employee_name}
  </Link>
)

const EmployeeTransferListTable = () => {
  const {
    transferList = [],
    transferListTotal,
    tableData,
    isLoading,
    setTableData,
    setSelectAllTransfers,
    setSelectedTransfers,
    selectedTransfers,
  } = useEmployeeTransferList()

  const columns = useMemo(
    () => [
      {
        header: 'Employee Name',
        accessorKey: 'employee_name',
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
        header: 'Department',
        accessorKey: 'department',
      },
      {
        header: 'Designation',
        accessorKey: 'designation',
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
    if (selectedTransfers.length > 0) {
      setSelectAllTransfers([])
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

  const handleRowSelect = (checked: boolean, row: EmployeeTransferData) => {
    setSelectedTransfers(checked, row)
  }

  const handleAllRowSelect = (checked: boolean, rows: Row<EmployeeTransferData>[]) => {
    if (checked) {
      const originals = rows.map((row) => row.original)
      setSelectAllTransfers(originals)
    } else {
      setSelectAllTransfers([])
    }
  }

  return (
    <DataTable
      selectable
      columns={columns}
      data={transferList}
      noData={!isLoading && transferList.length === 0}
      skeletonAvatarColumns={[0]}
      skeletonAvatarProps={{ width: 28, height: 28 }}
      loading={isLoading}
      pagingData={{
        total: transferListTotal,
        pageIndex: tableData.pageIndex as number,
        pageSize: tableData.pageSize as number,
      }}
      checkboxChecked={(row) =>
        selectedTransfers.some((selected) => selected.name === row.name)
      }
      onPaginationChange={handlePaginationChange}
      onSelectChange={handleSelectChange}
      onSort={handleSort}
      onCheckBoxChange={handleRowSelect}
      onIndeterminateCheckBoxChange={handleAllRowSelect}
    />
  )
}

export default EmployeeTransferListTable
