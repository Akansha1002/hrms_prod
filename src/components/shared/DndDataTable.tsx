import {
    useMemo,
    useState,
    useEffect,
    useRef,
    useCallback,
    ChangeEvent,
    ReactNode,
} from 'react'
import Table from '@/components/ui/Table'
import Input from '@/components/ui/Input'
import {
    useReactTable,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
    RowData,
    CellContext,
    TableMeta,
} from '@tanstack/react-table'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { MdDragIndicator } from 'react-icons/md'
import { StrictModeDroppable } from '@/components/shared'
import type { DropResult } from '@hello-pangea/dnd'
import Checkbox, { CheckboxProps } from '@/components/ui/Checkbox'
import { Card } from '@/components/ui'
import Button from '@/components/ui/Button'
import { TbTrash } from 'react-icons/tb'

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
        updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
}

const { Tr, Th, Td, THead, TBody } = Table

type CheckBoxChangeEvent = ChangeEvent<HTMLInputElement>

interface IndeterminateCheckboxProps extends Omit<CheckboxProps, 'onChange'> {
    onChange: (event: CheckBoxChangeEvent) => void
    indeterminate: boolean
    onCheckBoxChange?: (event: CheckBoxChangeEvent) => void
    onIndeterminateCheckBoxChange?: (event: CheckBoxChangeEvent) => void
}

const IndeterminateCheckbox = (props: IndeterminateCheckboxProps) => {
    const {
        indeterminate,
        onChange,
        onCheckBoxChange,
        onIndeterminateCheckBoxChange,
        ...rest
    } = props

    const ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (typeof indeterminate === 'boolean' && ref.current) {
            ref.current.indeterminate = !rest.checked && indeterminate
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, indeterminate])

    const handleChange = (e: CheckBoxChangeEvent) => {
        onChange(e)
        onCheckBoxChange?.(e)
        onIndeterminateCheckBoxChange?.(e)
    }

    return (
        <Checkbox
            ref={ref}
            className="mb-0"
            onChange={(_, e) => handleChange(e)}
            {...rest}
        />
    )
}

const EditableCell = ({
    getValue,
    row: { index },
    column: { id },
    table,
}: CellContext<any, unknown>) => {
    const initialValue = getValue()
    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
        table.options.meta?.updateData(index, id, value)
    }

    useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return (
        <Input
            className="border-transparent bg-transparent hover:border-gray-300 focus:bg-white"
            size="sm"
            value={value as string}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
        />
    )
}

function useSkipper() {
    const shouldSkipRef = useRef(true)
    const shouldSkip = shouldSkipRef.current
    const skip = useCallback(() => {
        shouldSkipRef.current = false
    }, [])

    useEffect(() => {
        shouldSkipRef.current = true
    })

    return [shouldSkip, skip]
}

export interface GenericDraggableTableProps<T extends object> {
    data: T[]
    setData: (data: T[]) => void
    columns: ColumnDef<T>[]
    defaultColumn?: Partial<ColumnDef<T>>
    showSelectionColumn?: boolean
    showDragColumn?: boolean
    showNumberColumn?: boolean
    showActions?: boolean
    onAddRow?: () => void
    addButtonText?: string
    emptyStateMessage?: ReactNode
    selectionKey?: string // Key in the data object to store selection state
    defaultRowObject?: Partial<T> // Default values for a new row
}

