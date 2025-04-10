import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { TbTrash } from 'react-icons/tb'
import Container from '@/components/shared/Container'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import Button from '@/components/ui/Button'
import CustomerForm from '../CustomerForm'
import {
    apiAddEmployeeImage,
    apiCreateEmployee,
    apiGetCustomersList,
} from '@/services/CustomersService'
import { apiCreateEmployeeDetails } from '@/services/EmployeeDetailService'
import { apiRegisterNewUser } from '@/services/UserService'
import type { EmployeeFormSchema } from '../CustomerForm'

interface UserData {
    email: string
    first_name: string
    last_name: string
    roles: Array<{ role: string }>
}
const CustomerEdit = () => {
    const navigate = useNavigate()

    const [discardConfirmationOpen, setDiscardConfirmationOpen] = useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const {
        data: employeeData,
        mutate: refreshEmployeeList,
    } = useSWR(
        ['/api/resource/Employee', {}], // API endpoint for fetching employees
        ([_, params]) =>
            apiGetCustomersList<EmployeeFormSchema, Record<string, unknown>>(
                params,
            ),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const handleFormSubmit = async (values: EmployeeFormSchema) => {
        setIsSubmiting(true)
        try {
            const userPayload = {
                email: values.user_email,
                first_name: values.first_name,
                last_name: values.last_name,
                enabled: 1,
                send_welcome_email: 1,
                user_type: 'System User',
                roles: [{ role: 'Employee' }],
            }

            const userResponse = (await apiRegisterNewUser<UserData, typeof userPayload>(userPayload)) as { data: UserData }
            if (!userResponse.data) {
                throw new Error(
                    'Failed to create user. Unexpected response format.',
                )
            }
            const response = (await apiCreateEmployee({
                ...values,
                user_id: values.user_email,
            })) as { data: { name: string } }
            const name = response.data.name
            const addImageResponse = await apiAddEmployeeImage(
                name,
                { image: values.image },
            )
            if (!addImageResponse) {
                throw new Error('Failed to link image to employee.')
            }

            if (response) {
                const employeeDetailResponse = await apiCreateEmployeeDetails({
                    employee_number: response.data.name,
                    gender: values.gender,
                    first_name: values.first_name,
                    middle_name: values.middle_name,
                    surname: values.last_name,
                    dob: values.date_of_birth,
                })
                if (employeeDetailResponse) {
                    toast.push(
                        <Notification type="success">
                            Employee created!
                        </Notification>,
                        { placement: 'top-center' },
                    )
                    await refreshEmployeeList()
                    navigate('/concepts/customers/employee-list')
                } else {
                    throw new Error('Failed to create employee details.')
                }
            }
        } catch (error) {
            console.error('Error creating employee:', error)
            toast.push(
                <Notification type="danger">
                    Failed to create employee!
                </Notification>,
                { placement: 'top-center' },
            )
        } finally {
            setIsSubmiting(false)
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Employee discarded!</Notification>,
            { placement: 'top-center' },
        )
        navigate('/concepts/customers/employee-list')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <CustomerForm
                newEmployee
                defaultValues={employeeData || {
                    employee: '',
                    personal_email: '',
                    salutation: '',
                    first_name: '',
                    middle_name: '',
                    last_name: '',
                    date_of_birth: '',
                    gender: '',
                    image: '',

                    date_of_joining: '',
                    effectiveFrom: '',
                    position: '',
                    orgStructure: '',
                    custom_location: '',
                    department: '',
                    designation: '',
                    grade: '',
                    payroll_cost_center: '',
                    user_email: '',
                    // custom_reporting_manager: '',
                    reports_to: '',
                    custom_functional_manager: '',
                    custom_peoples_manager: '',

                    calendar: '',
                    custom_attendance: '',
                    custom_shift_type: '',
                    custom_shift_group: '',
                    custom_employment_status: '',
                    final_confirmation_date: '',
                    custom_full_part_time: '',
                    custom_contract_type: '',
                    contract_end_date: '',
                    custom_contractor: '',
                    custom_experience_in_category: '',
                    custom_experience_in_months: '',
                    notice_number_of_days: '30',
                    custom_secretary: '',
                    custom_old_employee_number: '',
                    originalHireDate: '',

                    pan_number: '',
                    custom_pf_number: '',
                    custom_esi_number: '',
                    custom_pt_location: '',
                    custom_gl_code: '',
                    salary_mode: '',
                    custom_applied_from: '',
                    custom_pay_group: '',
                }
                }
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
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
            </CustomerForm>
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

export default CustomerEdit
