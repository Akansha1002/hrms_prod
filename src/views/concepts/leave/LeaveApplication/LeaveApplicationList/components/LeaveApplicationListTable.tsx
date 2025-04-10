import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import useLeaveApplicationList from '../hooks/useLeaveApplicationListStore'
import { LeaveApplicationData } from '../types'

const EmployeeColumn = ({ row }: { row: LeaveApplicationData }) => {
    return (
        <>
            <Link
                className={`hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/leave/leave-application/${row.name}`}
            >
                {row.employee_name}
            </Link>
        </>
    )
}

const statusColor: Record<string, string> = {
    Approved: 'bg-success-subtle text-success',
    Cancelled: 'bg-error-subtle text-error',
    pending: 'bg-warning-subtle text-warning',
}

const LeaveApplicationListTable = () => {
    const {
        leaveApplicationList,
        leaveApplicationListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllLeaveApplication,
        setSelectedLeaveApplication,
        selectedLeaveApplication,
    } = useLeaveApplicationList()

    const columns: ColumnDef<LeaveApplicationData>[] = useMemo(
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
                header: 'From Date',
                accessorKey: 'from_date',

            },
            {
                header: 'Total Leave Days',
                accessorKey: 'total_leave_days',

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
        if (selectedLeaveApplication.length > 0) {
            setSelectAllLeaveApplication([])
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

    const handleRowSelect = (checked: boolean, row: LeaveApplicationData) => {
        setSelectedLeaveApplication(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<LeaveApplicationData>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllLeaveApplication(originalRows)
        } else {
            setSelectAllLeaveApplication([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={leaveApplicationList}
            noData={!isLoading && leaveApplicationList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: leaveApplicationListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedLeaveApplication.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default LeaveApplicationListTable

