import { useEffect, useMemo, useState } from 'react'
import DraggableTable from '@/components/shared/DndDataTable'

import type { ColumnDef } from '@tanstack/react-table'
import { Input } from '@/components/ui'
import { apiGetEmployeeTaxExemptionSubCategories } from '@/services/TaxExemptionDeclarationService'

// Define the interface for our table data
interface DeclarationDetails {
    exemptionSubCategory: string
    exemptionCategory: string
    maxExemptedAmount: string
    declaredAmount: string
    _isSelected?: boolean
}

function DeclarationTable(props) {
    const { data, setData } = props

    const [subCategoryOptions, setSubCategoryOptions] = useState<any[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const response =
                await apiGetEmployeeTaxExemptionSubCategories<any>()
            setSubCategoryOptions(response.data)
            console.log('Exemption Sub Categories:', response)
        }

        fetchData()
    }, [])

    // Define columns for the table
    const columns: ColumnDef<DeclarationDetails>[] = useMemo(
        () => [
            {
                header: () => (
                    <span>
                        Exemption Sub Category{' '}
                        <span className="text-red-500">*</span>
                    </span>
                ),
                accessorKey: 'exemptionSubCategory',
                cell: ({ row, column, table }) => {
                    const value = row.getValue('exemptionSubCategory') || ''
                    return (
                        <select
                            className="border rounded px-2 py-1 w-full bg-white"
                            value={value as string}
                            onChange={(e) => {
                                const selectedSubCategory = e.target.value
                                const matchedOption = subCategoryOptions.find(
                                    (opt) => opt.name === selectedSubCategory,
                                )

                                table.options.meta?.updateData(
                                    row.index,
                                    'exemptionSubCategory',
                                    selectedSubCategory,
                                )
                                table.options.meta?.updateData(
                                    row.index,
                                    'exemptionCategory',
                                    matchedOption?.exemption_category || '',
                                )
                                table.options.meta?.updateData(
                                    row.index,
                                    'maxExemptedAmount',
                                    matchedOption?.max_amount || '',
                                )
                            }}
                        >
                            <option value="">Select...</option>
                            {subCategoryOptions.map((option) => (
                                <option key={option.name} value={option.name}>
                                    {option.name}
                                </option>
                            ))}
                        </select>
                    )
                },
            },
            {
                header: () => (
                    <span>
                        Exemption Category{' '}
                        <span className="text-red-500">*</span>
                    </span>
                ),
                accessorKey: 'exemptionCategory',
                cell: ({ getValue }) => (
                    <span className="text-gray-800">
                        {String(getValue()) || '-'}
                    </span>
                ),
            },
            {
                header: () => (
                    <span>
                        Maximum Exempted Amount{' '}
                        <span className="text-red-500">*</span>
                    </span>
                ),
                accessorKey: 'maxExemptedAmount',
                cell: ({ getValue }) => (
                    <span className="text-gray-800">
                        {String(getValue()) || '-'}
                    </span>
                ),
            },
            // { header: () => <span>Declared Amount <span className="text-red-500">*</span></span>, accessorKey: 'declaredAmount' },
            {
                header: () => (
                    <span>
                        Declared Amount <span className="text-red-500">*</span>
                    </span>
                ),
                accessorKey: 'declaredAmount',
                cell: ({
                    getValue,
                    row: { index },
                    column: { id },
                    table,
                    cell,
                }) => {
                    const initialValue = getValue() as string
                    const [value, setValue] = useState(initialValue)
                    const maxExemptedAmount =
                        cell.row.original.maxExemptedAmount

                    const [error, setError] = useState<string | null>(null)

                    const onBlur = () => {
                        if (value > maxExemptedAmount) {
                            setError(
                                'Declared amount cannot be greater than maximum exempted amount',
                            )
                            table.options.meta?.updateData(
                                index,
                                'declaredAmount',
                                '',
                            )
                        } else {
                            setError(null)
                            table.options.meta?.updateData(index, id, value)
                        }
                    }

                    useEffect(() => {
                        setValue(initialValue)
                    }, [initialValue])

                    return (
                        <>
                            <Input
                                className={`border ${error ? 'border-red-500' : 'border-gray-300'} bg-white hover:border-blue-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-500`}
                                size="sm"
                                value={value as string}
                                onChange={(e) => setValue(e.target.value)}
                                onBlur={onBlur}
                            />
                            {/* {error && (
                                <div className="text-red-500 text-sm mt-1">
                                    {error}
                                </div>
                            )} */}
                        </>
                    )
                },
            },
        ],
        [data, setData],
    )

    // Define default row object
    const defaultRowObject = {
        exemptionSubCategory: '',
        exemptionCategory: '',
        maxExemptedAmount: '',
        declaredAmount: '',
    }

    if (!data) return <div>Loading...</div>

    return (
        <DraggableTable
            data={data}
            setData={setData}
            columns={columns}
            defaultRowObject={defaultRowObject}
            addButtonText="Add Row"
            emptyStateMessage={
                <div className="flex flex-col items-center gap-4">
                    <span className="font-semibold">No data</span>
                </div>
            }
        />
    )
}

export default DeclarationTable
