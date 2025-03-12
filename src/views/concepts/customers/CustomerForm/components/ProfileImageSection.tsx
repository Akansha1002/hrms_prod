import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { Button } from '@/components/ui'
import Avatar from '@/components/ui/Avatar'
import Card from '@/components/ui/Card'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Upload from '@/components/ui/Upload'
import { apiUploadEmployeeImage } from '@/services/CustomersService'
import { useState } from 'react'
import { Controller } from 'react-hook-form'
import { HiOutlineUser } from 'react-icons/hi'
import type { FormSectionBaseProps } from '../types'

type ProfileImageSectionProps = FormSectionBaseProps
const ProfileImageSection = ({ control }: ProfileImageSectionProps) => {
    const [uploading, setUploading] = useState(false)

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

    const handleUpload = async (
        files: File[],
        field: { onChange: (value: string) => void },
    ) => {
        if (files.length > 0) {
            const file = files[0]
            const formData = new FormData()
            formData.append('file', file)

            setUploading(true)

            try {
                // Upload the image using the API
                const uploadResponse = (await apiUploadEmployeeImage(
                    formData,
                )) as unknown as {
                    message: {
                        file_url: string
                    }
                }
                console.log('Upload Response:', uploadResponse)

                const uploadedImagePath = uploadResponse
                if (!uploadedImagePath) {
                    throw new Error('Failed to upload employee image.')
                }
                console.log('uploadedImagePath:', uploadedImagePath)

                // field.onChange(uploadedImagePath)

                toast.push(
                    <Notification type="success">
                        Image uploaded successfully!
                    </Notification>,
                    { placement: 'top-center' },
                )
            } catch (error) {
                console.error('Error uploading image:', error)
                toast.push(
                    <Notification type="danger">
                        Failed to upload image!
                    </Notification>,
                    { placement: 'top-center' },
                )
            } finally {
                setUploading(false)
            }
        }
    }

    return (
        <Card>
            <h4 className="mb-6">Image</h4>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg text-center p-4">
                <div className="text-center">
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <>
                                <div className="flex items-center justify-center">
                                    {field.value ? (
                                        <Avatar
                                            size={100}
                                            className="border-4 border-white bg-gray-100 text-gray-300 shadow-lg"
                                            icon={<HiOutlineUser />}
                                            // src={field.value}
                                            src={
                                                typeof field.value === 'string'
                                                    ? field.value
                                                    : field.value instanceof
                                                        File
                                                      ? URL.createObjectURL(
                                                            field.value,
                                                        )
                                                      : undefined
                                            }
                                        />
                                    ) : (
                                        <DoubleSidedImage
                                            src="/img/others/upload.png"
                                            darkModeSrc="/img/others/upload-dark.png"
                                            alt="Upload image"
                                        />
                                    )}
                                </div>
                                <Upload
                                    showList={false}
                                    uploadLimit={1}
                                    beforeUpload={beforeUpload}
                                    // onChange={(files) => {
                                    //     if (files.length > 0) {
                                    //         field.onChange(
                                    //             URL.createObjectURL(files[0]),
                                    //         )
                                    //     }
                                    //     console.log(files)
                                    // }}
                                    onChange={(files) =>
                                        handleUpload(files, field)
                                    }
                                >
                                    <Button
                                        variant="solid"
                                        className="mt-4"
                                        type="button"
                                    >
                                        {/* Upload Image */}
                                        {uploading
                                            ? 'Uploading...'
                                            : 'Upload Image'}
                                    </Button>
                                </Upload>
                            </>
                        )}
                    />
                </div>
            </div>
        </Card>
    )
}

export default ProfileImageSection
