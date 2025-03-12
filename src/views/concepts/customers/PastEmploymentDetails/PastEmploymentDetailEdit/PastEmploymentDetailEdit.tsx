import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { apiGetPastEmploymentDetail, apiUpdatePastEmploymentDetail } from '@/services/PastEmploymentDetailService'
import { GetPastEmploymentDetailFormResponse } from '../PastEmploymentDetailList/types'
import { PastEmploymentDetailsSchema } from '../PastEmploymentDetailForm'
import PastEmploymentDetailForm from '../PastEmploymentDetailForm/PastEmploymentDetailFrom'
const PastEmploymentDetailEdit = () => {
    const { name } = useParams()
    
    const navigate = useNavigate()
    
    const { data, isLoading, mutate } = useSWR(
        name ? ['/api/resource/PastEmploymentDetail', { name }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetPastEmploymentDetail<GetPastEmploymentDetailFormResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )
    
    const pastEmploymentDetailData = data?.data
    
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    
    const handleFormSubmit = async (values: PastEmploymentDetailsSchema) => {
        if (isSubmiting) return;
        setIsSubmiting(true)
        try {
            if (name) {
                await apiUpdatePastEmploymentDetail(name, values)
                toast.push(
                    <Notification type="success">Changes Saved!</Notification>,
                    { placement: 'top-center' },
                )
                navigate(`/concepts/customers/past-employment-details/list/${pastEmploymentDetailData?.employee_number}`)
            }
            await mutate()
        } catch (error) {
            console.error('Error saving past employment details:', error)
            toast.push(
                <Notification type="danger">Failed to save past employment details!</Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    // const getDefaultValues = () => {
    //     if (data) {
    //         const { firstName, lastName, email, personalInfo, img } = data

    //         return {
    //             firstName,
    //             lastName,
    //             email,
    //             img,
    //             phoneNumber: personalInfo.phoneNumber,
    //             dialCode: personalInfo.dialCode,
    //             country: personalInfo.country,
    //             address: personalInfo.address,
    //             city: personalInfo.city,
    //             postcode: personalInfo.postcode,
    //             tags: [],
    //         }
    //     }

    //     return {}
    // }

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">Details deleted!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`/concepts/customers/past-employment-details/list/${name}`)
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280} />
                    <h3 className="mt-8">No user found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <PastEmploymentDetailForm
                        defaultValues={pastEmploymentDetailData}
                        onFormSubmit={handleFormSubmit}
                    >
                        <Container>
                            <div className="flex items-center justify-between px-8">
                                <Button
                                    className="ltr:mr-3 rtl:ml-3"
                                    type="button"
                                    variant="plain"
                                    icon={<TbArrowNarrowLeft />}
                                    onClick={handleBack}
                                >
                                    Back
                                </Button>
                                <div className="flex items-center">
                                    <Button
                                        className="ltr:mr-3 rtl:ml-3"
                                        type="button"
                                        customColorClass={() =>
                                            'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                        }
                                        icon={<TbTrash />}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        variant="solid"
                                        type="submit"
                                        onClick={() => document.getElementById("pastEmploymentDetailForm")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
                                        loading={isSubmiting}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </Container>
                    </PastEmploymentDetailForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Remove customers"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want discard this? This action can&apos;t
                            be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default PastEmploymentDetailEdit
