export type EmployeeResignationData = {
    id: string
    name: string
    employee: string
    employee_name?: string
    status?: string
}

export type GetEmployeeResignationListResponse = {
    data: EmployeeResignationData
    total: number
}

export type Filter = {
    status: string
}