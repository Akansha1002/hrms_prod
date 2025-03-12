import { Card } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Input from '@/components/ui/Input'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { AppraisalRatingField } from "../types";

type AppraisalRatingTableProps = {
    data: AppraisalRatingField[];
}

const { Tr, Td, TBody, THead, Th } = Table;

const columnHelper = createColumnHelper<AppraisalRatingField>();

const columns = [
    columnHelper.accessor("skills", {
        header: "Skills",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.skills}</div>,
    }),
    columnHelper.accessor("selfRating", {
        header: "Self Rating",
        cell: () => {
            return (
                <div>
                    <Input
                        textArea
                        type="text"
                    />
                </div>
            );
        }
    }),
    columnHelper.accessor("ratingComments", {
        header: "Rating Comments (Max 2000 Chars)",
        cell: () => {
            return (
                <div>
                    <Input
                        textArea
                        type="text"
                    />
                </div>
            );
        }
    }),
];
const AppraisalRatingTableSection = ({ data = [] }: AppraisalRatingTableProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });
    return (
        <Card>
            <Table>
                <THead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th
                                    key={header.id}
                                    colSpan={header.colSpan}
                                    style={{ width: `${header.getSize()}px` }}
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </THead>
                <TBody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </Card>
    )
}

export default AppraisalRatingTableSection