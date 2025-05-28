export interface AttendanceData {
  name: string; 
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  naming_series: string;
  employee: string;
  employee_name: string | null;
  working_hours: number;
  status: string;
  leave_type: string | null;
  leave_application: string | null;
  attendance_date: string;
  company: string;
  department: string | null;
  attendance_request: string | null;
  custom_regularized: number;
  custom_in_office_hours: number;
  custom_out_office_hours: number;
  custom_regularized_reason: string | null;
  shift: string | null;
  in_time: string | null;
  out_time: string | null;
  late_entry: number;
  early_exit: number;
  amended_from: string | null;
  custom_extra_time: number;
}
  export type GetEmployeeSeparationResponse = {
    data: AttendanceData[]
    total: number
  }

  export type Filter = {
    status: string
  }
  