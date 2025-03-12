import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbArrowNarrowLeft, TbTrash } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { apiCreatePastEmploymentDetail, apiGetPastEmploymentDetail } from '@/services/PastEmploymentDetailService'
import { GetPastEmploymentDetailFormResponse } from '../PastEmploymentDetailList/types'
import { PastEmploymentDetailsSchema } from '../PastEmploymentDetailForm'
import PastEmploymentDetailForm from '../PastEmploymentDetailForm/PastEmploymentDetailFrom'

const PastEmploymentDetailCreate = () => {
    const navigate = useNavigate()
    const { name } = useParams()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

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

    const handleFormSubmit = async (values: PastEmploymentDetailsSchema) => {
        if (isSubmiting) return;
        setIsSubmiting(true)
        try {
            const response = await apiCreatePastEmploymentDetail({
                ...values,
                employee_number: name
            })
            if (response) {
                toast.push(
                    <Notification type="success">Past Employment Detail added!</Notification>,
                    { placement: 'top-center' },
                )
                navigate(`/concepts/customers/past-employment-details/list/${name}`)
            }
            await mutate()
        } catch (error) {
            console.error('Error saving past employment detail:', error)
            toast.push(
                <Notification type="danger">Failed to save past employment detail!</Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">PastEmployment Details discard!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`/concepts/customers/past-employment-details/list/${name}`)
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
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                // onClick={() => document.getElementById("pastEmploymentDetailForm")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
                                loading={isSubmiting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </PastEmploymentDetailForm>
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

export default PastEmploymentDetailCreate
