import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { TbTrash } from 'react-icons/tb'
import Container from '@/components/shared/Container'
import { TbArrowNarrowLeft } from 'react-icons/tb'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Button from '@/components/ui/Button'
import ProofSubmissionForm from '../ProofSubmissionForm'
import { ProofSubmissionData, ProofSubmissionFormSchema } from '../ProofSubmissionForm/types'
import { apiCreateProofSubmission } from '@/services/TaxExemptionProofSubmissionService'

const ProofSubmissionCreate = () => {
    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)
    const navigate = useNavigate();

    const handleFormSubmit = async (values: ProofSubmissionFormSchema) => {
        setIsSubmiting(true)
        try {
            const response = await apiCreateProofSubmission(values)
            if (response)
                navigate('/concepts/payroll/tax-exemption-proof-submission')
        } catch (error) {
            console.error('Error creating Employee Tax Exemption Proof Submission:', error)
            toast.push(
                <Notification type="danger">
                    Failed to create Employee Tax Exemption Proof Submission!
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleBack = () => {
        history.back()
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    return (
        <>
            <ProofSubmissionForm
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
                                // onClick={() => document.getElementById("employeeForm")?.dispatchEvent(new Event("submit", { cancelable: true, bubbles: true }))}
                                loading={isSubmiting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </ProofSubmissionForm>
        </>
    )
}

export default ProofSubmissionCreate