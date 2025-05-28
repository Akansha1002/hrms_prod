// import { Card } from "@/components/ui/Card";
// import Table from "@/components/ui/Table";
// import Input from '@/components/ui/Input'
// import { TbTrash } from 'react-icons/tb'
// import Tooltip from '@/components/ui/Tooltip'
// import {
//     useReactTable,
//     getCoreRowModel,
//     flexRender,
//     createColumnHelper,
// } from "@tanstack/react-table";
// import { ExemptionProofsField } from "../types";
// import { useState } from "react";
// import Button from '@/components/ui/Button'
// import Select, { Option as DefaultOption } from '@/components/ui/Select'
// import { Upload } from "@/components/ui/Upload";
// import { Controller, FieldArrayWithId } from "react-hook-form";

// type ExemptionProofsProps = {
//     data: ExemptionProofsField[];
//     control: any
//     fields: { id: string }[];
//     append: () => void
//     remove: (index: number) => void
//     subCategoryList: { value: string; label: string, category: string, max_amount: string }[];
//     isLoading: boolean;
// }

// const ActionColumn = ({
//     onDelete,
// }: {
//     onDelete: () => void
// }) => {
//     return (
//         <Tooltip title="Delete">
//             <div
//                 className={`text-xl cursor-pointer select-none font-semibold`}
//                 role="button"
//                 onClick={onDelete}
//             >
//                 <TbTrash />
//             </div>
//         </Tooltip>
//     )
// }

// const ExemptionProofs = ({ data: initialData = [], control, fields, append, remove, isLoading, subCategoryList: subCategoryList }: ExemptionProofsProps) => {
//     const [data, setData] = useState<ExemptionProofsField[]>(initialData);

//     const handleAddRow = () => {
//         setData([
//             ...data,
//             {
//                 exemption_sub_category: "",
//                 exemption_category: "",
//                 max_amount: "",
//                 amount: "",
//                 type_of_proof: "",
//                 attach_proof: ""
//             }
//         ])
//     }

//     const handleDeleteRow = (index: number) => {
//         const updated = [...data];
//         updated.splice(index, 1);
//         setData(updated);
//     };

//     const handleSubCategoryChange = (index: number, value: string, field: keyof ExemptionProofsField) => {
//         const updated = [...data];
//         updated[index][field] = value;
//         if (field === "exemption_sub_category") {
//             const matched = subCategoryList.find(item => item.value === value);
//             updated[index].exemption_category = matched?.category || "";
//             updated[index].max_amount = matched?.max_amount || "";
//         }
//         setData(updated);
//     };

//     const handleFileChange = (index: number, files: File[]) => {
//         const updated = [...data];
//         const file = files?.[0];
//         updated[index].attach_proof = file ? file.name : "";
//         setData(updated);
//     };

//     const { Tr, Td, TBody, THead, Th } = Table;

//     const columnHelper = createColumnHelper<ExemptionProofsField>();

