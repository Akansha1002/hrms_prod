import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { TbArrowNarrowLeft, TbTrash } from 'react-icons/tb'
import { useNavigate, useParams } from 'react-router-dom'
import useSWR from 'swr'
import EmployeePromotionForm from '../EmployeePromotionForm'

const EmployeePromotionCreate = () => {
  const navigate = useNavigate()
  const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
  const [isSubmiting, setIsSubmiting] = useState(false)

  const handleConfirmDiscard = () => {
    setDiscardConfirmationOpen(true)
    toast.push(
        <Notification type="success">Education Details discard!</Notification>,
        { placement: 'top-center' },
    )
    navigate(`/concepts/customers/employee-promotion/list`)
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
      <EmployeePromotionForm
      // defaultValues={educationDetailData}
      // onFormSubmit={handleFormSubmit}
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
      </EmployeePromotionForm>
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

export default EmployeePromotionCreate