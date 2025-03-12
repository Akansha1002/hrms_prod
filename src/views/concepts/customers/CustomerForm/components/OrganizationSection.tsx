import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller, useWatch } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'
import { Select } from '@/components/ui/Select'
import { useEffect } from 'react'

type AddressSectionProps = {
    // FormSectionBaseProps: any
    control: any;
    errors: any;
    setValue: any;
    departmentList: { value: string; label: string }[];
    designationList: { value: string; label: string }[];
    managerList: { value: string; label: string }[];
    isLoading: boolean,
}

const positionOptions = [
    {
        value: 'Assistant Project Manager - Telecom Wireline',
        label: 'Assistant Project Manager - Telecom Wireline',
    },
    {
        value: 'Assistant Team Lead - Telecom Wireline',
        label: 'Assistant Team Lead - Telecom Wireline',
    },
    {
        value: 'Assistant Project Manager - Robotics',
        label: 'Assistant Project Manager - Robotics',
    },
]

const organizationStructureOptions = [
    {
        value: 'Centillion Networks Pvt Ltd',
        label: 'Centillion Networks Pvt Ltd',
    },
    { value: 'Centillion Solution B V', label: 'Centillion Solution B V' },
    { value: 'Centillion Solution INC', label: 'Centillion Solution INC' },
    {
        value: 'Centillion Solution Pty Ltd',
        label: 'Centillion Solution Pty Ltd',
    },
]

const locationOptions = [
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'victoria', label: 'Victoria' },
    { value: 'visakhapatnam', label: 'Visakhapatnam' },
]

const departmentOptions = [
    { value: 'rob-robotics', label: 'ROB-Robotics' },
    {
        value: 'rob-seniorHardwareEngineer',
        label: 'ROB-Senior Hardware Engineer',
    },
    { value: 'sof-software', label: 'Sof-Software' },
    { value: 'tel-telecomWireline', label: 'Tel-Telecom Wireline' },
    { value: 'wir-telecomWireless', label: 'Wir-Telecom Wireless' },
]

const designationOptions = [
    { value: 'juniorTelecomEngineer', label: 'Junior Telecom Engineer' },
    { value: 'seniorTelecomEngineer', label: 'Senior Telecom Engineer' },
    { value: 'telecomEngineer', label: 'Telecom Engineer' },
    { value: 'telecomTechnician', label: 'Telecom Technician' },
    { value: 'traineeTelecomEngineer', label: 'Trainee Telecom Engineer' },
    { value: 'roboticsEngineer', label: 'Robotics Engineer' },
    { value: 'softwareDeveloper', label: 'Software Developer' },
]

const gradeOptions = [
    { value: 'associate', label: 'Associate' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'executiveManagement', label: 'Executive Management' },
    { value: 'expatriate', label: 'Expatriate' },
    { value: 'intern', label: 'Intern' },
    { value: 'juniorManagement', label: 'Junior Management' },
    { value: 'middleManagement', label: 'Middle Management' },
    { value: 'seniorManagement', label: 'Senior Management' },
]

