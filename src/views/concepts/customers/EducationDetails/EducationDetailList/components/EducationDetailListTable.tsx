import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import { EducationDetail } from '../types'
import useEducationDetailList from '../hooks/useEducationDetailList'
import Tooltip from '@/components/ui/Tooltip'
import { TbPencil } from 'react-icons/tb'

const DetailColumn = ({ row }: { row: EducationDetail }) => {
    return (
        <>
            <Link
                className={`hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/customers/education-details/create/${row.name}`}
            >
                {row.name_of_establishment}
            </Link>
        </>
    )
}

const ActionColumn = ({ row }: { row: EducationDetail }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/concepts/customers/education-details/edit/${row.name}`);
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

const EducationDetailListTable = () => {
    const {
        educationDetailList,
        tableData,
        isLoading,
        setTableData,
        setSelectAllEducationDetail,
        setSelectedEducationDetail,
        selectedEducationDetail,
    } = useEducationDetailList()

    const columns: ColumnDef<EducationDetail>[] = useMemo(
        () => [
            {
                header: 'Name Of Establishment',
                accessorKey: 'name_of_establishment',
                cell: (props) => {
                    const row = props.row.original
                    return <DetailColumn row={row} />
                }
            },
            {
                header: 'Passing Year',
                accessorKey: 'passing_year',
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
        if (selectedEducationDetail.length > 0) {
            setSelectAllEducationDetail([])
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

    const handleRowSelect = (checked: boolean, row: EducationDetail) => {
        setSelectedEducationDetail(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<EducationDetail>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllEducationDetail(originalRows)
        } else {
            setSelectAllEducationDetail([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={educationDetailList}
            noData={!isLoading && educationDetailList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            checkboxChecked={(row) =>
                selectedEducationDetail.some((selected) => selected.id === row.id)
            }
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default EducationDetailListTable