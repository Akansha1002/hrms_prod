import { useMemo } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'
import type { OnSortParam, ColumnDef, Row } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'
import { EmployeeSkillMapData } from '../types'
import useEmployeeSkillMap from '../hooks/useEmployeeSkillMap'

const EmployeeColumn = ({ row }: { row: EmployeeSkillMapData }) => {
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

const EmployeeSkillMapListTable = () => {
    const {
        employeeSkillMap = [],
        employeeSkillMapTotal,
        tableData,
        isLoading,
        setTableData,
        setSelectAllEmployeeSkillMap,
        setSelectedEmployeeSkillMap,
        selectedEmployeeSkillMap,
    } = useEmployeeSkillMap()

    const columns: ColumnDef<EmployeeSkillMapData>[] = useMemo(
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
        if (selectedEmployeeSkillMap.length > 0) {
            setSelectAllEmployeeSkillMap([])
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

    const handleRowSelect = (checked: boolean, row: EmployeeSkillMapData) => {
        setSelectedEmployeeSkillMap(checked, row)
    }

    const handleAllRowSelect = (checked: boolean, rows: Row<EmployeeSkillMapData>[]) => {
        if (checked) {
            const originalRows = rows.map((row) => row.original)
            setSelectAllEmployeeSkillMap(originalRows)
        } else {
            setSelectAllEmployeeSkillMap([])
        }
    }

    return (
        <DataTable
            selectable
            columns={columns}
            data={employeeSkillMap}
            noData={!isLoading && employeeSkillMap.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={isLoading}
            pagingData={{
                total: employeeSkillMapTotal,
                pageIndex: tableData.pageIndex as number,
                pageSize: tableData.pageSize as number,
            }}
            checkboxChecked={(row) =>
                selectedEmployeeSkillMap.some((selected) => selected.id === row.id)
            }
            onPaginationChange={handlePaginationChange}
            onSelectChange={handleSelectChange}
            onSort={handleSort}
            onCheckBoxChange={handleRowSelect}
            onIndeterminateCheckBoxChange={handleAllRowSelect}
        />
    )
}

export default EmployeeSkillMapListTable