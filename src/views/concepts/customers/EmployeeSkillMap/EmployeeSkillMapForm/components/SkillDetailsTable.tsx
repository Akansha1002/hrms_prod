import { Card } from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import { TbTrash } from 'react-icons/tb'
import Tooltip from '@/components/ui/Tooltip'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import { Select } from '@/components/ui/Select'
import { SkillDetailsTableData } from '../types'
import { Controller, useWatch } from 'react-hook-form'
import StarRating from '../../../../../../components/shared/StarRating'

type SkillDetailsTableProps = {
    control: any
    fields: { id: string }[]
    append: (value: SkillDetailsTableData) => void
    remove: (index: number) => void
    // data: SkillDetailsTableData[]
    skillNameList: { value: string; label: string }[]
    isLoading: boolean
}
const ActionColumn = ({ onDelete }: { onDelete: () => void }) => {
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

const SkillDetailsTable = ({
    control,
    fields,
    append,
    remove,
    skillNameList,
    isLoading,
}: SkillDetailsTableProps) => {
    // const [data, setData] = useState<SkillDetailsTableData[]>(initialData);

    // const handleAddRow = () => {
    //     setData([
    //         ...data,
    //         {
    //             skill: "",
    //             proficiency: "",
    //             evaluation_date: "",
    //         }
    //     ])
    // }

    const watchedFields = useWatch({
        control,
        name: 'employee_skills',
    })

    // const handleDeleteRow = (index: number) => {
    //     const updated = [...data];
    //     updated.splice(index, 1);
    //     setData(updated);
    // }

    const { Tr, Td, TBody, THead, Th } = Table

    const columnHelper = createColumnHelper<SkillDetailsTableData>()

    const columns = [
        {
            header: 'No.',
            cell: (props: any) => (
                <div className="heading-text font-semibold">
                    {props.row.index + 1}
                </div>
            ),
        },
        columnHelper.accessor('skill', {
            header: 'Skill',
            cell: (props) => {
                const index = props.row.index

                return (
                    <Controller
                        control={control}
                        name={`employee_skills.${index}.skill`}
                        render={({ field }) => (
                            <select
                                className="w-full px-2 py-1 border rounded"
                                value={field.value || ''}
                                onChange={(e) => field.onChange(e.target.value)}
                            >
                                <option value="" disabled>
                                    {isLoading ? 'Loading...' : 'Select Skills'}
                                </option>
                                {skillNameList.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                            // <Select
                            //     options={
                            //         isLoading
                            //             ? [{ value: "", label: "Loading..." }]
                            //             : skillNameList
                            //         // .map(({ value, label }) => ({ value, label }))
                            //     }
                            //     value={
                            //         skillNameList.find(
                            //             (option) =>
                            //                 option.value === data[index].skill
                            //         )
                            //     }
                            //     onChange={(option) => {
                            //         const updated = [...data];
                            //         updated[index].skill = option?.value || "";
                            //         setData(updated);
                            //     }}
                            //     placeholder="Skill">
                            // </Select>
                        )}
                    />
                )
            },
        }),
        columnHelper.accessor('proficiency', {
            header: 'Proficiency',
            cell: (props) => {
                const index = props.row.index
                return (
                    <Controller
                        control={control}
                        name={`employee_skills.${index}.proficiency`}
                        render={({ field }) => (
                            <StarRating
                                value={field.value}
                                onChange={field.onChange}
                            />
                            // <Input
                            //     type="text"
                            //     value={field.value || ''}
                            //     onChange={field.onChange}
                            // // value={props.row.original.proficiency}
                            // // onChange={(e) => {
                            // //     const updated = [...data];
                            // //     updated[index].proficiency = e.target.value;
                            // //     setData(updated);
                            // // }}
                            // />
                        )}
                    />
                )
            },
        }),
        columnHelper.accessor('evaluation_date', {
            header: 'Evaluation Date',
            cell: (props) => {
                const index = props.row.index
                return (
                    <Controller
                        control={control}
                        name={`employee_skills.${index}.evaluation_date`}
                        render={({ field }) => (
                            <Input
                                type="date"
                                value={field.value || ''}
                                onChange={field.onChange}
                                // value={props.row.original.evaluation_date}
                                // onChange={(e) => {
                                //     const updated = [...data];
                                //     updated[index].evaluation_date = e.target.value;
                                //     // updated[index].evaluation_date = new Date().toISOString().split("T")[0];
                                //     setData(updated);
                                // }}
                            />
                        )}
                    />
                )
            },
        }),
        columnHelper.display({
            id: 'actions',
            header: '',
            cell: (props) => (
                <ActionColumn onDelete={() => remove(props.row.index)} />
            ),
        }),
    ]

    const table = useReactTable({
        // data: fields,
        data: watchedFields || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card>
            <h6>Skills</h6>
            <p>Employee Skills</p>
            <div className="max-h-[300px] mt-6 overflow-auto border rounded-xl">
                <Table>
                    <THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
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
                                ))}
                            </Tr>
                        ))}
                    </THead>
                    <TBody>
                        {fields.length === 0 ? (
                            <Tr>
                                <Td
                                    colSpan={columns.length}
                                    className="text-center py-12 text-gray-400 text-lg"
                                >
                                    No data
                                </Td>
                            </Tr>
                        ) : (
                            table.getRowModel().rows.map((row) => (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </Td>
                                    ))}
                                </Tr>
                            ))
                        )}
                    </TBody>
                </Table>
            </div>
            <div className="p-4 flex justify-start">
                <Button
                    type="button"
                    onClick={() =>
                        append({
                            skill: '',
                            proficiency: 0,
                            evaluation_date: '',
                        })
                    }
                >
                    Add Row
                </Button>
            </div>
        </Card>
    )
}

export default SkillDetailsTable
