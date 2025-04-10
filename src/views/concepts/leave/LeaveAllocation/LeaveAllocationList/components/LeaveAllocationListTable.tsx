import { Card } from "@/components/ui/Card"
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    CellContext,
} from '@tanstack/react-table'
import Tooltip from '@/components/ui/Tooltip'
import { TbPencil } from 'react-icons/tb'
import { useNavigate } from "react-router-dom"
import { TableData } from "../types"

type LeaveTableprops = {
    data: TableData[]
}

const { Tr, Td, TBody, THead, Th } = Table

const ActionColumn = () => {
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/concepts/leave/leave-create`);
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

const columnHelper = createColumnHelper<TableData>()

const columns = [
    columnHelper.accessor('employeeName', {
        header: 'Employee Name',
        cell: (props) => {
            const { employeeName } = props.row.original
            return <div className="heading-text font-semibold">{employeeName}</div>
        },
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (props) => {
            const { status } = props.row.original
            return <div className="heading-text font-semibold">{status}</div>
        },
    }),
    columnHelper.accessor('employee', {
        header: 'Employee',
        cell: (props) => {
            const { employee } = props.row.original
            return <div className="heading-text font-semibold">{employee}</div>
        },
    }),
    columnHelper.accessor('leaveType', {
        header: 'Leave Type',
        cell: (props) => {
            const { leaveType } = props.row.original
            return <div className="heading-text font-semibold">{leaveType}</div>
        },
    }),
    columnHelper.accessor('id', {
        header: 'Id',
        cell: (props) => {
            const { id } = props.row.original
            return <div className="heading-text font-semibold">{id}</div>
        },
    }),
    {
        header: 'Action',
        id: 'action',
        cell: (props: CellContext<TableData, unknown>) => (
            <ActionColumn
            />
        ),
    },
]

const LeaveAllocationListTable = ({ data = [] }: LeaveTableprops) => {
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

export default LeaveAllocationListTable