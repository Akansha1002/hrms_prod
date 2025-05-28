import { useMemo } from 'react'
import DraggableTable from '@/components/shared/DndDataTable'
import type { ColumnDef } from '@tanstack/react-table'
import StarRating from '@/components/shared/StarRating'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { Input } from '@/components/ui'
import { Control } from 'react-hook-form'
import { AppraisalSchema } from '../AppraisalCreate'

interface RatingRow {
    criteria: string
    weightage: number
    rating?: number
    _isSelected?: boolean
}

interface Props {
    data: RatingRow[]
    setData: (data: RatingRow[]) => void
    control: Control<AppraisalSchema>
    errors: Record<string, any>
    formdata?: Partial<AppraisalSchema>
    watch?: any
}

function RatingsTable({
    data,
    setData,
    control,
    errors,
    formdata,
    watch,
}: Readonly<Props>) {
    const columns: ColumnDef<RatingRow>[] = useMemo(
        () => [
            {
                header: () => (
                    <span>
                        Criteria <span className="text-red-500">*</span>
                    </span>
                ),
                accessorKey: 'criteria',
            },
            {
                header: () => (
                    <span>
                        Weightage (%) <span className="text-red-500">*</span>
                    </span>
                ),
                accessorKey: 'weightage',
            },
            {
                header: () => <span>Rating</span>,
                accessorKey: 'rating',
                cell: ({ row }) => {
                    const rowIndex = row.index
                    const currentRating = data[rowIndex]?.rating ?? 0

                    return (
                        <StarRating
                            value={currentRating}
                            onChange={(newRating) => {
                                const updatedData = [...data]
                                updatedData[rowIndex].rating = newRating
                                setData(updatedData)
                            }}
                        />
                    )
                },
            },
        ],
        [data, setData],
    )

    const defaultRowObject: RatingRow = {
        criteria: '',
        weightage: 0,
        rating: 0,
    }

    return (
        <>
            <div className="mb-4">
                <h6>Ratings</h6>
            </div>

            <DraggableTable
                data={data}
                setData={setData}
                columns={columns}
                defaultRowObject={defaultRowObject}
                addButtonText="Add Row"
                emptyStateMessage={
                    <div className="flex flex-col items-center gap-4">
                        <span className="font-semibold">No rows</span>
                    </div>
                }
            />

            <div className="grid md:grid-cols-2 gap-4 mt-10">
                <FormItem
                    invalid={Boolean(errors.reports_to)}
                    errorMessage={errors.reports_to?.message}
                    label="Total Self Score"
                >
                    <Controller
                        name="totalSelfScore"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="number"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </FormItem>
            </div>
        </>
    )
}

export default RatingsTable
