interface EmployeeTaxExemptionDeclarationCategory {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: number;
    idx: number;
    exemption_sub_category: string;
    exemption_category: string;
    max_amount: number;
    amount: number;
    parent: string;
    parentfield: string;
    parenttype: string;
    doctype: string;
  }
  
  export interface EmployeeTaxExemptionDeclaration {
    name: string;
    owner: string;
    creation: string;
    modified: string;
    modified_by: string;
    docstatus: number;
    idx: number;
    employee: string;
    employee_name: string;
    company: string;
    payroll_period: string;
    currency: string;
    monthly_house_rent: number;
    rented_in_metro_city: number;
    salary_structure_hra: number;
    annual_hra_exemption: number;
    monthly_hra_exemption: number;
    total_declared_amount: number;
    total_exemption_amount: number;
    doctype: string;
    declarations: EmployeeTaxExemptionDeclarationCategory[];
  }
  

export type Filter = {
  status: string
}

export type GetEmployeeTaxExemptionDeclarationListResponse = {
  data: EmployeeTaxExemptionDeclaration
  total: number
}