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
import { useState } from "react";
import Button from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { TrainingDetailsTableData } from "../types";
import { Controller, useWatch } from "react-hook-form";

type TrainingDetailsTableProps = {
    control: any;
    fields: { id: string }[];
    append: (value: TrainingDetailsTableData) => void;
    remove: (index: number) => void;
    // data: TrainingDetailsTableData[];
    trainingNameList: { value: string; label: string; end_time: string }[];
    isLoading: boolean;
    // setData: React.Dispatch<React.SetStateAction<TrainingDetailsTableData[]>>
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

const TrainingDetailsTable = ({ control, fields, append, remove, trainingNameList, isLoading }: TrainingDetailsTableProps) => {
    // const [data, setData] = useState<TrainingDetailsTableData[]>(initialData);

    // const handleAddRow = () => {
    //     setData([
    //         ...data,
    //         {
    //             training: "",
    //             training_date: "",
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
        name: "trainings",
    });

    const { Tr, Td, TBody, THead, Th } = Table;

    const columnHelper = createColumnHelper<TrainingDetailsTableData>();

    const columns = [
        {
            header: "No.",
            cell: (props: any) => <div className="heading-text font-semibold">{props.row.index + 1}</div>,
        },
        columnHelper.accessor("training", {
            header: "Training",
            cell: (props) => {
                const index = props.row.index;
                return (
                    <Controller
                        control={control}
                        name={`trainings.${index}.training`}
                        render={({ field }) => (
                            <select
                                className="w-full px-2 py-1 border rounded"
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                <option value="" disabled>
                                    {isLoading ? "Loading..." : "Select Training"}
                                </option>
                                {trainingNameList.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    // <Select
                    //     options={
                    //         isLoading
                    //             ? [{ value: "", label: "Loading..." }]
                    //             : trainingNameList
                    //         // .map(({ value, label }) => ({ value, label }))
                    //     }
                    //     value={
                    //         trainingNameList.find(
                    //             (option) =>
                    //                 option.value === data[index].training
                    //         ) || null
                    //     }
                    //     onChange={(option) => {
                    //         const updated = [...data];
                    //         updated[index].training = option?.value || "";
                    //         setData(updated);
                    //     }}
                    //     placeholder="Training">
                    // </Select>
                )
            }
        }),
        columnHelper.accessor("training_date", {
            header: "Training Date",
            cell: (props) => {
                const index = props.row.index;
                const selected = watchedFields[index].training;
                const match = trainingNameList.find((item) => item.value === selected)
                const endTime = match?.end_time?.split(" ")[0] || "";
                return (
                    <Controller
                        control={control}
                        name={`trainings.${index}.training_date`}
                        render={({ field }) => (
                            <Input
                                type="date"
                                {...field}
                                placeholder="Training Date"
                                value={endTime}
                                onChange={(e) => field.onChange(e.target.value)}
                            // value={props.row.original.training_date}
                            // onChange={(e) => {
                            //     const updated = [...data];
                            //     updated[index].training_date = e.target.value;
                            //     // updated[index].training_date = new Date().toISOString().split("T")[0];
                            //     setData(updated);
                            // }}
                            />
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
        // data: fields,              
        data: watchedFields || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Card>
            <h6>Trainings</h6>
            <p>Trainings</p>
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
                <Button type="button" onClick={() => append({ training: "", training_date: "" })}>Add Row</Button>
            </div>
        </Card>
    )
}

export default TrainingDetailsTable