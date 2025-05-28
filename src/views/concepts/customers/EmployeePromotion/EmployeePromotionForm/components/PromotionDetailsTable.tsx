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
import { PromotionDetailsTableData } from "../types";
import { useState } from "react";
import Button from '@/components/ui/Button'
import { Controller, useWatch } from "react-hook-form";
import { property } from "lodash";

type PromotionDetailsTableProps = {
    control: any;
    fields: { id: string }[];
    append: (value: PromotionDetailsTableData) => void;
    remove: (index: number) => void;
    propertyListData: { value: string; label: string, current: string }[];
    employeeData: { value: string; label: string; name: string }[];
    isLoading: boolean;
    // data: PromotionDetailsTableData[];
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

const getOptions = (
    property: string,
    employeeData: { value: string; label: string; name: string }[],
): { value: string; label: string; }[] => {
    switch (property) {
        case 'Functional Manager':
        case 'Reporting Manager':
        case 'Peoples Manager':
        case 'Reports to':
        case 'Expense Approver':
        case 'Leave Approver':
            return employeeData.map(emp => ({ value: emp.value, label: emp.label }))
        default:
            return [];
    }
}

const PromotionDetailsTable = ({ control, fields, append, remove, propertyListData, employeeData, isLoading }: PromotionDetailsTableProps) => {
    // const [data, setData] = useState<PromotionDetailsTableData[]>(initialData);

    // const handleAddRow = () => {
    //     setData([
    //         ...data,
    //         {
    //             property: "",
    //             current: "",
    //             new: "",
    //         }
    //     ])
    // }

    // const handleDeleteRow = (index: number) => {
    //     const updated = [...data];
    //     updated.splice(index, 1);
    //     setData(updated);
    // }

    const watchedFields = useWatch({
        control,
        name: "promotion_details",
    })

    const { Tr, Td, TBody, THead, Th } = Table;

    const columnHelper = createColumnHelper<PromotionDetailsTableData>();

    const columns = [
        {
            header: "No.",
            cell: (props: any) => <div className="heading-text font-semibold">{props.row.index + 1}</div>,
        },
        columnHelper.accessor("property", {
            header: "Property",
            cell: (props) => {
                const index = props.row.index;
                return (
                    <Controller
                        control={control}
                        name={`promotion_details.${index}.property`}
                        render={({ field }) => (
                            <select
                                className="w-full px-2 py-1 border rounded"
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                <option value="" disabled>
                                    {isLoading ? "Loading..." : "Select Property"}
                                </option>
                                {propertyListData.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            //     <Select
                            //         options={
                            //             isLoading
                            //                 ? [{ value: "", label: "Loading..." }]
                            //                 : subCategoryList.map(({ value, label }) => ({ value, label }))
                            //         }
                            //         value={
                            //             subCategoryList.find(
                            //                 (option) =>
                            //                     option.value === data[index].exemption_sub_category
                            //             ) || null
                            //         }
                            //         onChange={(option) => handleSubCategoryChange(index, option?.value || "", "exemption_sub_category")}
                            //         placeholder="Sub Category">
                            //     </Select>
                        )}
                    />
                )
            }
        }),
        columnHelper.accessor("current", {
            header: "Current",
            cell: (props) => {
                const index = props.row.index;
                const selected = watchedFields[index].property;
                const match = propertyListData.find((item) => item.value === selected);
                const currentValue = match ? match.current : '';
                return (
                    <Controller
                        control={control}
                        name={`promotion_details.${index}.current`}
                        render={({ field }) => (
                            <Input
                                type="text"
                                value={currentValue}
                                readOnly
                                placeholder="Current"
                            />
                        )}
                    />
                );
            }
        }),
        columnHelper.accessor("new", {
            header: "New",
            cell: (props) => {
                const index = props.row.index;
                const selectedProperty = watchedFields[index].property || "";
                console.log("selectedProperty", selectedProperty)
                const options = getOptions(
                    selectedProperty,
                    employeeData,
                )
                console.log("options", options)
                return (
                    <Controller
                        control={control}
                        name={`promotion_details.${index}.new`}
                        render={({ field }) => (
                            <select
                                className="w-full px-2 py-1 border rounded"
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                                disabled={!selectedProperty}
                            >
                                <option value="" disabled>
                                    {selectedProperty ? "Select option" : ""}
                                </option>
                                {options.length > 0 ? (
                                    options.map((opt) => (
                                        <option key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>
                                        No options available
                                    </option>
                                )}
                            </select>
                        )}
                    />
                );
            }
        }),
        columnHelper.display({
            id: "actions",
            header: "",
            cell: (props) => (
                <ActionColumn
                    onDelete={() => remove(props.row.index)}
                />
            ),
        }),
    ];

    const table = useReactTable({
        data: watchedFields || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card>
            <h6>Employee Promotion Details</h6>
            <p>Set the properties that should be updated in the Employee master on promotion submission</p>
            <div className="max-h-[300px] mt-6 overflow-auto border rounded-xl">
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
                        {fields.length === 0 ? (
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
                <Button type="button" onClick={() => append({ property: "", current: "", new: "" })}>Add Row</Button>
            </div>
        </Card>
    )
}

export default PromotionDetailsTable