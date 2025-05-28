export type EmployeePromotionData ={
    id:string
    name:string
    employee:string
    employee_name?:string
    status?:string
}

export type GetEmployeePromotionListResponse = {
    data: EmployeePromotionData
    total: number
}

export type Filter = {
    status: string
}
