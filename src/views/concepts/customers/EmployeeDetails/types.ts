import type { Control, FieldErrors } from 'react-hook-form'

export type EmployeeDetailsFields = {
    employee_number?: string;
    gender?: string;
    surname?: string;
    first_name?: string;
    middle_name?: string;
    known_as?: string;
    nationality?: string;
    labnguage?: string;
    blood_group?: string;
    rh_factor?: string;
    aadhar_number?: string;
    pan_number?: string;
    title?: string;
    official_name?: string;
    place_of_birth?: string;
    state_of_birth?: string;
    country_of_birth?: string;
    dob?: string;
    marital_status?: string;
    wedding_date?: string;
    physically_challenged?: string;
    disability?: string;
}

export type GetEmployeeDetailsResponse = {
    data: EmployeeDetailsFields
}

export type EmployeeDetailsSchema = EmployeeDetailsFields

export type FormSectionBaseProps = {
    control: Control<EmployeeDetailsSchema>
    errors: FieldErrors<EmployeeDetailsSchema>
}