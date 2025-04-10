import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import { ProofSubmissionListData } from '../types'
import useProofSubmissionList from '../hooks/useProofSubmissionList'

const EmployeeColumn = ({ row }: { row: ProofSubmissionListData }) => {
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
}

const ProofSubmissionListTable = () => {
    const {
        proofSubmissionList,
        proofSubmissionListTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllProofSubmission,
        setSelectedProofSubmission,
        selectedProofSubmission,
    } = useProofSubmissionList()

    const columns: ColumnDef<ProofSubmissionListData>[] = useMemo(
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
                header: 'Employee',
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedProofSubmission.length > 0) {
            setSelectAllProofSubmission([])
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

    const handleRowSelect = (checked: boolean, row: ProofSubmissionListData) => {
        setSelectedProofSubmission(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<ProofSubmissionListData>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllProofSubmission(originalRows)
        } else {
            setSelectAllProofSubmission([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={proofSubmissionList}
            noData={!isLoading && proofSubmissionList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: proofSubmissionListTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedProofSubmission.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default ProofSubmissionListTable