//     const columns = [
//         {
//             header: "No.",
//             cell: (props: any) => <div className="heading-text font-semibold">{props.row.index + 1}</div>,
//         },
//         columnHelper.accessor("exemption_sub_category", {
//             header: "Exemption Sub Category",
//             cell: (props) => {
//                 const index = props.row.index;
//                 return (
//                     <Controller
//                         control={control}
//                         name={`tax_exemption_proofs.${index}.exemption_sub_category`}
//                         render={({ field }) => (
//                             <Select
//                                 options={
//                                     isLoading
//                                         ? [{ value: "", label: "Loading...", category: "", max_amount: "" }]
//                                         : subCategoryList
//                                     // .map(({ value, label }) => ({ value, label, category: "", max_amount: "" }))
//                                 }
//                                 value={
//                                     subCategoryList.find(
//                                         (option) =>
//                                             option.value === field.value
//                                     ) || null
//                                 }
//                                 // onChange={(option) => handleSubCategoryChange(index, option?.value || "", "exemption_sub_category")}
//                                 onChange={(option) => {
//                                     const selected = subCategoryList.find((i) => i.value === option?.value);
//                                     field.onChange(option?.value || "");
//                                     const categoryField = document.querySelector(
//                                         `input[name="exemption_proofs.${index}.exemption_category"]`
//                                     ) as HTMLInputElement;
//                                     const maxAmountField = document.querySelector(
//                                         `input[name="exemption_proofs.${index}.max_amount"]`
//                                     ) as HTMLInputElement;
//                                     if (categoryField) categoryField.value = selected?.category || "";
//                                     if (maxAmountField) maxAmountField.value = selected?.max_amount || "";
//                                 }}
//                                 placeholder="Sub Category">
//                             </Select>
//                         )}
//                     />
//                 )
//             }
//         }),
//         columnHelper.accessor("exemption_category", {
//             header: "Exemption Category",
//             cell: (props) => {
//                 const index = props.row.index;
//                 return (
//                     <Controller
//                         control={control}
//                         name={`tax_exemption_proofs.${index}.amount`}
//                         render={({ field }) => (
//                             <Input
//                                 placeholder="Exemption Category"
//                                 type="text"
//                                 readOnly
//                                 {...field}
//                             />
//                         )}
//                     />
//                 );
//             }
//         }),
//         columnHelper.accessor("max_amount", {
//             header: "Maximum Exempted Amount",
//             cell: (props) => {
//                 const index = props.row.index;
//                 return (
//                     <Controller
//                         control={control}
//                         name={`tax_exemption_proofs.${index}.max_amount`}
//                         render={({ field }) => (
//                             <Input
//                                 placeholder="Maximum Exempted Amount"
//                                 type="text"
//                                 readOnly
//                                 {...field}
//                             />
//                         )}
//                     />
//                 );
//             }
//         }),
//         columnHelper.accessor("amount", {
//             header: "Actual Amount",
//             cell: (props) => {
//                 const index = props.row.index;
//                 return (
//                     <Controller
//                         control={control}
//                         name={`tax_exemption_proofs.${index}.amount`}
//                         render={({ field }) => (
//                             <Input
//                                 placeholder="Actual Amount"
//                                 type="text"
//                                 {...field}
//                             />
//                         )}
//                     />
//                 );
//             },
//         }),
//         columnHelper.accessor("type_of_proof", {
//             header: "Type of Proof",
//             cell: (props) => {
//                 const index = props.row.index;
//                 return (
//                     <Controller
//                         control={control}
//                         name={`tax_exemption_proofs.${index}.type_of_proof`}
//                         render={({ field }) => (
//                             <Input
//                                 placeholder="Type of Proof"
//                                 type="text"
//                                 {...field}
//                             />
//                         )}
//                     />
//                 );
//             }
//         }),
//         columnHelper.accessor("attach_proof", {
//             header: "Attach Proof",
//             cell: (props) => {
//                 const index = props.row.index;
//                 return (
//                     <Controller
//                         control={control}
//                         name={`tax_exemption_proofs.${index}.attach_proof`}
//                         render={({ field }) => (
//                             <>
//                                 <Upload
//                                     multiple={false}
//                                     showList={false}
//                                     // onChange={(files) => handleFileChange(index, files)}
//                                     onChange={(files) => {
//                                         const file = files?.[0];
//                                         field.onChange(file?.name || "");
//                                     }}
//                                 >
//                                     <span className="text-blue-600 cursor-pointer">Attach</span>
//                                 </Upload>
//                                 {/* {data[index].attach_proof && (
//                                     <div className="text-sm text-gray-600 mt-1">
//                                         {data[index].attach_proof}
//                                     </div>
//                                 )} */}
//                                 {field.value && (
//                                     <div className="text-sm text-gray-600 mt-1">
//                                         {field.value}
//                                     </div>
//                                 )}
//                             </>
//                         )}
//                     />
//                 )
//             }
//         }),
//         columnHelper.display({
//             id: "actions",
//             header: "",
//             cell: (props) => (
//                 <ActionColumn
//                     onDelete={() => remove(props.row.index)}
//                 />
//             ),
//         }),
//     ];

//     const table = useReactTable({
//         data,
//         columns,
//         getCoreRowModel: getCoreRowModel(),
//     });

