import useSWR from "swr";
import LeaveListTable from "./components/LeaveListTable"
import { GetLeaveTypeListResponse } from "./types"
import { apiGetLeaveTypeList } from "@/services/LeaveService";

// const tableData: TableData[] = [
//     { leaveCode: "CO", leaveName: "Compensatory Off", sex: "Both", status: "Active", encashable: "No", truncation: "No", transfer: "No" },
//     { leaveCode: "LV", leaveName: "Leave", sex: "Both", status: "Active", encashable: "Yes", truncation: "Yes", transfer: "No" },
//     { leaveCode: "LOP", leaveName: "Loss Of Pay", sex: "Both", status: "Active", encashable: "NO", truncation: "NO", transfer: "No" },
//     { leaveCode: "ML", leaveName: "Maternity Leave", sex: "Female", status: "Active", encashable: "NO", truncation: "NO", transfer: "No" },
// ];

const LeaveList = () => {

    const { data, isLoading, mutate } = useSWR(
        ['/api/resource/Leave Type', {}],
        ([_, params]) => apiGetLeaveTypeList<GetLeaveTypeListResponse, Record<string, unknown>>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const leaveTypeListData= data?.data || [];
    return (
        <>
            <LeaveListTable data={leaveTypeListData} />
        </>
    )
}

export default LeaveList