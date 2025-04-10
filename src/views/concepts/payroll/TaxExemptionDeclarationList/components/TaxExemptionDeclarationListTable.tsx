import { useEffect, useMemo, useState } from 'react'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { Link } from 'react-router-dom'
import { apiGetEmployeeTaxDeclarations } from '@/services/TaxExemptionDeclarationService'

import type { ColumnDef } from '@/components/shared/DataTable'

const statusColor: Record<string, string> = {
  Approved: 'bg-success-subtle text-success',
  Pending: 'bg-error-subtle text-error',
  'Pending Employee End': 'bg-warning-subtle text-warning',
}

const EmployeeColumn = ({ row }: { row: any }) => (
  <Link
    className="hover:underline ml-2 rtl:mr-2 font-semibold text-gray-900 dark:text-gray-100"
    to={`/concepts/customers/details/${row.name}`}
  >
    {row.employee_name}
  </Link>
)

const TaxExemptionDeclarationListTable = () => {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchEmployeeTaxDeclarations = async () => {
      try {
        const response = await apiGetEmployeeTaxDeclarations()
        console.log('API Response:', response)

        if (response?.data && Array.isArray(response.data)) {
          setData(response.data)
        } else {
          console.warn('Unexpected API response format', response)
          setData([])
        }
      } catch (error) {
        console.error('Error fetching employee tax declarations:', error)
        setData([])
      }
    }

    fetchEmployeeTaxDeclarations()
  }, [])

  const columns: ColumnDef<any>[] = useMemo(
    () => [
      {
        header: 'Employee Name',
        accessorKey: 'employee_name',
        cell: (props) => <EmployeeColumn row={props.row.original} />,
      },
      {
        header: 'Status',
        accessorKey: 'status',
        cell: (props) => {
          const row = props.row.original
          return (
            <div className="flex items-center">
              <Tag className={statusColor[row.status] || 'bg-gray-200'}>
                <span className="capitalize">{row.status || 'Unknown'}</span>
              </Tag>
            </div>
          )
        },
      },
      {
        header: 'Employee ID',
        accessorKey: 'employee',
      },
      {
        header: 'Payroll Period',
        accessorKey: 'payroll_period',
      },
      {
        header: 'ID',
        accessorKey: 'name',
      },
    ],
    []
  )

  return <DataTable selectable columns={columns} data={data} />
}

export default TaxExemptionDeclarationListTable