const OrganizationSection = ({ control, errors, setValue, departmentList, designationList,managerList, isLoading }: AddressSectionProps) => {
    const firstName = useWatch({ control, name: "first_name" });
    const lastName = useWatch({ control, name: "last_name" });

    useEffect(() => {
        if (firstName && lastName) {
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@yopmail.com`;
            setValue("user_email", email);
        } else {
            setValue("user_email", "");
        }
    }, [firstName, lastName, setValue]);
    return (
        <Card>
            <h4 className="mb-6">Organization</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    asterisk
                    label="Date of Join"
                    invalid={Boolean(errors.date_of_joining)}
                    errorMessage={errors.date_of_joining?.message}
                >
                    <Controller
                        name="date_of_joining"
                        control={control}
                        render={({ field }) => <Input type="date" {...field} />}
                    />
                </FormItem>
                <FormItem
                    label="Effective From"
                    invalid={Boolean(errors.effectiveFrom)}
                    errorMessage={errors.effectiveFrom?.message}
                >
                    <Controller
                        name="effectiveFrom"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="date"
                                value={field.value ?? ''}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Position"
                    invalid={Boolean(errors.position)}
                    errorMessage={errors.position?.message}
                >
                    <Controller
                        name="position"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={positionOptions}
                                value={
                                    positionOptions.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Organization Structure"
                    invalid={Boolean(errors.orgStructure)}
                    errorMessage={errors.orgStructure?.message}
                >
                    <Controller
                        name="orgStructure"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={organizationStructureOptions}
                                value={
                                    organizationStructureOptions.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Location"
                    invalid={Boolean(errors.custom_location)}
                    errorMessage={errors.custom_location?.message}
                >
                    <Controller
                        name="custom_location"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={locationOptions}
                                value={
                                    locationOptions.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Department"
                    invalid={Boolean(errors.department)}
                    errorMessage={errors.department?.message}
                >
                    <Controller
                        name="department"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={isLoading ? [{ value: '', label: 'Loading...' }] : departmentList}
                                value={departmentList.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Designation"
                    invalid={Boolean(errors.designation)}
                    errorMessage={errors.designation?.message}
                >
                    <Controller
                        name="designation"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={isLoading ? [{ value: '', label: 'Loading...' }] : designationList}
                                value={designationList.find(option => option.value === field.value) || null}
                                onChange={(option) => field.onChange(option ? option.value : '')}
                            />
                        )}
                    />
                </FormItem>
                {/* <FormItem
                    label="Grade"
                    invalid={Boolean(errors.grade)}
                    errorMessage={errors.grade?.message}
                >
                    <Controller
                        name="grade"
                        control={control}
                        render={({ field }) => (
                            <Select
                                options={gradeOptions}
                                value={
                                    gradeOptions.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem> */}
                <FormItem
                    label="Cost Center"
                    invalid={Boolean(errors.payroll_cost_center)}
                    errorMessage={errors.payroll_cost_center?.message}
                >
                    <Controller
                        name="payroll_cost_center"
                        control={control}
                        render={({ field }) => <Input type="text" {...field} />}
                    />
                </FormItem>
                <FormItem
                    asterisk
                    label="Official Email"
                    invalid={Boolean(errors.user_email)}
                    errorMessage={errors.user_email?.message}
                >
                    <Controller
                        name="user_email"
                        control={control}
                        render={({ field }) => (
                            <Input type="email" {...field} />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Reporting Manager"
                    invalid={Boolean(errors.reports_to)}
                    errorMessage={errors.reports_to?.message}
                >
                    <Controller
                        name="reports_to"
                        control={control}
                        // render={({ field }) => <Input type="text" {...field} />}
                        render={({ field }) => (
                            <Select
                                options={
                                    isLoading
                                        ? [{ value: '', label: 'Loading...' }]
                                        : managerList
                                }
                                value={
                                    managerList.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Functional Manager"
                    invalid={Boolean(errors.custom_functional_manager)}
                    errorMessage={errors.custom_functional_manager?.message}
                >
                    <Controller
                        name="custom_functional_manager"
                        control={control}
                        // render={({ field }) => <Input type="text" {...field} />}
                        render={({ field }) => (
                            <Select
                                options={
                                    isLoading
                                        ? [{ value: '', label: 'Loading...' }]
                                        : managerList
                                }
                                value={
                                    managerList.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="People Manager"
                    invalid={Boolean(errors.custom_peoples_manager)}
                    errorMessage={errors.custom_peoples_manager?.message}
                >
                    <Controller
                        name="custom_peoples_manager"
                        control={control}
                        // render={({ field }) => <Input type="text" {...field} />}
                        render={({ field }) => (
                            <Select
                                options={
                                    isLoading
                                        ? [{ value: '', label: 'Loading...' }]
                                        : managerList
                                }
                                value={
                                    managerList.find(
                                        (option) =>
                                            option.value === field.value,
                                    ) || null
                                }
                                onChange={(option) =>
                                    field.onChange(option ? option.value : '')
                                }
                            />
                        )}
                    />
                </FormItem>
            </div>
        </Card>
    )
}

export default OrganizationSection
