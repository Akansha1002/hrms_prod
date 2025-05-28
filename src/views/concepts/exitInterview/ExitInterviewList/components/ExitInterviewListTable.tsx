import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'

import type { TableQueries } from '@/@types/common'
import type { OnSortParam, Row } from '@/components/shared/DataTable'
import type { ExitInterviewData } from '../types'
import useExitInterviewList from '../hooks/useExitInterviewList'

const statusColor: Record<string, string> = {
    Approved: 'bg-success-subtle text-success',
    Pending: 'bg-warning-subtle text-warning',
    'Pending Employee End': 'bg-error-subtle text-error',
}

const ExitInterviewListTable = () => {
    const {
        exitInterviewList = [],
        exitInterviewTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllInterviews,
        setSelectedInterviews,
        selectedInterviews,
    } = useExitInterviewList()

    const columns = useMemo(
        () => [
            {
                header: 'ID',
                accessorKey: 'naming_series',
            },
            {
                header: 'Employee',
                accessorKey: 'employee_name',
                cell: ({ row }: { row: Row<ExitInterviewData> }) => (
                    <Link
                        className="hover:underline font-semibold text-gray-900 dark:text-gray-100"
                        to={`/employee/details/${row.original.name}`}
                    >
                        {row.original.employee_name}
                    </Link>
                ),
            },
            {
                header: 'Employee Code',
                accessorKey: 'employee',
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Company',
                accessorKey: 'company',
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: ({ row }: { row: Row<ExitInterviewData> }) => (
                    <Tag className={statusColor[row.original.status] || ''}>
                        {row.original.status}
                    </Tag>
                ),
            },
        ],
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedInterviews.length > 0) {
            setSelectAllInterviews([])
        }
    }

    const handlePaginationChange = (page: number) => {
        const newData = cloneDeep(tableData)
        newData.pageIndex = page
        handleSetTableData(newData)
    }

    const handleSelectChange = (value: number) => {
        const newData = cloneDeep(tableData)
        newData.pageSize = Number(value)
        newData.pageIndex = 1
        handleSetTableData(newData)
    }

    const handleSort = (sort: OnSortParam) => {
        const newData = cloneDeep(tableData)
        newData.sort = sort
        handleSetTableData(newData)
    }

    const handleRowSelect = (checked: boolean, row: ExitInterviewData) => {
        setSelectedInterviews(checked, row)
    }

    const handleAllRowSelect = (
        checked: boolean,
        rows: Row<ExitInterviewData>[],
    ) => {
        if (checked) {
            const originals = rows.map((row) => row.original)
            setSelectAllInterviews(originals)
        } else {
            setSelectAllInterviews([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={exitInterviewList}
            noData={!isLoading && exitInterviewList.length === 0}
            skeletonAvatarColumns={[1]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: exitInterviewTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedInterviews.some(
                    (selected) => selected.name === row.name,
                )
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default ExitInterviewListTable
