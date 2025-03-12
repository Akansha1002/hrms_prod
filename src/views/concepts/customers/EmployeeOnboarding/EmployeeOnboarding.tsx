import OnboardingForm from "./OnboardingForm"
import { OnboardingData } from "./types";

const onboardingData: OnboardingData[] = [
    { formName: "Employee Details", status: "Pending" },
    { formName: "Family Details", status: "Completed" },
    { formName: "Education Details", status: "Completed" },
    { formName: "Past Employment Details", status: "Completed" },
    { formName: "Bank Details", status: "Pending" },
    { formName: "Contact Details", status: "Completed" },
    { formName: "Emergency Contact", status: "Pending" },
    { formName: "Passport Details", status: "Completed" },
    { formName: "Driving License", status: "Pending" },
];

const EmployeeOnboarding = () => {
    return (
        <>
            <OnboardingForm data={onboardingData} />
        </>
    )
}

export default EmployeeOnboarding