import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Switcher from '@/components/ui/Switcher'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { Select } from '@/components/ui/Select'
import { FormSectionBaseProps } from '../types'

type AdditionalInformationProps = {
    // FormSectionBaseProps: any,
    control: any;
    errors: any;
    setValue:any
    holidayList: { value: string; label: string }[];
    employmentTypeList: { value: string; label: string }[];
    shiftTypeList: { value: string; label: string }[];
    isLoading: boolean,
}

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

const shiftGroupOptions = [
    { value: 'telecomWireless', label: 'Telecom Wireless' },
    { value: 'telecomWireline', label: 'Telecom Wireline' },
    { value: 'robotics', label: 'Robotics' },
    { value: 'it', label: 'IT' },
    { value: 'accounts', label: 'Accounts' }
];

const employmentStatusOptions = [
    { value: 'probationer', label: 'Probationer' },
    { value: 'traineeTelecomEngineer', label: 'Trainee Telecom Engineer' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'consultant', label: 'Consultant' }
];

const employmentTypeOptions = [
    { value: 'fullTime', label: 'Full Time' },
    { value: 'partTime', label: 'Part Time' },
    { value: 'partTimerEvening', label: 'Part Timer Evening' },
    { value: 'partTimerMorning', label: 'Part Timer Morning' }
];

const contractTypeOptions = [
    { value: 'regular', label: 'Regular' },
    { value: 'temporary', label: 'Temporary' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'intern', label: 'Intern' }
];

const experienceCategoryOptions = [
    { value: 'fresher', label: 'Fresher' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'experienced', label: 'Experienced' },
    { value: 'intern', label: 'Intern' }
];


const AdditionalInformation = ({ control, errors, holidayList, shiftTypeList, employmentTypeList, isLoading, }: AdditionalInformationProps) => {
    return (
        <Card>
            <h4 className="mb-6">Additional Information </h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Calendar"
                    invalid={Boolean(errors.calendar)}
                    errorMessage={errors.calendar?.message}
                >
                    <Controller
                        name="calendar"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={isLoading ? [{ value: '', label: 'Loading...' }] : holidayList}
                                value={holidayList.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Attendance"
                    invalid={Boolean(errors.custom_attendance)}
                    errorMessage={errors.custom_attendance?.message}
                >
                    <Controller
                        name="custom_attendance"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={attendanceOptions}
                                value={attendanceOptions.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Shift Type"
                    invalid={Boolean(errors.custom_shift_type)}
                    errorMessage={errors.custom_shift_type?.message}
                >
                    <Controller
                        name="custom_shift_type"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={isLoading ? [{ value: '', label: 'Loading...' }] : shiftTypeList}
                                value={shiftTypeList?.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Shift Group"
                    invalid={Boolean(errors.custom_shift_group)}
                    errorMessage={errors.custom_shift_group?.message}
                >
                    <Controller
                        name="custom_shift_group"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={shiftGroupOptions}
                                value={shiftGroupOptions.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Employment Status"
                    invalid={Boolean(errors.custom_employment_status)}
                    errorMessage={errors.custom_employment_status?.message}
                >
                    <Controller
                        name="custom_employment_status"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={isLoading ? [{ value: '', label: 'Loading...' }] : employmentTypeList}
                                value={employmentTypeList?.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Confirmation Due Date"
                    invalid={Boolean(errors.final_confirmation_date)}
                    errorMessage={errors.final_confirmation_date?.message}
                >
                    <Controller
                        name="final_confirmation_date"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Full/Part Time"
                    invalid={Boolean(errors.custom_full_part_time)}
                    errorMessage={errors.custom_full_part_time?.message}
                >
                    <Controller
                        name="custom_full_part_time"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={employmentTypeOptions}
                                value={employmentTypeOptions.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        }
                    />
                </FormItem>
                {/* <FormItem
                    label="Contract Type"
                    invalid={Boolean(errors.custom_contract_type)}
                    errorMessage={errors.custom_contract_type?.message}
                >
                    <Controller
                        name="custom_contract_type"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={contractTypeOptions}
                                value={contractTypeOptions.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        }
                    />
                </FormItem> */}
                <FormItem
                    label="Contract End Date"
                    invalid={Boolean(errors.contract_end_date)}
                    errorMessage={errors.contract_end_date?.message}
                >
                    <Controller
                        name="contract_end_date"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="date"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Contractor"
                    invalid={Boolean(errors.custom_contractor)}
                    errorMessage={errors.custom_contractor?.message}
                >
                    <Controller
                        name="custom_contractor"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Experience Category"
                    invalid={Boolean(errors.custom_experience_in_category)}
                    errorMessage={errors.custom_experience_in_category?.message}
                >
                    <Controller
                        name="custom_experience_in_category"
                        control={control}
                        render={({ field }) =>
                            <Select
                                options={experienceCategoryOptions}
                                value={experienceCategoryOptions.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Experience in Months"
                    invalid={Boolean(errors.custom_experience_in_months)}
                    errorMessage={errors.custom_experience_in_months?.message}
                >
                    <Controller
                        name="custom_experience_in_months"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="number"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Notice Period (Days)"
                    invalid={Boolean(errors.notice_number_of_days)}
                    errorMessage={errors.notice_number_of_days?.message}
                >
                    <Controller
                        name="notice_number_of_days"
                        control={control}
                        defaultValue={'30'}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <FormItem
                    label="Secretary"
                    invalid={Boolean(errors.custom_secretary)}
                    errorMessage={errors.custom_secretary?.message}
                >
                    <Controller
                        name="custom_secretary"
                        control={control}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                <div className="flex items-center justify-between gap-8">
                    <FormItem>
                        <Controller
                            name="reEmployed"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center justify-between gap-8">
                                    <div className="flex items-center justify-between gap-1">
                                        <Switcher
                                            checked={field.value}
                                            onChange={(checked) => {
                                                field.onChange(checked);
                                            }}
                                        />
                                        <p>Re-Employed</p>
                                    </div>
                                </div>
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="Old Employee No"
                        invalid={Boolean(errors.custom_old_employee_number)}
                        errorMessage={errors.custom_old_employee_number?.message}
                    >
                        <Controller
                            name="custom_old_employee_number"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    type="text"
                                    {...field}
                                />
                            }
                        />
                    </FormItem>
                </div>
                <div className="flex items-center justify-between gap-8">
                    <FormItem>
                        <Controller
                            name="systemUser"
                            control={control}
                            render={({ field }) => (
                                <div className="flex items-center justify-between gap-8">
                                    <div className="flex items-center justify-between gap-1">
                                        <Switcher
                                            checked={field.value}
                                            onChange={(checked) => {
                                                field.onChange(checked);
                                            }}
                                        />
                                        <p>System User</p>
                                    </div>
                                </div>
                            )}
                        />
                    </FormItem>

                    <FormItem
                        label="Original Hire Date"
                        invalid={Boolean(errors.originalHireDate)}
                        errorMessage={errors.originalHireDate?.message}
                    >
                        <Controller
                            name="originalHireDate"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    type="date"
                                    {...field}
                                />
                            }
                        />
                    </FormItem>
                </div>
            </div>
        </Card>
    )
}

export default AdditionalInformation
