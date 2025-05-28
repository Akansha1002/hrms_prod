import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link, useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import Tooltip from '@/components/ui/Tooltip'
import { TbPencil } from 'react-icons/tb'
import { FamilyDetail } from '../types'
import useFamilyDetailList from '../hooks/useFamilyDetailList'

const DetailColumn = ({ row }: { row: FamilyDetail }) => {
    return (
        <>
            <Link
                className={`hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/customers/family-details/create/${row.name}`}
            >
                {row.relationship}
            </Link>
        </>
    )
}

const ActionColumn = ({ row }: { row: FamilyDetail }) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/concepts/customers/family-details/edit/${row.name}`);
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

const FamilyDetailListTable = () => {
    const {
        familyDetailList,
        tableData,
        isLoading,
        setTableData,
        setSelectAllFamilyDetail,
        setSelectedFamilyDetail,
        selectedFamilyDetail,
    } = useFamilyDetailList()

    const columns: ColumnDef<FamilyDetail>[] = useMemo(
        () => [
            {
                header: 'Relationship',
                accessorKey: 'relationship',
                cell: (props) => {
                    const row = props.row.original
                    return <DetailColumn row={row} />
                }
            },
            {
                header: 'Name',
                accessorKey: 'relation_name',
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
        if (selectedFamilyDetail.length > 0) {
            setSelectAllFamilyDetail([])
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

    const handleRowSelect = (checked: boolean, row: FamilyDetail) => {
        setSelectedFamilyDetail(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<FamilyDetail>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllFamilyDetail(originalRows)
        } else {
            setSelectAllFamilyDetail([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={familyDetailList}
            noData={!isLoading && familyDetailList.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            checkboxChecked={(row) =>
                selectedFamilyDetail.some((selected) => selected.id === row.id)
            }
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default FamilyDetailListTable