//     return (
//         <Card>
//             <h6>Tax Exemption Proofs</h6>
//             <div className="max-h-[300px] overflow-auto border rounded-xl">
//                 <Table>
//                     <THead>
//                         {table.getHeaderGroups().map((headerGroup) => (
//                             <Tr key={headerGroup.id}>
//                                 {headerGroup.headers.map((header) => (
//                                     <Th
//                                         key={header.id}
//                                         colSpan={header.colSpan}
//                                         style={{ width: `${header.getSize()}px` }}
//                                     >
//                                         {flexRender(
//                                             header.column.columnDef.header,
//                                             header.getContext()
//                                         )}
//                                     </Th>
//                                 ))}
//                             </Tr>
//                         ))}
//                     </THead>
//                     <TBody>
//                         {fields.length === 0 ? (
//                             <Tr>
//                                 <Td colSpan={columns.length} className="text-center py-12 text-gray-400 text-lg">
//                                     No data
//                                 </Td>
//                             </Tr>
//                         ) : (
//                             table.getRowModel().rows.map((row) => (
//                                 <Tr key={row.id}>
//                                     {row.getVisibleCells().map((cell) => (
//                                         <Td key={cell.id}>
//                                             {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                                         </Td>
//                                     ))}
//                                 </Tr>
//                             ))
//                         )}
//                     </TBody>
//                 </Table>
//             </div>
//             <div className="p-4 flex justify-start">
//                 <Button type="button" onClick={handleAddRow}>Add Row</Button>
//                 <Button type="button" onClick={() => append()}>
//                     Add Row
//                 </Button>
//             </div>
//         </Card>
//     )
// }

// export default ExemptionProofs



import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from "@tanstack/react-table";
import { Controller, Control, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/Card";
import Table from "@/components/ui/Table";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Upload } from "@/components/ui/Upload";
import Tooltip from "@/components/ui/Tooltip";
import Button from "@/components/ui/Button";
import { TbTrash } from "react-icons/tb";

type ExemptionProofsField = {
    exemption_sub_category: string;
    exemption_category: string;
    max_amount: string;
    amount: string;
    type_of_proof: string;
    attach_proof: string;
};

type Props = {
    control: Control<any>;
    fields: { id: string }[];
    append: () => void;
    remove: (index: number) => void;
    subCategoryList: {
        value: string;
        label: string;
        category: string;
        max_amount: string;
    }[];
    isLoading: boolean;
};

const ActionColumn = ({ onDelete }: { onDelete: () => void }) => (
    <Tooltip title="Delete">
        <div
            className="text-xl cursor-pointer select-none font-semibold"
            role="button"
            onClick={onDelete}
        >
            <TbTrash />
        </div>
    </Tooltip>
);

