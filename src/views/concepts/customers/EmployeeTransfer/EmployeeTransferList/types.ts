export type EmployeeTransferData = {
    name: string
    employee: string
    employee_name: string
    transfer_date: string
    company: string
    new_company: string
    department: string | null
    reallocate_leaves: number
    create_new_employee_id: number
    new_employee_id: string | null
  }
  
  export type GetEmployeeTransferListResponse = {
    data: EmployeeTransferData[]
    total: number
  }
  
  export type Filter = {
    status?: string
  }
  