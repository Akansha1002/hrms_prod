import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import Select from '@/components/ui/Select'

const positionOptions = [
    { value: 'Assistant Project Manager - Telecom Wireline', label: 'Assistant Project Manager - Telecom Wireline' },
    { value: 'Assistant Team Lead - Telecom Wireline', label: 'Assistant Team Lead - Telecom Wireline' },
    { value: 'Assistant Project Manager - Robotics', label: 'Assistant Project Manager - Robotics' }
];

const organizationStructureOptions = [
    { value: 'Centillion Networks Pvt Ltd', label: 'Centillion Networks Pvt Ltd' },
    { value: 'Centillion Solution B V', label: 'Centillion Solution B V' },
    { value: 'Centillion Solution INC', label: 'Centillion Solution INC' },
    { value: 'Centillion Solution Pty Ltd', label: 'Centillion Solution Pty Ltd' },
];

const locationOptions = [
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'victoria', label: 'Victoria' },
    { value: 'visakhapatnam', label: 'Visakhapatnam' }
];

const departmentOptions = [
    { value: 'rob-robotics', label: 'ROB-Robotics' },
    { value: 'rob-seniorHardwareEngineer', label: 'ROB-Senior Hardware Engineer' },
    { value: 'sof-software', label: 'Sof-Software' },
    { value: 'tel-telecomWireline', label: 'Tel-Telecom Wireline' },
    { value: 'wir-telecomWireless', label: 'Wir-Telecom Wireless' }
];

const designationOptions = [
    { value: 'juniorTelecomEngineer', label: 'Junior Telecom Engineer' },
    { value: 'seniorTelecomEngineer', label: 'Senior Telecom Engineer' },
    { value: 'telecomEngineer', label: 'Telecom Engineer' },
    { value: 'telecomTechnician', label: 'Telecom Technician' },
    { value: 'traineeTelecomEngineer', label: 'Trainee Telecom Engineer' },
    { value: 'roboticsEngineer', label: 'Robotics Engineer' },
    { value: 'softwareDeveloper', label: 'Software Developer' }
];

const gradeOptions = [
    { value: 'associate', label: 'Associate' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'executiveManagement', label: 'Executive Management' },
    { value: 'expatriate', label: 'Expatriate' },
    { value: 'intern', label: 'Intern' },
    { value: 'juniorManagement', label: 'Junior Management' },
    { value: 'middleManagement', label: 'Middle Management' },
    { value: 'seniorManagement', label: 'Senior Management' }
];

const OrganizationSection = () => {
    return (
        <Card>
            <h4 className="mb-6">Organization</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Position"
                >
                    <Select
                        options={positionOptions}
                    />
                </FormItem>
                <FormItem
                    label="Organization Structure"
                >
                    <Select
                        options={organizationStructureOptions}
                    />
                </FormItem>
                <FormItem
                    label="Location"
                >
                    <Select
                        options={locationOptions}
                    />
                </FormItem>
                <FormItem
                    label="Department"
                >
                    <Select
                        options={departmentOptions}
                    />
                </FormItem>
                <FormItem
                    label="Designation"
                >
                    <Select
                        options={designationOptions}
                    />
                </FormItem>
                <FormItem
                    label="Grade"
                >
                    <Select
                        options={gradeOptions}
                    />
                </FormItem>
                <FormItem
                    label="Cost Center"
                >
                    <Input
                        type="text"
                    />
                </FormItem>
                <FormItem
                    label="Region"
                >
                    <Select
                        placeholder="Select Region"
                    />
                </FormItem>
                <FormItem
                    label="Reporting Manager"
                >
                    <Input
                        type="text"
                    />
                </FormItem>
                <FormItem
                    label="Functional Manager"
                >
                    <Input
                        type="text"
                    />
                </FormItem>
                <FormItem
                    label="Employment Status"
                >
                    <Select
                        placeholder="Select"
                    />
                </FormItem>
                <FormItem
                    label="Business Relationship"
                >
                    <Select
                        placeholder="Select"
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default OrganizationSection