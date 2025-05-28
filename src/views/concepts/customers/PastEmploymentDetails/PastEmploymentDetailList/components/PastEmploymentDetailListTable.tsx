import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import Tooltip from '@/components/ui/Tooltip'
import { TbPencil } from 'react-icons/tb'
import { PastEmploymentDetail } from '../types'
import usePastEmploymentDetailList from '../hooks/usePastEmploymentDetailList'

const DetailColumn = ({ row }: { row: PastEmploymentDetail }) => {
    return (
        <>
            <Link
                className={`hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/customers/past-employment-details/create/${row.name}`}
            >
                {row.company_name}
            </Link>
        </>
    )
}

const ActionColumn = ({ row }: { row: PastEmploymentDetail }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/concepts/customers/past-employment-details/edit/${row.name}`);
    };

    return (
        <div className="flex items-center gap-3">
            <Tooltip title="Edit">
                <div
                    className={`text-xl cursor-pointer select-none font-semibold`}
                    role="button"
                    onClick={handleEdit}
                >
                    <TbPencil />
                </div>
            </Tooltip>
        </div>
    )
}

const PastEmploymentDetailListTable = () => {
    const {
        pastEmploymentDetailList,
        tableData,
        isLoading,
        setTableData,
        setSelectAllPastEmploymentDetail,
        setSelectedPastEmploymentDetail,
        selectedPastEmploymentDetail,
    } = usePastEmploymentDetailList()

    const columns: ColumnDef<PastEmploymentDetail>[] = useMemo(
        () => [
            {
                header: 'Company Name',
                accessorKey: 'company_name',
                cell: (props) => {
                    const row = props.row.original
                    return <DetailColumn row={row} />
                }
            },
            {
                header: 'Job Title',
                accessorKey: 'job_title',
            },
            {
                header: 'Action',
                id: 'action',
                cell: (props) => {
                    const row = props.row.original
                    return <ActionColumn row={row} />
                }
            },
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [],
    )

    const handleSetTableData = (data: TableQueries) => {
        setTableData(data)
        if (selectedPastEmploymentDetail.length > 0) {
            setSelectAllPastEmploymentDetail([])
        }
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

    const handleRowSelect = (checked: boolean, row: PastEmploymentDetail) => {
        setSelectedPastEmploymentDetail(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<PastEmploymentDetail>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllPastEmploymentDetail(originalRows)
        } else {
            setSelectAllPastEmploymentDetail([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={pastEmploymentDetailList}
            noData={!isLoading && pastEmploymentDetailList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            checkboxChecked={(row) =>
                selectedPastEmploymentDetail.some((selected) => selected.id === row.id)
            }
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default PastEmploymentDetailListTable