export type EmployeeSkillMapData = {
    id: string
    name: string
    employee: string
    employee_name?: string
}

export type GetEmployeeSkillMapListResponse = {
    data: EmployeeSkillMapData
    total: number
}

export type Filter = {
    status: string
}
