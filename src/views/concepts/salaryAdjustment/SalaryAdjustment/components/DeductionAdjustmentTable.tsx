import { Card } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Input from '@/components/ui/Input'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
    CellContext,
} from "@tanstack/react-table";
import { useState } from "react";
import { DeductionAdjustment } from "../types";

type SalaryAdjustmentTableProps = {
    data: DeductionAdjustment[];
};

const { Tr, Td, TBody, THead, Th } = Table;

const columnHelper = createColumnHelper<DeductionAdjustment>();

const columns = [
    columnHelper.accessor("component", {
        header: "Component",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.component}</div>,
    }),
    columnHelper.accessor("amount", {
        header: "Amount",
        cell: (props) => {
            const [amount, setAmount] = useState(props.row.original.amount);
            return (
                <div>
                    <Input
                        placeholder="0.00"
                        type="text"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
            );
        },
    }),
    columnHelper.accessor("currency", {
        header: "Currency",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.currency}</div>,
    }),
    columnHelper.accessor("remarks", {
        header: "Remarks",
        cell: (props) => {

            return (
                <div>
                    <Input
                        type="text"
                    />
                </div>
            );
        },
    }),
];

const DeductionAdjustmentTable = ({ data = [] }: SalaryAdjustmentTableProps) => {
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

export default DeductionAdjustmentTable