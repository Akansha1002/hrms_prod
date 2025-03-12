import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbArrowNarrowLeft, TbTrash } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import PassportEdit from './PassportCreate'
import { GetPassportDetailResponse, PassportDetailsSchema } from './types'
import { apiCreatePassportDetails, apiGetPassportDetails, apiUpdatePassportDetails } from '@/services/PassportService'

const PassportDetails = () => {
    const navigate = useNavigate()
    const { name } = useParams()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { data, isLoading, mutate } = useSWR(
        name ? ['/api/resource/Passport', { name }] : null,
        ([_, params]) => apiGetPassportDetails<GetPassportDetailResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const passportData = data?.data

    const handleFormSubmit = async (values: PassportDetailsSchema) => {
        if (isSubmiting || !name) return;
        // if (isSubmiting) return;
        setIsSubmiting(true)

        try {
            if (passportData) {
                await apiUpdatePassportDetails(name, values)
                toast.push(
                    <Notification type="success">Passport details updated successfully!</Notification>,
                    { placement: 'top-center' },
                )
            } else {
                const response = await apiCreatePassportDetails({
                    ...values,
                    employee_number: name
                })
                toast.push(<Notification type="success">Passport created successfully!</Notification>, {
                    placement: 'top-center',
                })
            }
            // navigate('/employee-onboarding')
            history.back()
            await mutate()
        } catch (error) {
            console.error('Error saving passport details:', error)
            toast.push(
                <Notification type="danger">Failed to save passport details!</Notification>,
                { placement: 'top-center' },
            )
        } finally {

            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Passport Details discard!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/employee-onboarding')
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

    // const handleSubmitClick = () => {
    //     if (!isSubmiting && formRef.current) {
    //         setIsSubmiting(true); // Prevent double submission
    //         formRef.current.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }));
    //     }
    // };

    return (
        <>
            <PassportEdit
                onFormSubmit={handleFormSubmit}
                defaultValues={passportData}
            // formRef={formRef}
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
                                // onClick={() => document.getElementById("passportForm")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
                                loading={isSubmiting}
                            // disabled={isSubmiting}
                            >
                                {passportData ? 'Update' : 'Submit'}
                            </Button>
                        </div>
                    </div>
                </Container>
            </PassportEdit>
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

export default PassportDetails
