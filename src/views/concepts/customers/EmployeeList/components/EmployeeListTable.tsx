import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import useEmployeeList from '../hooks/useEmployeeList'
import { Employee } from '../types'

const statusColor: Record<string, string> = {
    Approved: 'bg-success-subtle text-success',
    Pending: 'bg-error-subtle text-error',
    'Pending Employee End': 'bg-warning-subtle text-warning',
    'Verification from HR Manager': 'bg-primary-subtle text-primary',
}

const EmployeeColumn = ({ row }: { row: Employee }) => {
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

const EmployeeListTable = () => {
    const {
        employeeList = [],
        employeeListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllEmployee,
        setSelectedEmployee,
        selectedEmployee,
    } = useEmployeeList()

    const columns: ColumnDef<Employee>[] = useMemo(
        () => [
            {
                header: 'Full Name',
                accessorKey: 'employee_name',
                cell: (props) => {
                    const row = props.row.original
                    return <EmployeeColumn row={row} />
                },
            },
            {
                header: 'Status',
                accessorKey: 'employee_onboarding_status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag
                                className={
                                    statusColor[row.employee_onboarding_status]
                                }
                            >
                                <span className="capitalize">
                                    {row.employee_onboarding_status}
                                </span>
                            </Tag>
                        </div>
                    )
                },
            },
            {
                header: 'Designation',
                accessorKey: 'designation',
            },
            {
                header: 'ID',
                accessorKey: 'employee',
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedEmployee.length > 0) {
            setSelectAllEmployee([])
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

    const handleRowSelect = (checked: boolean, row: Employee) => {
        setSelectedEmployee(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<Employee>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllEmployee(originalRows)
        } else {
            setSelectAllEmployee([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={employeeList}
            noData={!isLoading && employeeList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: employeeListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedEmployee.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default EmployeeListTable
