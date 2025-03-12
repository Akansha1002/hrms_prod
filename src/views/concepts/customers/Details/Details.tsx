import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Loading from '@/components/shared/Loading'
import { apiGetCustomer, apiUpdateEmployee } from '@/services/CustomersService'
import useSWR from 'swr'
import { useNavigate, useParams } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { Employee, GetEmployeesListResponse } from '../EmployeeList/types'
import PersonalInfoSection from './components/PersonalInfoSection'
import OrganizationSection from './components/OrganizationSection'
import PayRollSection from './components/PayrollSection'
import AdditionalInformation from './components/AdditionalInformation'
import EmployeeDetailHeader from './components/EmployeeDetailHeader'
import { useState } from 'react'

const { TabNav, TabList, TabContent } = Tabs

const Details = () => {
    const { name } = useParams()
    const navigate = useNavigate()


    const [isSubmitting, setIsSubmitting] = useState(false)
    const [hasChanges, setHasChanges] = useState(false);
    const [updatedValues, setUpdatedValues] = useState<Partial<Employee>>({});

    const { data, isLoading, mutate } = useSWR(
        ['/api/customers', { name: name as string }],
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ([_, params]) => apiGetCustomer<GetEmployeesListResponse, { name: string }>(params),
        {
            revalidateOnFocus: false,
            revalidateIfStale: false,
            evalidateOnFocus: false,
        },
    )

    const employeeData: Employee | undefined = data?.data

    const getDefaultValues = () => {
        if (employeeData) {
            return {
                ...employeeData
            }
        }
        return {}
    }

    const handleFormSubmit = async () => {
        if (!employeeData) return
        setIsSubmitting(true)

        try {
            await apiUpdateEmployee(employeeData.name, updatedValues)
            toast.push(<Notification type="success">Employee details updated successfully!</Notification>, {
                placement: 'top-center',
            })
            mutate()
            setHasChanges(false);
        } catch (error) {
            console.error('Update Error:', error)
            toast.push(<Notification type="danger">Failed to update employee details</Notification>, {
                placement: 'top-center',
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleEmployeeDetailsClick = () => {
        navigate(`/concepts/customers/employee-details/${name}`)
    }

    const handleFamilyDetailsClick = () => {
        navigate(`/concepts/customers/family-details/list/${name}`)
    }

    const handleEducationDetailsClick = () => {
        navigate(`/concepts/customers/education-details/list/${name}`)
    }

    const handlePastEmploymentDetailsClick = () => {
        navigate(`/concepts/customers/past-employment-details/list/${name}`)
    }

    const handleContactDetailsClick = () => {
        navigate(`/concepts/customers/contact-details/${name}`)
    }

    const handleBankDetailsClick = () => {
        navigate(`/concepts/customers/bank-details/${name}`)
    }

    const handlePassportDetailsClick = () => {
        navigate(`/concepts/customers/passport-details/${name}`)
    }

    const handleDrivingLicenseClick = () => {
        navigate(`/concepts/customers/driving-license/${name}`)
    }

    return (
        <Loading loading={isLoading || isSubmitting}>
            {!isLoading && !employeeData && (
                <div className="h-full flex flex-col items-center justify-center">
                    <h3 className="mt-8">No employee found!</h3>
                </div>
            )}
            {/* {!isEmpty(employeeData) && ( */}
            {!isLoading && employeeData && (
                <div className="flex flex-col xl:flex-row gap-4">
                    <Card className="w-full">
                        <EmployeeDetailHeader
                            data={employeeData}
                            onSave={() => handleFormSubmit()}
                            hasChanges={hasChanges}
                        />
                        <Tabs defaultValue="personal">
                            <TabList>
                                <TabNav value="personal">Personal</TabNav>
                                <TabNav value="organization">Organization</TabNav>
                                <TabNav value="additionalInfo">Additional Information</TabNav>
                                <TabNav value="payroll">Payroll</TabNav>
                                <div onClick={handleEmployeeDetailsClick}>
                                    <TabNav value="">Employee Details</TabNav>
                                </div>
                                <div onClick={handleFamilyDetailsClick}>
                                    <TabNav value="">Family Details</TabNav>
                                </div>
                                <div onClick={handleEducationDetailsClick}>
                                    <TabNav value="">Education Details</TabNav>
                                </div>
                                <div onClick={handlePastEmploymentDetailsClick}>
                                    <TabNav value="">Past Employment Details</TabNav>
                                </div>
                                <div onClick={handleBankDetailsClick}>
                                    <TabNav value="">Bank Details</TabNav>
                                </div>
                                <div onClick={handleContactDetailsClick}>
                                    <TabNav value="">Contact Details</TabNav>
                                </div>
                                <div onClick={handlePassportDetailsClick}>
                                    <TabNav value="">Passport Details</TabNav>
                                </div>
                                <div onClick={handleDrivingLicenseClick}>
                                    <TabNav value="">Driving License</TabNav>
                                </div>
                            </TabList>
                            <div className="p-4">
                                <TabContent value="personal">
                                    {<PersonalInfoSection
                                        data={employeeData}
                                        onChange={() => setHasChanges(true)}
                                        setUpdatedValues={setUpdatedValues}
                                    />}
                                </TabContent>
                                <TabContent value="organization">
                                    <OrganizationSection
                                        data={employeeData}
                                        onChange={() => setHasChanges(true)}
                                        setUpdatedValues={setUpdatedValues}
                                    />
                                </TabContent>
                                <TabContent value="additionalInfo">
                                    <AdditionalInformation
                                        data={employeeData}
                                        onChange={() => setHasChanges(true)}
                                        setUpdatedValues={setUpdatedValues}
                                    />
                                </TabContent>
                                <TabContent value="payroll">
                                    <PayRollSection
                                        data={employeeData}
                                        onChange={() => setHasChanges(true)}
                                        setUpdatedValues={setUpdatedValues}
                                    />
                                </TabContent>
                            </div>
                        </Tabs>
                    </Card>
                </div>
            )}
        </Loading>
    )
}

export default Details