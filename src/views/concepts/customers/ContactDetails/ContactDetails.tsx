import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbArrowNarrowLeft, TbTrash } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import ContactDetailEdit from './ContactDetailCreate'
import { apiCreateContactDetails, apiGetContactDetails, apiUpdateContactDetails } from '@/services/ContactDetailsService'
import { ContactDetailsSchema, GetContactDetailsResponse } from './types'


const ContactDetails = () => {
    const navigate = useNavigate()
    const { name } = useParams()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { data, isLoading, mutate } = useSWR(
        name ? ['/api/resource/ContactDetails', { name }] : null,
        ([_, params]) => apiGetContactDetails<GetContactDetailsResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const contactData = data?.data

    const handleFormSubmit = async (values: ContactDetailsSchema) => {
        if (isSubmiting || !name) return;
        setIsSubmiting(true)
        // await sleep(800)
        try {
            if (contactData) {
                await apiUpdateContactDetails(name, values)
                toast.push(
                    <Notification type="success">Contact details updated successfully!</Notification>,
                    { placement: 'top-center' },
                )
            } else {
                const response = await apiCreateContactDetails({
                    ...values,
                    employee_number: name
                })
                toast.push(<Notification type="success">Contact created successfully!</Notification>, {
                    placement: 'top-center',
                })
                // navigate('customers/employee-onboarding')
            }
            history.back()
            await mutate()
        } catch (error) {
            console.error('Error saving contact details:', error)
            toast.push(
                <Notification type="danger">Failed to save contact details!</Notification>,
                { placement: 'top-center' },
            )
        } finally {

            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">employee Details discard!</Notification>,
            { placement: 'top-center' },
        )
        history.back()
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
            <ContactDetailEdit
                onFormSubmit={handleFormSubmit}
                defaultValues={contactData}
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
                                // onClick={() => document.getElementById("contactForm")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
                                loading={isSubmiting}
                            >
                                {contactData ? 'Update' : 'Submit'}
                            </Button>
                        </div>
                    </div>
                </Container>
            </ContactDetailEdit>
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

export default ContactDetails
