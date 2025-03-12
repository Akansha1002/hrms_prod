import { Employee } from "../../EmployeeList/types"
import Tag from '@/components/ui/Tag'
import Dropdown from '@/components/ui/Dropdown'
import Button from '@/components/ui/Button'
import { useParams } from "react-router-dom"
import useSWR from "swr"
import { apiUpdateEmployeeWorkflowState } from "@/services/CustomersService"

interface EmployeeDetailHeaderProps {
    data: Employee
    onSave: () => void;
    hasChanges: boolean;
}

const EmployeeDetailHeader = ({ data, onSave, hasChanges }: EmployeeDetailHeaderProps) => {
    const { name } = useParams<{ name: string }>()
    const { mutate } = useSWR("employees");

    const handleWorkflowUpdate = async (employeeOnboardingStatus: string) => {
        if (!name) return;

        try {

            await apiUpdateEmployeeWorkflowState(name, employeeOnboardingStatus);
            mutate();
        } catch (error) {
            console.error("Error updating workflow state", error);
        }
    };

    const Toggle = <Button variant="solid">Actions</Button>

    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-4">
            <div className="flex gap-4">
                <h3>{data?.employee_name}</h3>
                <Tag>
                    <span>{data?.employee_onboarding_status}</span>
                </Tag>
            </div>
            {hasChanges ? (
                <Button
                    variant="solid"
                    onClick={onSave}
                >
                    Save
                </Button>
            ) : (
                data?.employee_onboarding_status !== "Onboarded" && (
                    <div>
                        <Dropdown renderTitle={Toggle}>
                            {data?.employee_onboarding_status === "Pending" && (
                                <Dropdown.Item
                                    eventKey="a"
                                    onClick={() => handleWorkflowUpdate("Verification from HR Manager")}
                                >
                                    Send to HR Manager
                                </Dropdown.Item>
                            )}
                            {data?.employee_onboarding_status === "Verification from HR Manager" && (
                                <>
                                    <Dropdown.Item
                                        eventKey="c"
                                        onClick={() => handleWorkflowUpdate("Pending Employee End")}
                                    >
                                        Approve
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="d"
                                        onClick={() => handleWorkflowUpdate("Pending")}
                                    >
                                        Reject
                                    </Dropdown.Item>
                                </>
                            )}
                            {data?.employee_onboarding_status === "Pending Employee End" && (
                                <Dropdown.Item
                                    eventKey="b"
                                    onClick={() => handleWorkflowUpdate("Verification by HR")}
                                >
                                    Send to HR User
                                </Dropdown.Item>
                            )}
                            {data?.employee_onboarding_status === "Verification by HR" && (
                                <>
                                    <Dropdown.Item
                                        eventKey="c"
                                        onClick={() => handleWorkflowUpdate("Approved")}
                                    >
                                        Approve
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="d"
                                        onClick={() => handleWorkflowUpdate("Pending Employee End")}
                                    >
                                        Reject
                                    </Dropdown.Item>
                                </>
                            )}
                            {data?.employee_onboarding_status === "Approved" && (
                                <>
                                    <Dropdown.Item
                                        eventKey="c"
                                        onClick={() => handleWorkflowUpdate("Onboarded")}
                                    >
                                        Approve
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        eventKey="d"
                                        onClick={() => handleWorkflowUpdate("Verification by HR")}
                                    >
                                        Reject
                                    </Dropdown.Item>
                                </>
                            )}
                            {/* <Dropdown.Item eventKey="b">Help</Dropdown.Item> */}
                        </Dropdown>
                    </div>
                )
            )}
        </div>
    )
}

export default EmployeeDetailHeader