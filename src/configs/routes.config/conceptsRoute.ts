import { lazy } from 'react'
import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const conceptsRoute: Routes = [
    {
        key: 'concepts.dashboards',
        path: `${CONCEPTS_PREFIX_PATH}/dashboards`,
        component: lazy(() => import('@/views/concepts/dashboards/Dashboards')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: 'concepts.customers.employeeList',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-list`,
        component: lazy(
            () => import('@/views/concepts/customers/EmployeeList'),
        ),
        authority: [ADMIN, USER],
    },
    // {
    //     key: 'concepts.customers.customerEdit',
    //     path: `${CONCEPTS_PREFIX_PATH}/customers/customer-edit/:id`,
    //     component: lazy(
    //         () => import('@/views/concepts/customers/CustomerEdit'),
    //     ),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         header: {
    //             title: 'Edit customer',
    //             description:
    //                 'Manage customer details, purchase history, and preferences.',
    //             contained: true,
    //         },
    //         footer: false,
    //     },
    // },
    {
        key: 'concepts.customers.customerCreate',
        path: `${CONCEPTS_PREFIX_PATH}/customers/customer-create`,
        component: lazy(
            () => import('@/views/concepts/customers/CustomerCreate'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create Employee',
                description:
                    'Manage customer details, track purchases, and update preferences easily.',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.customers.details',
        path: `${CONCEPTS_PREFIX_PATH}/customers/details/:name`,
        component: lazy(() => import('@/views/concepts/customers/Details')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },

    {
        key: 'concepts.customers.contactDetails',
        path: `${CONCEPTS_PREFIX_PATH}/customers/contact-details/:name`,
        component: lazy(
            () => import('@/views/concepts/customers/ContactDetails'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Contact Details',
                description: 'Employee Contact Details',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.customers.familyDetails.list',
        path: `${CONCEPTS_PREFIX_PATH}/customers/family-details/list/:name`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/FamilyDetails/FamilyDetailList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.familyDetails.create',
        path: `${CONCEPTS_PREFIX_PATH}/customers/family-details/create/:name`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/FamilyDetails/FamilyDetailCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.familyDetails.edit',
        path: `${CONCEPTS_PREFIX_PATH}/customers/family-details/edit/:name`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/FamilyDetails/FamilyDetailEdit'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.educationDetails.create',
        path: `${CONCEPTS_PREFIX_PATH}/customers/education-details/create/:name`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EducationDetails/EducationDetailCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.educationDetails.list',
        path: `${CONCEPTS_PREFIX_PATH}/customers/education-details/list/:name`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EducationDetails/EducationDetailList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },

    {
        key: 'concepts.customers.educationDetails.edit',
        path: `${CONCEPTS_PREFIX_PATH}/customers/education-details/edit/:name`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EducationDetails/EducationDetailEdit'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.passportDetails',
        path: `${CONCEPTS_PREFIX_PATH}/customers/passport-details/:name`,
        component: lazy(
            () => import('@/views/concepts/customers/PassportDetails'),
        ),
        authority: [ADMIN, USER],
        meta: {
            // pageContainerType: 'contained',
            header: {
                title: '',
                description: 'Employee Passport Detail Form',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeeDetails',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-details/:name`,
        component: lazy(
            () => import('@/views/concepts/customers/EmployeeDetails'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.pastEmploymentDetails.list',
        path: `${CONCEPTS_PREFIX_PATH}/customers/past-employment-details/list/:name`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/PastEmploymentDetails/PastEmploymentDetailList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.pastEmploymentDetails.create',
        path: `${CONCEPTS_PREFIX_PATH}/customers/past-employment-details/create/:name`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/PastEmploymentDetails/PastEmploymentDetailCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.pastEmploymentDetails.edit',
        path: `${CONCEPTS_PREFIX_PATH}/customers/past-employment-details/edit/:name`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/PastEmploymentDetails/PastEmploymentDetailEdit'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.bankDetails',
        path: `${CONCEPTS_PREFIX_PATH}/customers/bank-details/:name`,
        component: lazy(() => import('@/views/concepts/customers/BankDetails')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.drivingLicense',
        path: `${CONCEPTS_PREFIX_PATH}/customers/driving-license/:name`,
        component: lazy(
            () => import('@/views/concepts/customers/DrivingLicense'),
        ),
        authority: [ADMIN, USER],
        meta: {
            // pageContainerType: 'contained',
            header: {
                title: '',
                description: 'Employee Driving License Form',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeeOnboarding',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-onboarding`,
        component: lazy(
            () => import('@/views/concepts/customers/EmployeeOnboarding'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },

    {
        key: 'concepts.customers.employeeMovement',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-movement`,
        component: lazy(
            () => import('@/views/concepts/customers/EmployeeMovement'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Employee Movement',
                contained: true,
            },
            footer: false,
        },
    },

    // Separation and Transfer

    {
        key: 'concepts.customers.employeeSeparationList',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-separation-list`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EmployeeSeparation/EmployeeSeparationList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeeSeparationCreate',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-separation-create`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EmployeeSeparation/EmployeeSeparationCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeeTransferList',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-transfer-list`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EmployeeTransfer/EmployeeTransferList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeeTransferCreate',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-transfer-create`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EmployeeTransfer/EmployeeTransferCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeeAttendanceList',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-attendance-list`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EmployeeAttendance/EmployeeAttendanceList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeeAttendanceCreate',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-attendance-create`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EmployeeAttendance/EmployeeAttendanceCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeePromotion.list',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-promotion/list`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EmployeePromotion/EmployeePromotionList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeePromotion.create',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-promotion/create`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EmployeePromotion/EmployeePromotionCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeeSkillMap.list',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-skill-map/list`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EmployeeSkillMap/EmployeeSkillMapList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeeSkillMap.create',
        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-skill-map/create`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/customers/EmployeeSkillMap/EmployeeSkillMapCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },

    {
        key: 'concepts.leave.leaveList',
        path: `${CONCEPTS_PREFIX_PATH}/leave/leave-list`,
        component: lazy(() => import('@/views/concepts/leave/LeaveList')),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Leave',
                // description:
                //     'Quickly manage product details, stock, and availability.',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.leave.leaveCreate',
        path: `${CONCEPTS_PREFIX_PATH}/leave/leave-create`,
        component: lazy(() => import('@/views/concepts/leave/LeaveCreate')),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Create Leave',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.leave.leaveAllocation.list',
        path: `${CONCEPTS_PREFIX_PATH}/leave/leave-allocation/list`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/leave/LeaveAllocation/LeaveAllocationList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Leave Allocation',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.leave.leaveApplication.list',
        path: `${CONCEPTS_PREFIX_PATH}/leave/leave-application/list`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/leave/LeaveApplication/LeaveApplicationList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Leave Application',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.leave.leaveApplication',
        path: `${CONCEPTS_PREFIX_PATH}/leave/leave-application/:id`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/leave/LeaveApplication/LeaveApplicationEdit'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Leave Application',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.calendar',
        path: `${CONCEPTS_PREFIX_PATH}/calendar`,
        component: lazy(() => import('@/views/concepts/calendar/Calendar')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: 'concepts.attendance.tracker',
        path: `${CONCEPTS_PREFIX_PATH}/attendance/tracker`,
        component: lazy(() => import('@/views/concepts/attendance/Tracker')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: 'concepts.attendance.regularization',
        path: `${CONCEPTS_PREFIX_PATH}/attendance/regularization`,
        component: lazy(
            () => import('@/views/concepts/attendance/Regularisation'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
            footer: false,
        },
    },
    {
        key: 'concepts.attendance.regularization',
        path: `${CONCEPTS_PREFIX_PATH}/attendance/regularization-create`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/attendance/Regularisation/AttendanceRegularisationCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'New Attendance Regularisation',
                contained: true,
            },
            footer: false,
        },
    },

    // Holiday Master
    {
        key: 'concepts.holidayList.holidayList',
        path: `${CONCEPTS_PREFIX_PATH}/holidayList/holiday-list`,
        component: lazy(
            () => import('@/views/concepts/holidayList/HolidayList'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: 'concepts.holidayList.holiday',
        path: `${CONCEPTS_PREFIX_PATH}/holidayList/holiday/:id`,
        component: lazy(() => import('@/views/concepts/holidayList/Holiday')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },

    //Salary Adjustments
    {
        key: 'concepts.salaryAdjustment',
        path: `${CONCEPTS_PREFIX_PATH}/salaryAdjustment`,
        component: lazy(
            () => import('@/views/concepts/salaryAdjustment/SalaryAdjustment'),
        ),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },

    {
        key: 'concepts.confirmation.confirmationAppraisal',
        path: `${CONCEPTS_PREFIX_PATH}/confirmation/confirmation-appraisal`,
        component: lazy(
            () => import('@/views/concepts/confirmation/ConfirmationAppraisal'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: '',
                description:
                    'Manage customer details, track purchases, and update preferences easily.',
                contained: true,
            },
            footer: false,
        },
    },

    // Payroll

    {
        key: 'concepts.payroll.list',
        path: `${CONCEPTS_PREFIX_PATH}/payroll/listTaxExemptionDeclaration`,
        component: lazy(
            () =>
                import('@/views/concepts/payroll/TaxExemptionDeclarationList'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: '',
                description: '',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.payroll.create',
        path: `${CONCEPTS_PREFIX_PATH}/payroll/createTaxExemptionDeclaration`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/payroll/TaxExemptionDeclarationCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: '',
                description: '',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.payroll.taxExemptionProofSubmission',
        path: `${CONCEPTS_PREFIX_PATH}/payroll/tax-exemption-proof-submission`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/payroll/TaxExemptionProofSubmission/ProofSubmissionList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: '',
                description: '',
                contained: true,
            },
            footer: false,
        },
    },
    {
        key: 'concepts.payroll.taxExemptionProofSubmission',
        path: `${CONCEPTS_PREFIX_PATH}/payroll/tax-exemption-proof-submission/create`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/payroll/TaxExemptionProofSubmission/ProofSubmissionCreate'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'New Employee Tax Exemption Proof Submission',
                description: '',
                contained: true,
            },
            footer: false,
        },
    },

    // Exit Interview
    {
        key: 'concepts.exitInterview.list',
        path: `${CONCEPTS_PREFIX_PATH}/exitInterview/list`,
        component: lazy(
            () => import('@/views/concepts/exitInterview/ExitInterviewList'),
        ),

        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    {
        key: 'concepts.exitInterview.create',
        path: `${CONCEPTS_PREFIX_PATH}/exitInterview/create`,
        component: lazy(
            () => import('@/views/concepts/exitInterview/ExitInterviewCreate'),
        ),

        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },

    //Performance
    {
        key: 'concepts.performance.employeePerformanceFeedback',
        path: `${CONCEPTS_PREFIX_PATH}/performance/employee-performance-feedback`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/performance/EmployeePerformanceFeedback/PerformanceFeedbackList'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: '',
                description: '',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.performance.employeePerformanceFeedback',
        path: `${CONCEPTS_PREFIX_PATH}/performance/employee-performance-feedback/create`,
        component: lazy(
            () =>
                import(
                    '@/views/concepts/performance/EmployeePerformanceFeedback/PerformanceFeedbackForm'
                ),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'New Employee Performance Feedback',
                description: '',
                contained: true,
            },
        },
    },

    // Appraisal
    {
        key: 'concepts.appraisal.list',
        path: `${CONCEPTS_PREFIX_PATH}/appraisal/list`,
        component: lazy(
            () => import('@/views/concepts/appraisal/AppraisalList'),
        ),

        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    {
        key: 'concepts.appraisal.create',
        path: `${CONCEPTS_PREFIX_PATH}/appraisal/create`,
        component: lazy(
            () => import('@/views/concepts/appraisal/AppraisalCreate'),
        ),

        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },

    //Resignation
    {
        key: 'concepts.customers.employeeDeactivation.recordResignation.list',
        path: `${CONCEPTS_PREFIX_PATH}/customers/record-resignation/list`,
        component: lazy(
            () => import('@/views/concepts/customers/EmployeeDeactivation/RecordResignation/ResignationList'),
        ),

        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },

    {
        key: 'concepts.customers.employeeDeactivation.recordResignation.create',
        path: `${CONCEPTS_PREFIX_PATH}/customers/record-resignation/create`,
        component: lazy(
            () => import('@/views/concepts/customers/EmployeeDeactivation/RecordResignation/ResignationForm'),
        ),

        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    }
]

export default conceptsRoute
