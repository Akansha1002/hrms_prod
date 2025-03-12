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
import { SalaryData } from "../types";

// Define the type for the table data
type SalaryTableProps = {
    data: SalaryData[];
};

const { Tr, Td, TBody, THead, Th } = Table;

const columnHelper = createColumnHelper<SalaryData>();

const columns = [
    columnHelper.accessor("id", {
        header: "#",
        cell: (props) => <div className="heading-text font-semibold">{props.row.index + 1}</div>,
    }),
    columnHelper.accessor("component", {
        header: "Component",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.component}</div>,
    }),
    columnHelper.accessor("previousEmployer", {
        header: "Previous Employer",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.previousEmployer}</div>,
    }),
    columnHelper.accessor("period", {
        header: "Period",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.period}</div>,
    }),
    columnHelper.accessor("proposedSalary", {
        header: "Proposed Salary",
        cell: (props) => {
            const [salary, setSalary] = useState(props.row.original.proposedSalary);
            return (
                // <input
                //     className="heading-text font-semibold border border-gray-300 px-2 py-1 rounded"
                // />
                <div>
                    <Input
                        placeholder="0.00"
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                    />
                </div>
            );
        },
    }),
    columnHelper.accessor("increasedAmount", {
        header: "Increased Amount",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.increasedAmount}</div>,
    }),
    columnHelper.accessor("currency", {
        header: "Currency",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.currency}</div>,
    }),
    columnHelper.accessor("exchangeRate", {
        header: "Exchange Rate",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.exchangeRate}</div>,
    }),
    columnHelper.accessor("monthlyAmount", {
        header: "Monthly Amount",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.monthlyAmount}</div>,
    }),
    columnHelper.accessor("baseCurrency", {
        header: "Base Currency",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.baseCurrency}</div>,
    }),
];

const SalaryTable = ({ data = [] }: SalaryTableProps) => {
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
    );
};

export default SalaryTable;
