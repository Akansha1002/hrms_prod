import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import Tag from '@/components/ui/Tag'
import Button from '@/components/ui/Button'
import DataTable from '@/components/shared/DataTable'
import { FaEdit } from 'react-icons/fa'

import type { TableQueries } from '@/@types/common'
import type { OnSortParam, Row } from '@/components/shared/DataTable'
import type { EmployeeSeparationData } from '../types'

import useEmployeeSeparationList from '../hooks/useEmployeeSeparationsList'

const statusColor: Record<string, string> = {
  Approved: 'bg-success-subtle text-success',
  Pending: 'bg-warning-subtle text-warning',
  'Pending Employee End': 'bg-error-subtle text-error',
}

const EmployeeColumn = ({ row }: { row: EmployeeSeparationData }) => (
  <Link
    className="hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100"
    to={`/concepts/customers/details/${row.name}`}
  >
    {row.employee_name}
  </Link>
)

const EmployeeSeparationListTable = ( ) => {
  const {
    separationList = [],
    separationListTotal,
    tableData,
    isLoading,
    setTableData,
    setSelectAllSeparations,
    setSelectedSeparations,
    selectedSeparations,
  } = useEmployeeSeparationList()

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
        header: 'Boarding Status',
        accessorKey: 'boarding_status',
        cell: (props) => {
          const row = props.row.original
          return (
            <Tag className={statusColor[row.boarding_status] || 'bg-gray-200'}>
              <span className="capitalize">{row.boarding_status || 'Unknown'}</span>
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
    if (selectedSeparations.length > 0) {
      setSelectAllSeparations([])
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

  const handleRowSelect = (checked: boolean, row: EmployeeSeparationData) => {
    setSelectedSeparations(checked, row)
  }

  const handleAllRowSelect = (checked: boolean, rows: Row<EmployeeSeparationData>[]) => {
    if (checked) {
      const originals = rows.map((row) => row.original)
      setSelectAllSeparations(originals)
    } else {
      setSelectAllSeparations([])
    }
  }

  return (
    <DataTable
      selectable
      columns={columns}
      data={separationList}
      noData={!isLoading && separationList.length === 0}
      skeletonAvatarColumns={[0]}
      skeletonAvatarProps={{ width: 28, height: 28 }}
      loading={isLoading}
      pagingData={{
        total: separationListTotal,
        pageIndex: tableData.pageIndex as number,
        pageSize: tableData.pageSize as number,
      }}
      checkboxChecked={(row) =>
        selectedSeparations.some((selected) => selected.name === row.name)
      }
      onPaginationChange={handlePaginationChange}
      onSelectChange={handleSelectChange}
      onSort={handleSort}
      onCheckBoxChange={handleRowSelect}
      onIndeterminateCheckBoxChange={handleAllRowSelect}
    />
  )
}

export default EmployeeSeparationListTable
