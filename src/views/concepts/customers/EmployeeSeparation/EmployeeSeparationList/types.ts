export type EmployeeSeparationData = {
    name: string
    owner: string
    creation: string
    modified: string
    modified_by: string
    docstatus: number
    idx: number
    employee: string
    employee_name: string
    department: string
    designation: string
    employee_grade: string
    company: string
    boarding_status: string
    resignation_letter_date: string | null
    boarding_begins_on: string
    project: string | null
    employee_separation_template: string | null
    notify_users_by_email: number
    exit_interview: string
    amended_from: string | null
  }
  
  export type GetEmployeeSeparationResponse = {
    data: EmployeeSeparationData[]
    total: number
  }

  export type Filter = {
    status: string
  }
  