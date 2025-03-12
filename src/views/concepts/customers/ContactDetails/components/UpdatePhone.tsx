import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import type { FormSectionBaseProps } from '../types'
import Upload from '@/components/ui/Upload'
import { Button } from '@/components/ui'

type UpdatePhoneProps = FormSectionBaseProps & {
    data?: Record<string, any>
}


const UpdatePhone = ({ control, errors, data }: UpdatePhoneProps) => {
    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }
            }
        }

        return valid
    }
    return (
        <Card>
            <h4 className="mb-6">Add/Update Phone</h4>
            <div className="grid md:grid-cols-2 gap-4">
                <FormItem
                    label="Home Telephone"
                    invalid={Boolean(errors.home_telephone)}
                    errorMessage={errors.home_telephone?.message}
                >
                    <Controller
                        name="home_telephone"
                        control={control}
                        defaultValue={data?.home_telephone || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Extension Number"
                    invalid={Boolean(errors.extension_number)}
                    errorMessage={errors.extension_number?.message}
                >
                    <Controller
                        name="extension_number"
                        control={control}
                        defaultValue={data?.extension_number || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Personal Email"
                    invalid={Boolean(errors.personal_email)}
                    errorMessage={errors.personal_email?.message}
                >
                    <Controller
                        name="personal_email"
                        control={control}
                        defaultValue={data?.personal_email || ''}
                        render={({ field }) =>
                            <Input
                                type="email"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Work Mobile Number"
                    invalid={Boolean(errors.work_mobile_number)}
                    errorMessage={errors.work_mobile_number?.message}
                >
                    <Controller
                        name="work_mobile_number"
                        control={control}
                        defaultValue={data?.work_mobile_number || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Preferred Email Language"
                    invalid={Boolean(errors.preferred_email_language)}
                    errorMessage={errors.preferred_email_language?.message}
                >
                    <Controller
                        name="preferred_email_language"
                        control={control}
                        defaultValue={data?.preferred_email_language || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Personal Mobile Number"
                    invalid={Boolean(errors.personal_mobile_number)}
                    errorMessage={errors.personal_mobile_number?.message}
                >
                    <Controller
                        name="personal_mobile_number"
                        control={control}
                        defaultValue={data?.personal_mobile_number || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Work Telephone"
                    invalid={Boolean(errors.work_telephone)}
                    errorMessage={errors.work_telephone?.message}
                >
                    <Controller
                        name="work_telephone"
                        control={control}
                        defaultValue={data?.work_telephone || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Work Email"
                    invalid={Boolean(errors.work_email)}
                    errorMessage={errors.work_email?.message}
                >
                    <Controller
                        name="work_email"
                        control={control}
                        defaultValue={data?.work_email || ''}
                        render={({ field }) =>
                            <Input
                                type="email"
                                {...field}
                            />
                        }
                    />
                </FormItem>

                <FormItem
                    label="Fax Number"
                    invalid={Boolean(errors.fax_number)}
                    errorMessage={errors.fax_number?.message}
                >
                    <Controller
                        name="fax_number"
                        control={control} 
                        defaultValue={data?.fax_number || ''}
                        render={({ field }) =>
                            <Input
                                type="text"
                                {...field}
                            />
                        }
                    />
                </FormItem>
                {/* <Upload
                    showList={false}
                    uploadLimit={1}
                    beforeUpload={beforeUpload}
                    onChange={(files) => {
                        if (files.length > 0) {
                            field.onChange(
                                URL.createObjectURL(files[0]),
                            )
                        }
                    }}
                >
                    <Button
                        variant="solid"
                        className="mt-4"
                        type="button"
                    >
                        Upload
                    </Button>
                </Upload> */}
            </div>
        </Card>
    )
}

export default UpdatePhone
