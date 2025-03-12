import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Switcher from '@/components/ui/Switcher'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { Button } from '@/components/ui/Button'
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { FormSectionBaseProps } from '../types'
import ComputeCtcDrawer from '../../ComputeCtc/components/ComputeCtcDrawer'
import { Select } from '@/components/ui/Select'

type PayRollProps = FormSectionBaseProps

const ptLocationOptions = [
    { value: 'andhrapradesh', label: 'AndhraPradesh' },
    { value: 'telangana', label: 'Telangana' },
];

const payGroupOptions = [
    { value: 'centillion', label: 'Centillion' },
    { value: 'centillionManagement', label: 'Centilion Management' },
];

const PayRollSection = ({ control, errors }: PayRollProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false)

    const handleOnClick = () => {
        setDrawerOpen(true);
    }

    return (
        <>
            <Card>
                <h4 className="mb-6">Payroll</h4>
                <div className="grid md:grid-cols-2 gap-4">
                    <FormItem
                        label="PAN"
                        invalid={Boolean(errors.pan_number)}
                        errorMessage={errors.pan_number?.message}
                    >
                        <Controller
                            name="pan_number"
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
                                name="pfApplicable"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center justify-between gap-4">
                                        <Switcher
                                            checked={field.value}
                                            onChange={(checked) => {
                                                field.onChange(checked)
                                            }}
                                        />
                                        <p>PF Applicable</p>
                                    </div>
                                )}
                            />
                        </FormItem>
                        <Controller
                            name="pfApplicable"
                            control={control}
                            render={({ field }) => (
                                field.value ? (
                                    <FormItem
                                        label="PF No."
                                        invalid={Boolean(errors.custom_pf_number)}
                                        errorMessage={errors.custom_pf_number?.message}
                                    >
                                        <Controller
                                            name="custom_pf_number"
                                            control={control}
                                            render={({ field }) =>
                                                <Input
                                                    type="text"
                                                    {...field}
                                                />
                                            }
                                        />
                                    </FormItem>
                                ) : <></>
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <FormItem>
                            <Controller
                                name="esiApplicable"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex items-center justify-between gap-4">
                                        <Switcher
                                            checked={field.value}
                                            onChange={(checked) => {
                                                field.onChange(checked)
                                            }}
                                        />
                                        <p>ESI Applicable</p>
                                    </div>
                                )}
                            />
                        </FormItem>
                        <Controller
                            name="esiApplicable"
                            control={control}
                            render={({ field }) => (
                                field.value ? (
                                    <FormItem
                                        label="ESI Number"
                                        invalid={Boolean(errors.custom_esi_number)}
                                        errorMessage={errors.custom_esi_number?.message}
                                    >
                                        <Controller
                                            name="custom_esi_number"
                                            control={control}
                                            render={({ field }) =>
                                                <Input
                                                    type="text"
                                                    {...field}
                                                />
                                            }
                                        />
                                    </FormItem>
                                ) : <></>
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-between gap-8">
                        <FormItem>
                            <Controller
                                name="ptApplicable"
                                control={control}
                                render={({ field }) => (
                                        <div className="flex items-center justify-between gap-4">
                                            <Switcher
                                                checked={field.value}
                                                onChange={(checked) => {
                                                    field.onChange(checked)
                                                }}
                                            />
                                            <p>PT Applicable</p>
                                    </div>
                                )}
                            />
                        </FormItem>
                        <Controller
                            name="ptApplicable"
                            control={control}
                            render={({ field }) => (
                                field.value ? (
                                    <FormItem
                                        label="PT Location"
                                        invalid={Boolean(errors.custom_pt_location)}
                                        errorMessage={errors.custom_pt_location?.message}
                                    >
                                        <Controller
                                            name="custom_pt_location"
                                            control={control}
                                            render={({ field }) =>
                                                <Select
                                                    options={ptLocationOptions}
                                                    value={ptLocationOptions.find(option => option.value === field.value) || null}
                                                    onChange={(option) => field.onChange(option ? option.value : '')}
                                                />
                                            }
                                        />
                                    </FormItem>
                                ) : <></>
                            )}
                        />
                    </div>
                    <FormItem
                        label="GL Code"
                        invalid={Boolean(errors.custom_gl_code)}
                        errorMessage={errors.custom_gl_code?.message}
                    >
                        <Controller
                            name="custom_gl_code"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    type="text"
                                    {...field}
                                />
                            }
                        />
                    </FormItem>
                    {/* <FormItem
                        label="Pay Mode"
                        invalid={Boolean(errors.salary_mode)}
                        errorMessage={errors.salary_mode?.message}
                    >
                        <Controller
                            name="salary_mode"
                            control={control}
                            render={({ field }) =>
                                <Input
                                    type="text"
                                    {...field}
                                />
                            }
                        />
                    </FormItem> */}
                    <FormItem
                        label="Applied From"
                        invalid={Boolean(errors.custom_applied_from)}
                        errorMessage={errors.custom_applied_from?.message}
                    >
                        <Controller
                            name="custom_applied_from"
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
                        label="Pay Group"
                        invalid={Boolean(errors.custom_pay_group)}
                        errorMessage={errors.custom_pay_group?.message}
                    >
                        <Controller
                            name="custom_pay_group"
                            control={control}
                            render={({ field }) =>
                                <Select
                                    options={payGroupOptions}
                                    value={payGroupOptions.find(option => option.value === field.value) || null}
                                    onChange={(option) => field.onChange(option ? option.value : '')}
                                />
                            }
                        />
                    </FormItem>
                    <FormItem className="inline-flex flex-wrap xl:flex gap-2">
                        <Button variant="solid" onClick={handleOnClick}>
                            Compute CTC
                        </Button>
                    </FormItem>
                </div>
            </Card>
            <ComputeCtcDrawer
                open={drawerOpen}
                onDrawerOpen={setDrawerOpen}
            />
        </>
    )
}

export default PayRollSection
