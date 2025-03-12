import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbArrowNarrowLeft, TbTrash } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import { apiCreateEmployeeDetails, apiGetEmployeeDetails, apiUpdateEmployeeDetails } from '@/services/EmployeeDetailService'
import { EmployeeDetailsSchema, GetEmployeeDetailsResponse } from './types'
import EmployeeDetailEdit from './EmployeeDetailCreate'

const EmployeeDetails = () => {
    const navigate = useNavigate()
    const { name } = useParams()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const { data, isLoading, mutate } = useSWR(
        name ? ['/api/resource/EmployeeDetail', { name }] : null,
        ([_, params]) => apiGetEmployeeDetails<GetEmployeeDetailsResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const employeeData = data?.data

    const handleFormSubmit = async (values: EmployeeDetailsSchema) => {
        setIsSubmiting(true)
        // await sleep(800)
        try {
            if (name) {
                await apiUpdateEmployeeDetails(name, values)
                toast.push(
                    <Notification type="success">Employee details updated successfully!</Notification>,
                    { placement: 'top-center' },
                )
            } else {
                const response = await apiCreateEmployeeDetails(values)
                toast.push(<Notification type="success">Employee created successfully!</Notification>, {
                    placement: 'top-center',
                })
                // navigate('customers/employee-onboarding')
            }
            history.back()
            await mutate()
        } catch (error) {
            console.error('Error saving employee details:', error)
            toast.push(
                <Notification type="danger">Failed to save employee details!</Notification>,
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
            <EmployeeDetailEdit
                onFormSubmit={handleFormSubmit}
                defaultValues={employeeData}
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
                                {name ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </div>
                </Container>
            </EmployeeDetailEdit>
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

export default EmployeeDetails
