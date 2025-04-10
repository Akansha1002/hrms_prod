import { Card } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Input from '@/components/ui/Input'
import { TbTrash } from 'react-icons/tb'
import Tooltip from '@/components/ui/Tooltip'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { ExemptionProofsField } from "../types";
import { useState } from "react";
import Button from '@/components/ui/Button'
import Select, { Option as DefaultOption } from '@/components/ui/Select'
import { Upload } from "@/components/ui/Upload";

type ExemptionProofsProps = {
    data: ExemptionProofsField[];
    subCategoryList: { value: string; label: string, category: string, max_amount: string }[];
    isLoading: boolean;
}

const ActionColumn = ({
    onDelete,
}: {
    onDelete: () => void
}) => {
    return (
        <Tooltip title="Delete">
            <div
                className={`text-xl cursor-pointer select-none font-semibold`}
                role="button"
                onClick={onDelete}
            >
                <TbTrash />
            </div>
        </Tooltip>
    )
}

const ExemptionProofs = ({ data: initialData = [], isLoading, subCategoryList: subCategoryList }: ExemptionProofsProps) => {
    const [data, setData] = useState<ExemptionProofsField[]>(initialData);

    const handleAddRow = () => {
        setData([
            ...data,
            {
                no: (data.length + 1).toString(),
                exemption_sub_category: "",
                exemption_category: "",
                max_amount: "",
                amount: "",
                type_of_proof: "",
                attach_proof: ""
            }
        ])
    }

    const handleDeleteRow = (index: number) => {
        const updated = [...data];
        updated.splice(index, 1);
        setData(updated);
    };

    const handleSubCategoryChange = (index: number, value: string, field: keyof ExemptionProofsField) => {
        const updated = [...data];
        updated[index][field] = value;
        if (field === "exemption_sub_category") {
            const matched = subCategoryList.find(item => item.value === value);
            updated[index].exemption_category = matched?.category || "";
            updated[index].max_amount = matched?.max_amount || "";
        }
        setData(updated);
    };

    const handleFileChange = (index: number, files: File[]) => {
        const updated = [...data];
        const file = files?.[0];
        updated[index].attach_proof = file ? file.name : "";
        setData(updated);
    };

    const { Tr, Td, TBody, THead, Th } = Table;

    const columnHelper = createColumnHelper<ExemptionProofsField>();

    const columns = [
        columnHelper.accessor("no", {
            header: "No.",
            cell: (props) => <div className="heading-text font-semibold">{props.row.index + 1}</div>,
        }),
        columnHelper.accessor("exemption_sub_category", {
            header: "Exemption Sub Category",
            cell: (props) => {
                const index = props.row.index;
                console.log("index", data[index])
                return (
                    <Select
                        options={
                            isLoading
                                ? [{ value: "", label: "Loading..." }]
                                : subCategoryList.map(({ value, label }) => ({ value, label }))
                        }
                        value={
                            subCategoryList.find(
                                (option) =>
                                    option.value === data[index].exemption_sub_category
                            ) || null
                        }
                        onChange={(option) => handleSubCategoryChange(index, option?.value || "", "exemption_sub_category")}
                        placeholder="Sub Category">
                    </Select>
                )
            }
        }),
        columnHelper.accessor("exemption_category", {
            header: "Exemption Category",
            cell: (props) => {
                return (
                    <Input
                        placeholder="Exemption Category"
                        type="text"
                        value={props.row.original.exemption_category}
                        readOnly
                    />
                );
            }
        }),
        columnHelper.accessor("max_amount", {
            header: "Maximum Exempted Amount",
            cell: (props) => {
                return (
                    <Input
                        placeholder="Maximum Exempted Amount"
                        type="text"
                        value={props.row.original.max_amount}
                        readOnly
                    />
                );
            }
        }),
        columnHelper.accessor("amount", {
            header: "Actual Amount",
            cell: (props) => {
                const [actualAmount, setActualAmount] = useState(props.row.original.amount);
                return (
                    <div>
                        <Input
                            placeholder="Actual Amount"
                            type="text"
                            value={actualAmount}
                            onChange={(e) => setActualAmount(e.target.value)}
                        />
                    </div>
                );
            },
        }),
        columnHelper.accessor("type_of_proof", {
            header: "Type of Proof",
            cell: (props) => {
                const [proofType, setProofType] = useState(props.row.original.type_of_proof);
                return (
                    <div>
                        <Input
                            placeholder="Type of Proof"
                            type="text"
                            value={proofType}
                            onChange={(e) => setProofType(e.target.value)}
                        />
                    </div>
                );
            }
        }),
        columnHelper.accessor("attach_proof", {
            header: "Attach Proof",
            cell: (props) => {
                const index = props.row.index;
                console.log("index", data[index])
                return (
                    <div>
                        <Upload
                            multiple={false}
                            showList={false}
                            onChange={(files) => handleFileChange(index, files)}
                        >
                            <span className="text-blue-600 cursor-pointer">Attach</span>
                        </Upload>
                        {data[index].attach_proof && (
                            <div className="text-sm text-gray-600 mt-1">
                                {data[index].attach_proof}
                            </div>
                        )}
                    </div>
                )
            }
        }),
        columnHelper.display({
            id: "actions",
            header: "",
            cell: (props) => (
                <ActionColumn
                    onDelete={() => handleDeleteRow(props.row.index)}
                />
            ),
        }),
    ];

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card>
            <h6>Tax Exemption Proofs</h6>
            <div className="max-h-[300px] overflow-auto border rounded-xl">
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
                        {data.length === 0 ? (
                            <Tr>
                                <Td colSpan={columns.length} className="text-center py-12 text-gray-400 text-lg">
                                    No data
                                </Td>
                            </Tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Td key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </Td>
                                    ))}
                                </Tr>
                            ))
                        )}
                    </TBody>
                </Table>
            </div>
            <div className="p-4 flex justify-start">
                <Button onClick={handleAddRow}>Add Row</Button>
            </div>
        </Card>
    )
}

export default ExemptionProofs