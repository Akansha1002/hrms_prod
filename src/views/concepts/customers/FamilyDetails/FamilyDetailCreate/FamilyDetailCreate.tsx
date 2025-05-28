import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbArrowNarrowLeft, TbTrash } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { apiCreateFamilyDetail, apiGetFamilyDetail } from '@/services/FamilyDetailService'
import { GetFamilyDetailFormResponse } from '../FamilyDetailList/types'
import { FamilyDetailsSchema } from '../FamilyDetailForm'
import FamilyDetailForm from '../FamilyDetailForm/FamilyDetailForm'

const FamilyDetailCreate = () => {
    const navigate = useNavigate()
    const { name } = useParams()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { data, isLoading, mutate } = useSWR(
        name ? ['/api/resource/FamilyDetail', { name }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetFamilyDetail<GetFamilyDetailFormResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const familyDetailData = data?.data

    const handleFormSubmit = async (values: FamilyDetailsSchema) => {
        if (isSubmiting) return;
        setIsSubmiting(true)
        try {
            const response = await apiCreateFamilyDetail({
                ...values,
                employee_number: name
            })
            if (response) {
                toast.push(
                    <Notification type="success">Family Detail added!</Notification>,
                    { placement: 'top-center' },
                )
                navigate(`/concepts/customers/family-details/list/${name}`)
            }
            await mutate()
        } catch (error) {
            console.error('Error saving family detail:', error)
            toast.push(
                <Notification type="danger">Failed to save family detail!</Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Family Details discard!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`/concepts/customers/family-details/list/${name}`)
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <>
            <FamilyDetailForm
                defaultValues={familyDetailData}
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
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                // onClick={() => document.getElementById("familyDetailForm")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
                                loading={isSubmiting}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </Container>
            </FamilyDetailForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default FamilyDetailCreate