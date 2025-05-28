import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'

import { FaEdit } from 'react-icons/fa'
import Button from '@/components/ui/Button'

import  useTaxDeclarationList  from '../hooks/useTaxDeclarationList'
import { EmployeeTaxExemptionDeclaration } from '../types'
import type { TableQueries } from '@/@types/common'
import type { OnSortParam, Row } from '@/components/shared/DataTable'

const statusColor: Record<string, string> = {
  Approved: 'bg-success-subtle text-success',
  Pending: 'bg-error-subtle text-error',
  'Pending Employee End': 'bg-warning-subtle text-warning',
}

const EmployeeColumn = ({ row }: { row: EmployeeTaxExemptionDeclaration }) => (
  <Link
    className="hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100"
    to={`/concepts/customers/details/${row.name}`}
  >
    {row.employee_name}
  </Link>
)

const TaxExemptionDeclarationListTable = () => {
  const {
    declarationList = [],
    declarationTotal,
    tableData,
    isLoading,
    selectedDeclarations,
    setTableData,
    setSelectAllDeclarations,
    setSelectedDeclarations,
  } = useTaxDeclarationList()

  const columns = useMemo(
    () => [
      {
        header: 'Employee Name',
        accessorKey: 'employee_name',
        cell: (props) => <EmployeeColumn row={props.row.original} />,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center">
              <Tag className={statusColor[row.status] || 'bg-gray-200'}>
                <span className="capitalize">{row.status || 'Unknown'}</span>
              </Tag>
            </div>
          )
        },
      },
      {
        header: 'Employee ID',
        accessorKey: 'employee',
      },
      {
        header: 'Payroll Period',
        accessorKey: 'payroll_period',
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
    if (selectedDeclarations.length > 0) {
      setSelectAllDeclarations([])
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

  const handleRowSelect = (checked: boolean, row: EmployeeTaxExemptionDeclaration) => {
    setSelectedDeclarations(checked, row)
  }

  const handleAllRowSelect = (checked: boolean, rows: Row<EmployeeTaxExemptionDeclaration>[]) => {
    if (checked) {
      const originalRows = rows.map((row) => row.original)
      setSelectAllDeclarations(originalRows)
    } else {
      setSelectAllDeclarations([])
    }
  }

  return (
    <DataTable
      selectable
      columns={columns}
      data={declarationList}
      noData={!isLoading && declarationList.length === 0}
      loading={isLoading}
      skeletonAvatarColumns={[0]}
      skeletonAvatarProps={{ width: 28, height: 28 }}
      pagingData={{
        total: declarationTotal,
        pageIndex: tableData.pageIndex as number,
        pageSize: tableData.pageSize as number,
      }}
      checkboxChecked={(row) =>
        selectedDeclarations.some((selected) => selected.name === row.name)
      }
      onPaginationChange={handlePaginationChange}
      onSelectChange={handleSelectChange}
      onSort={handleSort}
      onCheckBoxChange={handleRowSelect}
      onIndeterminateCheckBoxChange={handleAllRowSelect}
    />
  )
}

export default TaxExemptionDeclarationListTable
