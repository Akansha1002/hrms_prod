import LeaveListTable from "./components/LeaveListTable"
import { TableData } from "./types"

const tableData: TableData[] = [
    { leaveCode: "CO", leaveName: "Compensatory Off", sex: "Both", status: "Active", encashable: "No", truncation: "No", transfer: "No" },
    { leaveCode: "LV", leaveName: "Leave", sex: "Both", status: "Active", encashable: "Yes", truncation: "Yes", transfer: "No" },
    { leaveCode: "LOP", leaveName: "Loss Of Pay", sex: "Both", status: "Active", encashable: "NO", truncation: "NO", transfer: "No" },
    { leaveCode: "ML", leaveName: "Maternity Leave", sex: "Female", status: "Active", encashable: "NO", truncation: "NO", transfer: "No" },
];

const LeaveList = () => {
    return (
        <>
            <LeaveListTable data={tableData} />
        </>
    )
}

export default LeaveList