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
import { HolidayTableData } from "../types"
import { useState } from "react"
import HolidayEditDrawer from "./HolidayEditDrawer"
import dayjs from "dayjs"

type LeaveTableprops = {
    data: HolidayTableData[]
}

const { Tr, Td, TBody, THead, Th } = Table

const ActionColumn = () => {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [selectedData, setSelectedData] = useState(null);

    const handleEditClick = () => {
        setSelectedData({
            holidayReason: '',
            holidayDescription: '',
            holidayDate: dayjs().format(),
            status: 'active',
            compensationDate: '',
        });
     setDrawerOpen(true);   
    };

    return (
        <>
            <div className="flex items-center gap-3">
                <Tooltip title="Edit">
                    <div
                        className={`text-xl cursor-pointer select-none font-semibold`}
                        role="button"
                        onClick={handleEditClick}
                    >
                        <TbPencil />
                    </div>
                </Tooltip>
            </div>
            <HolidayEditDrawer
                open={drawerOpen}
                selected={selectedData}
                onDrawerOpen={setDrawerOpen}
                submit={() => {
                    setDrawerOpen(false);
                }}
            />
        </>
    )
}

const columnHelper = createColumnHelper<HolidayTableData>()

const columns = [
    columnHelper.accessor('date', {
        header: 'Holiday Date',
        cell: (props) => {
            const { date } = props.row.original
            return <div className="heading-text font-semibold">{date}</div>
        },
    }),
    columnHelper.accessor('description', {
        header: 'Holiday Description',
        cell: (props) => {
            const { description } = props.row.original
            return <div className="heading-text font-semibold">{description}</div>
        },
    }),
    columnHelper.accessor('reason', {
        header: 'Holiday Reason',
        cell: (props) => {
            const { reason } = props.row.original
            return <div className="heading-text font-semibold">{reason}</div>
        },
    }),
    {
        header: 'Action',
        id: 'action',
        cell: (props: CellContext<HolidayTableData, unknown>) => (
            <ActionColumn
            />
        ),
    },
]

const HolidayTable = ({ data = [] }: LeaveTableprops) => {
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

export default HolidayTable