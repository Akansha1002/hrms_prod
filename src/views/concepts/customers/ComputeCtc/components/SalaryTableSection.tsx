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
import { SalaryStructureComponents, SalaryStructureDetails } from "../types";

// Define the type for the table data
type SalaryTableProps = {
    data: SalaryStructureComponents[];
};

const { Tr, Td, TBody, THead, Th } = Table;

const columnHelper = createColumnHelper<SalaryStructureComponents>();

const columns = [
    columnHelper.accessor("id", {
        header: "#",
        cell: (props) => <div className="heading-text font-semibold">{props.row.index + 1}</div>,
    }),
    columnHelper.accessor("salary_component", {
        header: "Component",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.salary_component}</div>,
    }),
    columnHelper.accessor("previous_employer", {
        header: "Previous Employer",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.previous_employer}</div>,
    }),
    columnHelper.accessor("payroll_frequency", {
        header: "Period",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.payroll_frequency}</div>,
    }),
    columnHelper.accessor("amount_based_on_formula", {
        header: "Proposed Salary",
        cell: (props) => {
            const [salary, setSalary] = useState(props.row.original.amount_based_on_formula);
            return (
                // <input
                //     className="heading-text font-semibold border border-gray-300 px-2 py-1 rounded"
                // />
                <div>
                    <Input
                        placeholder="0.00"
                        type="text"
                        value={salary}
                        // onChange={(e) => setSalary(e.target.value)}
                    />
                </div>
            );
        },
    }),
    columnHelper.accessor("increased_amount", {
        header: "Increased Amount",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.increased_amount}</div>,
    }),
    columnHelper.accessor("currency", {
        header: "Currency",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.currency}</div>,
    }),
    columnHelper.accessor("exchange_rate", {
        header: "Exchange Rate",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.exchange_rate}</div>,
    }),
    columnHelper.accessor("monthly_amount", {
        header: "Monthly Amount",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.monthly_amount}</div>,
    }),
    columnHelper.accessor("base_currency", {
        header: "Base Currency",
        cell: (props) => <div className="heading-text font-semibold">{props.row.original.base_currency}</div>,
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
