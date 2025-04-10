export type FormSectionBaseProps = {
    control: {
        control: any
    }
    errors: {
        employee_id(employee_id: any): boolean | undefined
        attendance_date(attendance_date: any): boolean | undefined
        employee_name(employee_name: any): boolean | undefined
        company(company: any): boolean | undefined
        status(status: any): boolean | undefined
        errors: any
    }
    data?: {
        [key: string]: any
    }
}
