import LeaveAllocationListTable from "./components/LeaveAllocationListTable"
import { TableData } from "./types";

const tableData: TableData[] = [
    { employeeName: "Virat Kohli", status: "Submitted", employee: "HR-EMP-00032", leaveType: "Casual Leave", id: "No" },
    { employeeName: "Virat Kohli", status: "Submitted", employee: "HR-EMP-00032", leaveType: "Casual Leave", id: "No" },
];

const LeaveAllocationList = () => {
    return (
        <LeaveAllocationListTable data={tableData} />
    )
}

export default LeaveAllocationList