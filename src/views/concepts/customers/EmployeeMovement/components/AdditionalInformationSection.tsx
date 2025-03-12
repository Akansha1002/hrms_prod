import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Select } from '@/components/ui/Select'
import Radio from '@/components/ui/Radio'

const calendarOptions = [
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'optionalHoliday', label: 'OP-Optional Holiday' },
    { value: 'us', label: 'US' },
    { value: 'victoria', label: 'Victoria' },
    { value: 'visakhapatnam', label: 'Visakhapatnam' }
];

const attendanceOptions = [
    { value: 'securityCard', label: 'Security Card' },
    { value: 'deskHomeMobile', label: 'Desk/Home/Mobile' },
    { value: 'tracker', label: 'Tracker' }
];

const shiftTypeOptions = [
    { value: 'custom', label: 'Custom' },
    { value: 'general', label: 'General' },
    { value: 'evening', label: 'Evening' },
    { value: 'generalAus', label: 'General-Aus' }
];

const employmentTypeOptions = [
    { value: 'fullTime', label: 'Full Time' },
    { value: 'partTime', label: 'Part Time' },
    { value: 'partTimerEvening', label: 'Part Timer Evening' },
    { value: 'partTimerMorning', label: 'Part Timer Morning' }
];



const AdditionalInformationSection = () => {
    return (
        <Card>
            <h4 className="mb-6">Additional Information </h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Calendar"
                >
                    <Select
                        options={calendarOptions}
                    />
                </FormItem>
                <FormItem
                    label="Attendance"
                >
                    <Select
                        options={attendanceOptions}
                    />
                </FormItem>
                <FormItem
                    label="Shift Type"
                >
                    <Select
                        options={shiftTypeOptions}
                    />
                </FormItem>
                <FormItem
                    label="Full/Part Time"
                >
                    <Select
                        options={employmentTypeOptions}
                    />
                </FormItem>
                <FormItem
                    label="Contract Type"
                >
                    <Input
                        type="text"
                    />
                </FormItem>
                <FormItem
                    label="Contract End Date"
                >
                    <Input type="date"
                    />
                </FormItem>
                <FormItem
                    label="Notice Period (Days)"
                >
                    <Input
                        type="number"
                    />
                </FormItem>
                <FormItem
                    label="Letter Template"
                >
                    <Select
                        placeholder="Select"
                    />
                </FormItem>
                <FormItem
                    label="Authorized Signatory"
                >
                    <Select
                        placeholder="Select"
                    />
                </FormItem>

                <FormItem
                    label="Secretary"
                >
                    <Input
                        type="text"
                    />
                </FormItem>
                <div className="flex items-center justify-between gap-8">
                    <FormItem
                        label="Tansfer Type"
                    >
                        <Radio
                            className="mr-4"
                            name="transferType"
                        >
                            Self Initiated
                        </Radio>

                        <Radio
                            name="transferType"
                        >
                            Company Initiated
                        </Radio>
                    </FormItem>
                </div>
            </div>
        </Card>
    )
}

export default AdditionalInformationSection
