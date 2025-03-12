import { Card } from "@/components/ui/Card"
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    CellContext,
} from '@tanstack/react-table'
import { HolidayListTableData } from "../types"
import { Link } from "react-router-dom"

type LeaveTableprops = {
    data: HolidayListTableData[]
}

const { Tr, Td, TBody, THead, Th } = Table

const HolidayColumn = ({ row }: { row: HolidayListTableData }) => {
    return (
        <>
            <Link
                className={`hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100`}
                to={`/concepts/customers/holidayList/holiday/${row.id}`}
            >
                {row.id}
            </Link>
        </>
    )
}

const columnHelper = createColumnHelper<HolidayListTableData>()

const columns = [
    columnHelper.accessor('id', {
        header: 'ID',
        cell: (props) => {
            const row = props.row.original
            // return <div className="heading-text font-semibold">{id}</div>
            return <HolidayColumn row={row} />
        },
    }),
    columnHelper.accessor('from_date', {
        header: 'From Date',
        cell: (props) => {
            const { from_date } = props.row.original
            return <div className="heading-text font-semibold">{from_date}</div>
        },
    }),
    columnHelper.accessor('to_date', {
        header: 'To Date',
        cell: (props) => {
            const { to_date } = props.row.original
            return <div className="heading-text font-semibold">{to_date}</div>
        },
    }),
    columnHelper.accessor('total_holidays', {
        header: 'Total Holidays',
        cell: (props) => {
            const { total_holidays } = props.row.original
            return <div className="heading-text font-semibold">{total_holidays}</div>
        },
    }),
]

const HolidayListTable = ({ data = [] }: LeaveTableprops) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <Card>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        style={{
                                            width: `${header.getSize()}px`,
                                        }}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext(),
                                        )}
                                    </Th>
                                )
                            })}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => {
                        return (
                            <Tr key={row.id}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    )
}

export default HolidayListTable