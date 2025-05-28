import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import { PerformanceFeedbackListData } from '../types'
import usePerformanceFeedbackList from '../hooks/usePerformanceFeedbackList'

const EmployeeColumn = ({ row }: { row: PerformanceFeedbackListData }) => {
    return (
        <>
            <Link
                className={`hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/leave/leave-application/${row.employee_name}`}
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
    Submitted: 'bg-info-subtle text-info'
}

const PerformanceFeedbackListTable = () => {
    const {
        performanceFeedbackList,
        performanceFeedbackListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllPerformanceFeedback,
        setSelectedPerformanceFeedback,
        selectedPerformanceFeedback,
    } = usePerformanceFeedbackList()

    const columns: ColumnDef<PerformanceFeedbackListData>[] = useMemo(
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
                header: 'For Employee',
                accessorKey: 'employee',

            },
            {
                header: 'Reviewer Name',
                accessorKey: 'reviewer_name',

            },
            {
                header: 'Appraisal Cycle',
                accessorKey: 'appraisal_cycle',

            },
            {
                header: 'Total Score',
                accessorKey: 'total_score',

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
        if (selectedPerformanceFeedback.length > 0) {
            setSelectAllPerformanceFeedback([])
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

    const handleRowSelect = (checked: boolean, row: PerformanceFeedbackListData) => {
        setSelectedPerformanceFeedback(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<PerformanceFeedbackListData>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllPerformanceFeedback(originalRows)
        } else {
            setSelectAllPerformanceFeedback([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={performanceFeedbackList}
            noData={!isLoading && performanceFeedbackList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: performanceFeedbackListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedPerformanceFeedback.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default PerformanceFeedbackListTable