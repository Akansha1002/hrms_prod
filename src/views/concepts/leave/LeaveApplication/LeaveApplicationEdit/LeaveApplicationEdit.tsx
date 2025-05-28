import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import NoUserFound from '@/assets/svg/NoUserFound'
import { TbTrash, TbArrowNarrowLeft } from 'react-icons/tb'
import { useParams, useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { apiGetLeaveAllocations, apiGetLeaveApplicationList, apiUpdateLeaveApplication } from '@/services/LeaveService'
import { GetLeaveApplicationListResponse } from '../LeaveApplicationList/types'
import LeaveApplicationForm, { LeaveApplicationFormSchema } from '../LeaveApplicationForm'
import { GetAllocatedLeaveTableData } from '../LeaveApplicationForm/types'

const LeaveApplicationEdit = () => {
    const { id } = useParams()

    const navigate = useNavigate()

    const { data, isLoading, mutate } = useSWR(
        id ? ['/api/resource/LeaveApplication', { id }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetLeaveApplicationList<GetLeaveApplicationListResponse, { id: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const leaveApplicationData = data?.data

    const employee = leaveApplicationData?.employee

    const { data: leaveAllocationData } = useSWR(
        employee ? ['/api/LeaveAllocation', { employee }] : null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) =>
            apiGetLeaveAllocations<GetAllocatedLeaveTableData, { employee: string }>(params),
        {
            revalidateOnFocus: false,
        },
    )

    // const leaveAllocationListData = leaveAllocationData?.data || []
    const leaveAllocationListData = Array.isArray(leaveAllocationData?.data) ? leaveAllocationData.data : []


    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)


    const handleFormSubmit = async (values: LeaveApplicationFormSchema) => {
        console.log("values",values)
        if (isSubmiting) return;
        setIsSubmiting(true)
        try {
            if (id) {
                await apiUpdateLeaveApplication(id, values)
                toast.push(
                    <Notification type="success">Changes Saved!</Notification>,
                    { placement: 'top-center' },
                )
                navigate('/concepts/leave/leave-application/list')
            }
            await mutate()
        } catch (error) {
            console.error('Error updating leave application:', error)
            toast.push(
                <Notification type="danger">Failed to save!</Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDelete = () => {
        setDeleteConfirmationOpen(true)
        toast.push(
            <Notification type="success">Leave Application deleted!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/leave/leave-application/list')
    }

    const handleDelete = () => {
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handleBack = () => {
        history.back()
    }

    return (
        <>
            {!isLoading && !data && (
                <div className="h-full flex flex-col items-center justify-center">
                    <NoUserFound height={280} width={280} />
                    <h3 className="mt-8">No application found!</h3>
                </div>
            )}
            {!isLoading && data && (
                <>
                    <LeaveApplicationForm
                        defaultValues={leaveApplicationData}
                        onFormSubmit={handleFormSubmit}
                        leaveAllocationList={leaveAllocationListData}
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
                    </LeaveApplicationForm>
                    <ConfirmDialog
                        isOpen={deleteConfirmationOpen}
                        type="danger"
                        title="Delete Leave Application"
                        onClose={handleCancel}
                        onRequestClose={handleCancel}
                        onCancel={handleCancel}
                        onConfirm={handleConfirmDelete}
                    >
                        <p>
                            Are you sure you want discard this? This action can&apos;t
                            be undo.{' '}
                        </p>
                    </ConfirmDialog>
                </>
            )}
        </>
    )
}

export default LeaveApplicationEdit