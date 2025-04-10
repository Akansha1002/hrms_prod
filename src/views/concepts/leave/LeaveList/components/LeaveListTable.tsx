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
import { LeaveTypeListData } from "../types"

type LeaveTableprops = {
    data: LeaveTypeListData[]
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

const columnHelper = createColumnHelper<LeaveTypeListData>()

const columns = [
    // columnHelper.accessor('leaveCode', {
    //     header: 'Leave Code',
    //     cell: (props) => {
    //         const { leaveCode } = props.row.original
    //         return <div className="heading-text font-semibold">{leaveCode}</div>
    //     },
    // }),
    columnHelper.accessor('leave_type_name', {
        header: 'Leave Name',
        cell: (props) => {
            const { leave_type_name } = props.row.original
            return <div className="heading-text font-semibold">{leave_type_name}</div>
        },
    }),
    // columnHelper.accessor('sex', {
    //     header: 'Sex',
    //     cell: (props) => {
    //         const { sex } = props.row.original
    //         return <div className="heading-text font-semibold">{sex}</div>
    //     },
    // }),
    // columnHelper.accessor('status', {
    //     header: 'Status',
    //     cell: (props) => {
    //         const { status } = props.row.original
    //         return <div className="heading-text font-semibold">{status}</div>
    //     },
    // }),

    //additional add 
    columnHelper.accessor('max_continuous_days_allowed', {
        header: 'Maximum Consecutive Leaves Allowed ',
        cell: (props) => {
            const { max_continuous_days_allowed } = props.row.original
            return <div className="heading-text font-semibold">{max_continuous_days_allowed}</div>
        },
    }),
    columnHelper.accessor('allow_encashment', {
        header: 'Encashable',
        cell: (props) => {
            const { allow_encashment } = props.row.original
            return <div className="heading-text font-semibold">
                {allow_encashment === 1 ? 'Yes' : 'No'}
            </div>
        },
    }),
    // columnHelper.accessor('truncation', {
    //     header: 'Truncation',
    //     cell: (props) => {
    //         const { truncation } = props.row.original
    //         return <div className="heading-text font-semibold">{truncation}</div>
    //     },
    // }),
    columnHelper.accessor('is_carry_forward', {
        header: 'Transfer',
        cell: (props) => {
            const { is_carry_forward } = props.row.original
            return <div className="heading-text font-semibold">
                {is_carry_forward === 1 ? 'Yes' : 'No'}
            </div>
        },
    }),
    {
        header: 'Action',
        id: 'action',
        cell: (props: CellContext<LeaveTypeListData, unknown>) => (
            <ActionColumn
            />
        ),
    },
]

const LeaveListTable = ({ data = [] }: LeaveTableprops) => {
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

export default LeaveListTable