import { Employee } from "../../EmployeeList/types"
import Tag from '@/components/ui/Tag'
import Dropdown from '@/components/ui/Dropdown'
import Button from '@/components/ui/Button'
import { useParams } from "react-router-dom"
import useSWR from "swr"
import { apiUpdateEmployeeWorkflowState } from "@/services/CustomersService"
import { apiGetWorkflowStates } from "@/services/UserService"

interface EmployeeDetailHeaderProps {
    data: Employee
    onSave: () => void;
    hasChanges: boolean;
}

const EmployeeDetailHeader = ({ data, onSave, hasChanges }: EmployeeDetailHeaderProps) => {
    const { name } = useParams<{ name: string }>()
    const { mutate } = useSWR("employees");

    const { data: editableStatesResponse = { message: { editable_states: [] } }, isLoading } = useSWR(
        ['editable-workflow-states', { workflow_name: 'Onboarding Workflow' }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetWorkflowStates<any, { workflow_name: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        }
    );

    // const userRole = ["HR Manager"]; // Replace with actual user role Single role

    const userRole = ["HR Manager", "HR User",]; // Replace with actual user roles Multiple roles

    const stateTransitions: Record<string, string[]> = {
        "Pending": ["Verification from HR Manager"],
        "Verification from HR Manager": ["Pending Employee End", "Pending"],
        "Pending Employee End": ["Verification by HR"],
        "Verification by HR": ["Approved", "Pending Employee End"],
        "Approved": ["Onboarded", "Verification by HR"],
    };

    const actionMap: Record<string, { label: string; nextState: string }[]> = {
        "Pending": [
            { label: "Send to HR Manager", nextState: "Verification from HR Manager" }
        ],
        "Verification from HR Manager": [
            { label: "Approve", nextState: "Pending Employee End" },
            { label: "Reject", nextState: "Pending" }
        ],
        "Pending Employee End": [
            { label: "Send to HR User", nextState: "Verification by HR" }
        ],
        "Verification by HR": [
            { label: "Approve", nextState: "Approved" },
            { label: "Reject", nextState: "Pending Employee End" }
        ],
        "Approved": [
            { label: "Approve", nextState: "Onboarded" },
            { label: "Reject", nextState: "Verification by HR" }
        ]
    };


    const editableStates: { state: string; allow_edit: string }[] =
        editableStatesResponse?.message?.editable_states || [];

    const canEditFromCurrentState = (currentState: string): boolean => {
        const matched = editableStates.find(stateObj => stateObj.state === currentState);
        if (!matched) return false;

        const allowedRoles = matched.allow_edit.split(',').map(r => r.trim());
        return userRole.some(role => allowedRoles.includes(role));
    };

    // const canEditState = (targetState: string): boolean => {
    //     return editableStates.some(({ state, allow_edit }) => {
    //         if (state !== targetState) return false;

    //         const allowedRoles = allow_edit.split(",").map(r => r.trim());
    //         return userRole.some(role => allowedRoles.includes(role));
    //     });
    // };
    const canTransitionTo = (targetState: string): boolean => {
        const allowedRoles = editableStates
            .filter(stateObj => stateObj.state === targetState)
            .flatMap(stateObj => stateObj.allow_edit.split(',').map(r => r.trim()));

        // return allowedRoles.includes(userRole);
        return userRole.some(role => allowedRoles.includes(role));
    };

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

    const currentStatus = data?.employee_onboarding_status;
    const availableActions = actionMap[currentStatus] || [];
    const nextStates = stateTransitions[currentStatus] || [];
    const userEditableNextStates = nextStates.filter(targetState => {
        return true;
    });

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
                // data?.employee_onboarding_status !== "Onboarded" && (
                //     <div>
                //         {/* <Dropdown renderTitle={Toggle}>
                //             {data?.employee_onboarding_status === "Pending" && (
                //                 <Dropdown.Item
                //                     eventKey="a"
                //                     onClick={() => handleWorkflowUpdate("Verification from HR Manager")}
                //                 >
                //                     Send to HR Manager
                //                 </Dropdown.Item>
                //             )}
                //             {data?.employee_onboarding_status === "Verification from HR Manager" && (
                //                 <>
                //                     <Dropdown.Item
                //                         eventKey="c"
                //                         onClick={() => handleWorkflowUpdate("Pending Employee End")}
                //                     >
                //                         Approve
                //                     </Dropdown.Item>
                //                     <Dropdown.Item
                //                         eventKey="d"
                //                         onClick={() => handleWorkflowUpdate("Pending")}
                //                     >
                //                         Reject
                //                     </Dropdown.Item>
                //                 </>
                //             )}
                //             {data?.employee_onboarding_status === "Pending Employee End" && (
                //                 <Dropdown.Item
                //                     eventKey="b"
                //                     onClick={() => handleWorkflowUpdate("Verification by HR")}
                //                 >
                //                     Send to HR User
                //                 </Dropdown.Item>
                //             )}
                //             {data?.employee_onboarding_status === "Verification by HR" && (
                //                 <>
                //                     <Dropdown.Item
                //                         eventKey="c"
                //                         onClick={() => handleWorkflowUpdate("Approved")}
                //                     >
                //                         Approve
                //                     </Dropdown.Item>
                //                     <Dropdown.Item
                //                         eventKey="d"
                //                         onClick={() => handleWorkflowUpdate("Pending Employee End")}
                //                     >
                //                         Reject
                //                     </Dropdown.Item>
                //                 </>
                //             )}
                //             {data?.employee_onboarding_status === "Approved" && (
                //                 <>
                //                     <Dropdown.Item
                //                         eventKey="c"
                //                         onClick={() => handleWorkflowUpdate("Onboarded")}
                //                     >
                //                         Approve
                //                     </Dropdown.Item>
                //                     <Dropdown.Item
                //                         eventKey="d"
                //                         onClick={() => handleWorkflowUpdate("Verification by HR")}
                //                     >
                //                         Reject
                //                     </Dropdown.Item>
                //                 </>
                //             )}
                //         </Dropdown> */}
                //         <Dropdown renderTitle={Toggle}>
                //             {data?.employee_onboarding_status === "Pending" &&
                //                 canEditState("Verification from HR Manager") && (
                //                     <Dropdown.Item
                //                         eventKey="a"
                //                         onClick={() => handleWorkflowUpdate("Verification from HR Manager")}
                //                     >
                //                         Send to HR Manager
                //                     </Dropdown.Item>
                //                 )}

                //             {data?.employee_onboarding_status === "Verification from HR Manager" && (
                //                 <>
                //                     {canEditState("Pending Employee End") && (
                //                         <Dropdown.Item
                //                             eventKey="c"
                //                             onClick={() => handleWorkflowUpdate("Pending Employee End")}
                //                         >
                //                             Approve
                //                         </Dropdown.Item>
                //                     )}
                //                     {canEditState("Pending") && (
                //                         <Dropdown.Item
                //                             eventKey="d"
                //                             onClick={() => handleWorkflowUpdate("Pending")}
                //                         >
                //                             Reject
                //                         </Dropdown.Item>
                //                     )}
                //                 </>
                //             )}

                //             {data?.employee_onboarding_status === "Pending Employee End" &&
                //                 canEditState("Verification by HR") && (
                //                     <Dropdown.Item
                //                         eventKey="b"
                //                         onClick={() => handleWorkflowUpdate("Verification by HR")}
                //                     >
                //                         Send to HR User
                //                     </Dropdown.Item>
                //                 )}

                //             {data?.employee_onboarding_status === "Verification by HR" && (
                //                 <>
                //                     {canEditState("Approved") && (
                //                         <Dropdown.Item
                //                             eventKey="c"
                //                             onClick={() => handleWorkflowUpdate("Approved")}
                //                         >
                //                             Approve
                //                         </Dropdown.Item>
                //                     )}
                //                     {canEditState("Pending Employee End") && (
                //                         <Dropdown.Item
                //                             eventKey="d"
                //                             onClick={() => handleWorkflowUpdate("Pending Employee End")}
                //                         >
                //                             Reject
                //                         </Dropdown.Item>
                //                     )}
                //                 </>
                //             )}

                //             {data?.employee_onboarding_status === "Approved" && (
                //                 <>
                //                     {canEditState("Onboarded") && (
                //                         <Dropdown.Item
                //                             eventKey="c"
                //                             onClick={() => handleWorkflowUpdate("Onboarded")}
                //                         >
                //                             Approve
                //                         </Dropdown.Item>
                //                     )}
                //                     {canEditState("Verification by HR") && (
                //                         <Dropdown.Item
                //                             eventKey="d"
                //                             onClick={() => handleWorkflowUpdate("Verification by HR")}
                //                         >
                //                             Reject
                //                         </Dropdown.Item>
                //                     )}
                //                 </>
                //             )}
                //         </Dropdown>
                //     </div>
                // )
                currentStatus !== "Onboarded" &&
                canEditFromCurrentState(currentStatus) &&
                availableActions.length > 0 && (
                    <div>
                        <Dropdown renderTitle={Toggle}>
                            {availableActions
                                // nextStates
                                // .filter(canTransitionTo)
                                .map((state, idx) => (
                                    <Dropdown.Item
                                        key={idx}
                                        eventKey={state.nextState}
                                        onClick={() => handleWorkflowUpdate(state.nextState)}
                                    >
                                        {state.label}
                                    </Dropdown.Item>
                                ))}
                        </Dropdown>
                    </div>
                )
            )}
        </div>
    )
}

export default EmployeeDetailHeader