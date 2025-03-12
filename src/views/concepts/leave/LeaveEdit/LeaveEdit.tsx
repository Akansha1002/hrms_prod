import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import LeaveForm from '../LeaveForm'
import NoProductFound from '@/assets/svg/NoProductFound'
import { apiGetProduct } from '@/services/ProductService'
import sleep from '@/utils/sleep'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { LeaveFormSchema } from '../LeaveForm/types'
const LeaveEdit = () => {
    const navigate = useNavigate()

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: LeaveFormSchema) => {
        console.log('Submitted values', values)
        setIsSubmiting(true)
        await sleep(800)
        setIsSubmiting(false)
        toast.push(<Notification type="success">Changes Saved!</Notification>, {
            placement: 'top-center',
        })
        // navigate('/concepts/products/product-list')

        const handleDelete = () => {
            setDeleteConfirmationOpen(true)
        }

        const handleCancel = () => {
            setDeleteConfirmationOpen(false)
        }

        const handleBack = () => {
            navigate('/concepts/products/product-list')
        }

        const handleConfirmDelete = () => {
            setDeleteConfirmationOpen(true)
            toast.push(
                <Notification type="success">Product deleted!</Notification>,
                { placement: 'top-center' },
            )
            // navigate('/concepts/products/product-list')
        }

        return (
            <>
                <LeaveForm
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
                                    loading={isSubmiting}
                                >
                                    Save
                                </Button>
                            </div>
                        </div>
                    </Container>
                </LeaveForm>
                <ConfirmDialog
                    isOpen={deleteConfirmationOpen}
                    type="danger"
                    title="Remove product"
                    onClose={handleCancel}
                    onRequestClose={handleCancel}
                    onCancel={handleCancel}
                    onConfirm={handleConfirmDelete}
                >
                    <p>
                        Are you sure you want to remove this product? This
                        action can&apos;t be undo.{' '}
                    </p>
                </ConfirmDialog>
            </>
        )
    }
}

export default LeaveEdit