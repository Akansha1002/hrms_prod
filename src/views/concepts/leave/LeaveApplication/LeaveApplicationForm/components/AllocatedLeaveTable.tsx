import { Card } from "@/components/ui/Card"
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    CellContext,
} from '@tanstack/react-table'
import { Link } from "react-router-dom"
import { AllocatedLeaveTableData } from "../types"

type AllocatedLeaveTableProps = {
    data: AllocatedLeaveTableData[]
}

const { Tr, Td, TBody, THead, Th } = Table

const columnHelper = createColumnHelper<AllocatedLeaveTableData>()

const columns = [
    columnHelper.accessor('leave_type', {
        header: 'Leave Type',
        cell: (props) => {
            const { leave_type } = props.row.original
            return <div className="heading-text font-semibold">{leave_type}</div>
        },
    }),
    columnHelper.accessor('total_leaves_allocated', {
        header: 'Total Allocated Leaves',
        cell: (props) => {
            const { total_leaves_allocated } = props.row.original
            return <div className="heading-text font-semibold">{total_leaves_allocated}</div>
        },
    }),
    columnHelper.accessor('expired', {
        header: 'Expired Leaves',
        cell: (props) => {
            const { expired } = props.row.original
            return <div className="heading-text font-semibold">{expired}</div>
        },
    }),
    columnHelper.accessor('used_leaves', {
        header: 'Used Leaves',
        cell: (props) => {
            const { used_leaves } = props.row.original
            return <div className="heading-text font-semibold">{used_leaves}</div>
        },
    }),
    columnHelper.accessor('leaves_pending_approval', {
        header: 'Leaves Pending Approval',
        cell: (props) => {
            const { leaves_pending_approval } = props.row.original
            return <div className="heading-text font-semibold">{leaves_pending_approval}</div>
        },
    }),
    columnHelper.accessor('available_leaves', {
        header: 'Available Leaves',
        cell: (props) => {
            const { available_leaves } = props.row.original
            return <div className="heading-text font-semibold">{available_leaves}</div>
        },
    }),
]


const AllocatedLeaveTable = ({ data = [] }: AllocatedLeaveTableProps) => {
    if (!data.length) {
        return (
            <Card>
                <h4 className="mb-6">Allocated Leaves</h4>
                <div className="text-muted text-base">
                    No leaves have been allocated.
                </div>
            </Card>
        )
    }
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <Card>
            <h4 className="mb-6">Allocated Leaves</h4>
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

export default AllocatedLeaveTable