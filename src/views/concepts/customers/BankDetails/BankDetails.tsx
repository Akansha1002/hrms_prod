import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbArrowNarrowLeft, TbTrash } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { apiCreateBankDetails, apiGetBankDetails, apiUpdateBankDetails } from '@/services/BankDetailService'
import { BankDetailsSchema, GetBankDetailResponse } from './types'
import BankDetailEdit from './BankDetailCreate'
const BankDetails = () => {
    const navigate = useNavigate()
    const { name } = useParams()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { data, isLoading, mutate } = useSWR(
        name ? ['/api/resource/BankDetail', { name }] : null,
        ([_, params]) => apiGetBankDetails<GetBankDetailResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const bankDetailData = data?.data

    const handleFormSubmit = async (values: BankDetailsSchema) => {
        if (isSubmiting || !name) return;
        setIsSubmiting(true)
        // await sleep(800)
        try {
            if (bankDetailData) {
                await apiUpdateBankDetails(name, values)
                toast.push(
                    <Notification type="success">Bank details updated successfully!</Notification>,
                    { placement: 'top-center' },
                )
            } else {
                const response = await apiCreateBankDetails({
                    ...values,
                    employee_number: name
                })
                toast.push(<Notification type="success">Bank Details created successfully!</Notification>, {
                    placement: 'top-center',
                })
            }
            // navigate(`concepts/customers/details/${name}`)
            history.back()
            await mutate()
        } catch (error) {
            console.error('Error saving bank details:', error)
            toast.push(
                <Notification type="danger">Failed to save bank details!</Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Bank Details discard!</Notification>,
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
            <BankDetailEdit
                onFormSubmit={handleFormSubmit}
                defaultValues={bankDetailData}
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
                                // onClick={() => document.getElementById("bankDetailForm")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
                                loading={isSubmiting}
                            // disabled={isSubmiting}
                            >
                                {bankDetailData ? 'Update' : 'Submit'}
                            </Button>
                        </div>
                    </div>
                </Container>
            </BankDetailEdit>
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

export default BankDetails
