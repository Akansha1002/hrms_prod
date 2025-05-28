import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbArrowNarrowLeft, TbTrash } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import EmployeeSkillMapForm from '../EmployeeSkillMapForm'
import { EmployeeSkillMapFormSchema } from '../EmployeeSkillMapForm/types'
import { apiCreateEmployeeSkillMap } from '@/services/EmployeeSkillMapService'

const EmployeeSkillMapCreate = () => {
    const navigate = useNavigate()
    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: EmployeeSkillMapFormSchema) => {
        if (isSubmiting) return;
        setIsSubmiting(true)
        try {
            const response = await apiCreateEmployeeSkillMap({
                ...values
            })
            if (response) {
                toast.push(
                    <Notification type="success">Employee Skill Map added!</Notification>,
                    { placement: 'top-center' },
                )
                navigate('/concepts/customers/employee-skill-map/list')
            }
        } catch (error) {
            console.error('Error saving Employee Skill Map Detail:', error)
            toast.push(
                <Notification type="danger">Failed to save employee skill map detail!</Notification>,
                { placement: 'top-center' },
            )
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Employee Skill Map discard!</Notification>,
            { placement: 'top-center' },
        )
        navigate(`/concepts/customers/employee-skill-map/list`)
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
            <EmployeeSkillMapForm
                defaultValues={{
                    employee: '',
                    employee_skills: [{
                        skill: '',
                        proficiency: 0,
                        evaluation_date: new Date().toISOString().split('T')[0],
                    }],
                    trainings: [{
                        training: '',
                        training_date: '',
                    }]

                }}
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
                                loading={isSubmiting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </EmployeeSkillMapForm >
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

export default EmployeeSkillMapCreate