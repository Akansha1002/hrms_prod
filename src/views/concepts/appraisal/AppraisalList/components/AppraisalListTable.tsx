import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import useAppraisalList from '../hooks/useAppraisalList'
import type { OnSortParam, Row } from '@/components/shared/DataTable'
import type { AppraisalData } from '../types'

const statusColor: Record<string, string> = {
    Approved: 'bg-success-subtle text-success',
    Pending: 'bg-warning-subtle text-warning',
    'Pending Employee End': 'bg-error-subtle text-error',
}

const AppraisalListTable = () => {
    const {
        appraisalList = [],
        appraisalTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllAppraisals,
        setSelectedAppraisals,
        selectedAppraisals,
    } = useAppraisalList()

    const columns = useMemo(
        () => [
            {
                header: 'Appraisal ID',
                accessorKey: 'name',
            },
            {
                header: 'Employee',
                accessorKey: 'employee_name',
                cell: ({ row }: { row: Row<AppraisalData> }) => (
                    <Link
                        className="hover:underline font-semibold text-gray-900 dark:text-gray-100"
                        to={`/employee/details/${row.original.employee}`}
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
                header: 'Company',
                accessorKey: 'company',
            },
            {
                header: 'Appraisal Cycle',
                accessorKey: 'appraisal_cycle',
            },
            // {
            //     header: 'Status',
            //     accessorKey: 'status',
            //     cell: ({ row }: { row: Row<AppraisalData> }) => (
            //         <Tag className={statusColor[row.original.status] || ''}>
            //             {row.original.status}
            //         </Tag>
            //     ),
            // },
        ],
        [],
    )

    const handleSetTableData = (data: typeof tableData) => {
        setTableData(data)
        if (selectedAppraisals.length > 0) {
            setSelectAllAppraisals([])
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

    const handleRowSelect = (checked: boolean, row: AppraisalData) => {
        setSelectedAppraisals(checked, row)
    }

    const handleAllRowSelect = (
        checked: boolean,
        rows: Row<AppraisalData>[],
    ) => {
        if (checked) {
            const originals = rows.map((row) => row.original)
            setSelectAllAppraisals(originals)
        } else {
            setSelectAllAppraisals([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={appraisalList}
            noData={!isLoading && appraisalList.length === 0}
            loading={isLoading}
            skeletonAvatarColumns={[1]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            pagingData={{
                total: appraisalTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedAppraisals.some(
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

export default AppraisalListTable