const ExemptionProofs = ({
    control,
    fields,
    append,
    remove,
    subCategoryList,
    isLoading,
}: Props) => {
    const { Tr, Td, TBody, THead, Th } = Table;
    const columnHelper = createColumnHelper<ExemptionProofsField>();

    const watchedFields = useWatch({
        control,
        name: "tax_exemption_proofs",
    });

    const columns = [
        {
            header: "No.",
            cell: (props: any) => (
                <div className="heading-text font-semibold">{props.row.index + 1}</div>
            ),
        },
        columnHelper.accessor("exemption_sub_category", {
            header: "Exemption Sub Category",
            cell: (props) => {
                const index = props.row.index;

                return (
                    <Controller
                        control={control}
                        name={`tax_exemption_proofs.${index}.exemption_sub_category`}
                        render={({ field }) => (
                            // <Select
                            //     options={
                            //         isLoading
                            //             ? [{ value: "", label: "Loading...", category: "", max_amount: "" }]
                            //             : subCategoryList
                            //     }
                            //     value={
                            //         subCategoryList.find((opt) => opt.value === field.value) || null
                            //     }
                            //     onChange={(option) => {
                            //         // const value = option?.value || "";
                            //         // const matched = subCategoryList.find((item) => item.value === value);
                            //         // field.onChange(value);

                            //         // // Set linked fields manually using DOM references
                            //         // const categoryInput = document.querySelector(
                            //         //     `input[name="exemption_proofs.${index}.exemption_category"]`
                            //         // ) as HTMLInputElement;
                            //         // const maxAmountInput = document.querySelector(
                            //         //     `input[name="exemption_proofs.${index}.max_amount"]`
                            //         // ) as HTMLInputElement;

                            //         // if (categoryInput) categoryInput.value = matched?.category || "";
                            //         // if (maxAmountInput) maxAmountInput.value = matched?.max_amount || "";

                            //         // const event = new Event("input", { bubbles: true });
                            //         // categoryInput?.dispatchEvent(event);
                            //         // maxAmountInput?.dispatchEvent(event);
                            //         field.onChange(option?.value || "");
                            //     }}
                            //     placeholder="Sub Category"
                            // />
                            <select
                                className="w-full px-2 py-1 border rounded"
                                value={field.value || ""}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                <option value="" disabled>
                                    {isLoading ? "Loading..." : "Select Sub Category"}
                                </option>
                                {subCategoryList.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                );
            },
        }),
        columnHelper.accessor("exemption_category", {
            header: "Exemption Category",
            cell: (props) => {
                const index = props.row.index;
                const selected = watchedFields?.[index]?.exemption_sub_category;
                const match = subCategoryList.find((i) => i.value === selected);
                return (
                    <Controller
                        control={control}
                        name={`tax_exemption_proofs.${index}.exemption_category`}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Category"
                                value={match?.category || ""}
                                readOnly
                            />
                        )}
                    />
                );
            },
        }),
        columnHelper.accessor("max_amount", {
            header: "Maximum Exempted Amount",
            cell: (props) => {
                const index = props.row.index;
                const selected = watchedFields?.[index]?.exemption_sub_category;
                const match = subCategoryList.find((i) => i.value === selected);
                return (
                    <Controller
                        control={control}
                        name={`tax_exemption_proofs.${index}.max_amount`}
                        render={({ field }) => (
                            <Input
                                {...field}
                                value={match?.max_amount || ""}
                                placeholder="Max Amount"
                                readOnly
                            />
                        )}
                    />
                );
            },
        }),
        columnHelper.accessor("amount", {
            header: "Actual Amount",
            cell: (props) => {
                const index = props.row.index;
                const selectedSub = watchedFields?.[index]?.exemption_sub_category;
                const match = subCategoryList.find((i) => i.value === selectedSub);
                const maxAmount = match?.max_amount ? parseFloat(match.max_amount) : Infinity;
                return (
                    <Controller
                        control={control}
                        name={`tax_exemption_proofs.${index}.amount`}
                        render={({ field }) => (
                            <Input {...field} placeholder="Amount" />
                        )}
                    />
                );
            },
        }),
        columnHelper.accessor("type_of_proof", {
            header: "Type of Proof",
            cell: (props) => {
                const index = props.row.index;
                return (
                    <Controller
                        control={control}
                        name={`tax_exemption_proofs.${index}.type_of_proof`}
                        render={({ field }) => (
                            <Input {...field} placeholder="Type of Proof" />
                        )}
                    />
                );
            },
        }),
        columnHelper.accessor("attach_proof", {
            header: "Attach Proof",
            cell: (props) => {
                const index = props.row.index;
                return (
                    <Controller
                        control={control}
                        name={`tax_exemption_proofs.${index}.attach_proof`}
                        render={({ field }) => (
                            <>
                                <Upload
                                    multiple={false}
                                    showList={false}
                                    onChange={(files) => {
                                        const file = files?.[0];
                                        field.onChange(file?.name || "");
                                    }}
                                >
                                    <span className="text-blue-600 cursor-pointer">Attach</span>
                                </Upload>
                                {field.value && (
                                    <div className="text-sm text-gray-600 mt-1">{field.value}</div>
                                )}
                            </>
                        )}
                    />
                );
            },
        }),
        columnHelper.display({
            id: "actions",
            header: "",
            cell: (props) => <ActionColumn onDelete={() => remove(props.row.index)} />,
        }),
    ];

    const table = useReactTable({
        data: fields,
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
                                    <Th key={header.id} colSpan={header.colSpan}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
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
                <Button type="button" onClick={() => append()}>
                    Add Row
                </Button>
            </div>
        </Card>
    );
};

export default ExemptionProofs;
