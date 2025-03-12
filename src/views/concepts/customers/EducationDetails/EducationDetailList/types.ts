export type EducationDetail = {
    name: string;
    owner: string;
    docstatus: number;
    idx: number;
    id: string;
    type_of_establishment?: string;
    name_of_establishment?: string;
    discipline?: string;
    passing_year?: string;
    grade?: string;
    level?: string;
    company_sponsored?: string;
    amount?: string;
    reimbursement_data?: string;
    employee_number: string;
    subject?: string;
    major_field?: string;
    minor_field?: string;
    affiliated_to?: string;
    address_of_institute?: string;
    attended_from?: string;
    attended_to?: string;
    currency?: string;
    explain_breaks_during_education?: string;
};

export type GetEducationDetailFormResponse = {
    data: EducationDetail;
};
