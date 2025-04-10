export type AttendanceData = {
  employee_name: string;
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  employee_number: string;
  reason: string | null;
  approved_by: string;
  date: string;
  status: string;
};

export type Filter = {
  status: string
}

export type GetAttendanceListResponse = {
  data: AttendanceData
  total: number
}