function DraggableTable<T extends object>({
    data,
    setData,
    columns: userColumns,
    defaultColumn = { cell: EditableCell },
    showSelectionColumn = true,
    showDragColumn = true,
    showNumberColumn = true,
    showActions = true,
    onAddRow,
    addButtonText = 'Add Row',
    emptyStateMessage = <span className="font-semibold">No data</span>,
    selectionKey = '_isSelected',
    defaultRowObject = {},
}: Readonly<GenericDraggableTableProps<T>>) {
    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

    const reorderData = (startIndex: number, endIndex: number) => {
        const newData = [...data]
        const [movedRow] = newData.splice(startIndex, 1)
        newData.splice(endIndex, 0, movedRow)
        setData(newData)
    }

    const handleDragEnd = (result: DropResult) => {
        const { source, destination } = result
        if (!destination) return
        reorderData(source.index, destination.index)
    }

    const addRow = () => {
        if (onAddRow) {
            onAddRow()
        } else {
            setData([...data, { ...defaultRowObject } as T])
        }
    }

    const removeRow = (index: number) => {
        setData(data.filter((_, i) => i !== index))
    }

    const handleCheckBoxChange = (checked: boolean, rowData: any) => {
        setData((prev: any[]) =>
            prev.map((item) =>
                item === rowData ? { ...item, [selectionKey]: checked } : item,
            ),
        )
    }

    const handleIndeterminateCheckBoxChange = (
        checked: boolean,
        rows: any[],
    ) => {
        const updatedData = data.map((item: any) => {
            const isRowIncluded = rows.some((row) => row.original === item)
            return isRowIncluded ? { ...item, [selectionKey]: checked } : item
        })

        setData(updatedData)
    }

    const indeterminateCheckboxChecked = (rows: any[]) => {
        const total = rows.length
        const selected = rows.filter((row) => row.getIsSelected()).length

        return total > 0 && selected === total
    }

    const checkboxChecked = (rowData: any) => {
        return rowData?.[selectionKey] || false
    }

    // Prepare the columns with our standard columns
    const columns = useMemo(() => {
        const baseColumns: ColumnDef<T>[] = []

        // Add drag column if requested
        if (showDragColumn) {
            baseColumns.push({
                id: 'dragger',
                header: () => '',
                accessorKey: 'dragger',
                cell: (props) => (
                    <span {...(props as any).dragHandleProps}>
                        <MdDragIndicator />
                    </span>
                ),
            } as ColumnDef<T>)
        }

        // Add selection column if requested
        // if (showSelectionColumn) {
        //     baseColumns.push({
        //         id: 'select',
        //         maxSize: 50,
        //         header: ({ table }) => (
        //             <IndeterminateCheckbox
        //                 checked={
        //                     indeterminateCheckboxChecked
        //                         ? indeterminateCheckboxChecked(
        //                               table.getRowModel().rows,
        //                           )
        //                         : table.getIsAllRowsSelected()
        //                 }
        //                 indeterminate={table.getIsSomeRowsSelected()}
        //                 onChange={table.getToggleAllRowsSelectedHandler()}
        //                 onIndeterminateCheckBoxChange={(e) => {
        //                     handleIndeterminateCheckBoxChange(
        //                         e.target.checked,
        //                         table.getRowModel().rows,
        //                     )
        //                 }}
        //             />
        //         ),
        //         cell: ({ row }) => (
        //             <IndeterminateCheckbox
        //                 checked={
        //                     checkboxChecked
        //                         ? checkboxChecked(row.original)
        //                         : row.getIsSelected()
        //                 }
        //                 disabled={!row.getCanSelect()}
        //                 indeterminate={row.getIsSomeSelected()}
        //                 onChange={row.getToggleSelectedHandler()}
        //                 onCheckBoxChange={(e) =>
        //                     handleCheckBoxChange(e.target.checked, row.original)
        //                 }
        //             />
        //         ),
        //     } as ColumnDef<T>)
        // }

        // Add number column if requested
        if (showNumberColumn) {
            baseColumns.push({
                id: 'number',
                header: 'No.',
                cell: ({ row }) => <span>{row.index + 1}</span>,
            } as ColumnDef<T>)
        }

        // Add user-defined columns
        baseColumns.push(...userColumns)

        // Add actions column if requested
        if (showActions) {
            baseColumns.push({
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => (
                    <button
                        onClick={() => removeRow(row.index)}
                        className="text-red-500"
                    >
                        <TbTrash />
                    </button>
                ),
            } as ColumnDef<T>)
        }

        return baseColumns
    }, [
        userColumns,
        showSelectionColumn,
        showDragColumn,
        showNumberColumn,
        showActions,
    ])

    const table = useReactTable({
        data,
        columns,
        defaultColumn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        autoResetPageIndex: autoResetPageIndex as boolean,
        meta: {
            updateData: (
                rowIndex: number,
                columnId: string,
                value: unknown,
            ) => {
                if (typeof skipAutoResetPageIndex === 'function') {
                    skipAutoResetPageIndex()
                }
                setData((old: T[]) =>
                    old.map((row, index) =>
                        index === rowIndex
                            ? { ...row, [columnId]: value }
                            : row,
                    ),
                )
            },
        } as TableMeta<T>,
    })

    if (!data) return <div>Loading...</div>

    return (
        <>
            <Card>
                <Table>
                    <THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th
                                        key={header.id}
                                        colSpan={header.colSpan}
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
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <StrictModeDroppable droppableId="table-body">
                            {(provided) => (
                                <TBody
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {table.getRowModel().rows.length === 0 ? (
                                        <Tr>
                                            <Td
                                                className="hover:bg-transparent"
                                                colSpan={columns.length}
                                            >
                                                <div className="flex flex-col items-center gap-4">
                                                    {emptyStateMessage}
                                                </div>
                                            </Td>
                                        </Tr>
                                    ) : (
                                        table.getRowModel().rows.map((row) => (
                                            <Draggable
                                                key={row.id}
                                                draggableId={row.id}
                                                index={row.index}
                                            >
                                                {(provided, snapshot) => (
                                                    <Tr
                                                        ref={provided.innerRef}
                                                        className={
                                                            snapshot.isDragging
                                                                ? 'table'
                                                                : ''
                                                        }
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        {row
                                                            .getVisibleCells()
                                                            .map((cell) => (
                                                                <Td
                                                                    key={
                                                                        cell.id
                                                                    }
                                                                >
                                                                    {flexRender(
                                                                        cell
                                                                            .column
                                                                            .columnDef
                                                                            .cell,
                                                                        cell.getContext(),
                                                                    )}
                                                                </Td>
                                                            ))}
                                                    </Tr>
                                                )}
                                            </Draggable>
                                        ))
                                    )}
                                    {provided.placeholder}
                                </TBody>
                            )}
                        </StrictModeDroppable>
                    </DragDropContext>
                </Table>
            </Card>

            <Button
                onClick={addRow}
                size="xs"
                className="ltr:mr-3 rtl:ml-3 mt-10"
                type="button"
                customColorClass={() =>
                    'border-blue-500 ring-1 ring-blue-500 text-blue-500 hover:border-blue-500 hover:ring-blue-500 hover:text-blue-500 bg-transparent'
                }
            >
                {addButtonText}
            </Button>
        </>
    )
}

export default DraggableTable
