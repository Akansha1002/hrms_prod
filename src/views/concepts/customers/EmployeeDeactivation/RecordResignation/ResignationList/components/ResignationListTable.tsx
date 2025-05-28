import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import { EmployeeResignationData } from '../types'
import useEmployeeResignation from '../hooks/useResignationList'

const statusColor: Record<string, string> = {
    Approved: 'bg-success-subtle text-success',
    Cancelled: 'bg-error-subtle text-error',
    pending: 'bg-warning-subtle text-warning',
}

const EmployeeColumn = ({ row }: { row: EmployeeResignationData }) => {
    return (
        <Link
            className={`hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
            to={`/concepts/customers/details/${row.name}`}
        >
            {row.employee_name}
        </Link>
    )
}

const ResignationListTable = () => {
    const {
        employeeResignation = [],
        employeeResignationTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllEmployeeResignation,
        setSelectedEmployeeResignation,
        selectedEmployeeResignation,
    } = useEmployeeResignation()

    const columns: ColumnDef<EmployeeResignationData>[] = useMemo(
        () => [
            {
                header: 'Employee Name',
                accessorKey: 'employee_name',
                cell: (props) => {
                    const row = props.row.original
                    return <EmployeeColumn row={row} />
                }
            },
            {
                header: 'Status',
                accessorKey: 'employee_onboarding_status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag className={statusColor[row.status ?? '']}>
                                <span className="capitalize">{row.status}</span>
                            </Tag>
                        </div>
                    )
                },
            },
            {
                header: 'Employee',
                accessorKey: 'employee',
            },
            {
                header: 'ID',
                accessorKey: 'name',
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedEmployeeResignation.length > 0) {
            setSelectAllEmployeeResignation([])
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

    const handleRowSelect = (checked: boolean, row: EmployeeResignationData) => {
        setSelectedEmployeeResignation(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<EmployeeResignationData>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllEmployeeResignation(originalRows)
        } else {
            setSelectAllEmployeeResignation([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={employeeResignation}
            noData={!isLoading && employeeResignation.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: employeeResignationTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedEmployeeResignation.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default ResignationListTable