import { useMemo } from 'react'
import DraggableTable from '@/components/shared/DndDataTable'
import type { ColumnDef } from '@tanstack/react-table'

interface KRAGoal {
    kra: string
    weightage: number
    goalCompletion?: number
    goalScore?: number
    _isSelected: boolean
}

interface Props {
    data: KRAGoal[]
    setData: (data: KRAGoal[]) => void
}

function KRAGoalsTable({ data, setData }: Readonly<Props>) {
    const columns: ColumnDef<KRAGoal>[] = useMemo(
        () => [
            {
                header: () => (
                    <span>
                        KRA <span className="text-red-500">*</span>
                    </span>
                ),
                accessorKey: 'kra',
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
                header: () => <span>Goal Completion (%)</span>,
                accessorKey: 'goalCompletion',
            },
            {
                header: () => <span>Goal Score (weighted)</span>,
                accessorKey: 'goalScore',
            },
        ],
        [],
    )

    const defaultRowObject: KRAGoal = {
        kra: '',
        weightage: 0,
        goalCompletion: 0,
        goalScore: 0,
        _isSelected: false,
    }

    if (!data) return <div>Loading...</div>

    return (
        <>
            <div className="mb-4">
                <h6>KRA vs Goals</h6>
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
        </>
    )
}

export default KRAGoalsTable
