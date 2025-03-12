import { Card } from "@/components/ui/Card"
import Table from '@/components/ui/Table'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    CellContext,
} from '@tanstack/react-table'
import { OnboardingData } from "./types"
import { Badge } from "@/components/ui/Badge"
import Tooltip from '@/components/ui/Tooltip'
import { TbPencil } from 'react-icons/tb'
import { useNavigate } from "react-router-dom"

type OnboardingTableProps = {
    data: OnboardingData[]
}

const { Tr, Td, TBody, THead, Th } = Table

const statusMap: Record<string, number> = {
    "Completed": 0,
    "Pending": 1,
    "Not Mandatory": 2,
}

const formStatusColor: Record<
    number,
    {
        label: string
        dotClass: string
        textClass: string
    }
> = {
    0: {
        label: 'Completed',
        dotClass: 'bg-emerald-500',
        textClass: 'text-emerald-500',
    },
    1: {
        label: 'Pending',
        dotClass: 'bg-amber-500',
        textClass: 'text-amber-500',
    },
    // 2: {
    //     label: 'Not Mandatory',
    //     dotClass: 'bg-red-500',
    //     textClass: 'text-red-500'
    // },
}

const ActionColumn = ({ formName }: {
    formName: string
}) => {
    const navigate = useNavigate();

    const handleEdit = () => {
        const formattedPath = formName.toLowerCase().replace(/\s+/g, "-");
        navigate(`/concepts/customers/${formattedPath}`);
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

const columnHelper = createColumnHelper<OnboardingData>()

const columns = [
    columnHelper.accessor('formName', {
        header: 'Form Name',
        cell: (props) => {
            const { formName } = props.row.original
            return <div className="heading-text font-semibold">{formName}</div>
        },
    }),
    columnHelper.accessor('status', {
        header: 'Status',
        cell: (props) => {
            // const { status } = (props.row.original)
            const statusStr = props.row.original.status;
            const status = statusMap[statusStr] ?? null;

            if (status === null || !(status in formStatusColor)) {
                return <span className="text-gray-500">Unknown Status</span>;
            }

            return (
                <div className="flex items-center">
                    <Badge className={formStatusColor[status].dotClass} />
                    <span
                        className={`ml-2 rtl:mr-2 capitalize font-semibold ${formStatusColor[status].textClass}`}
                    >
                        {formStatusColor[status].label}
                    </span>
                </div>
            )
        },
    }),
    {
        header: 'Action',
        id: 'action',
        cell: (props: CellContext<OnboardingData, unknown>) => (
            <ActionColumn
                formName={props.row.original.formName}
            />
        ),
    },
]
const OnboardingForm = ({ data = [] }: OnboardingTableProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card>
            <h4 className="mb-6">Employee On Boarding</h4>
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

export default OnboardingForm