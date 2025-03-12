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
    {
        key: 'concepts.customers.customerEdit',
        path: `${CONCEPTS_PREFIX_PATH}/customers/customer-edit/:id`,
        component: lazy(
            () => import('@/views/concepts/customers/CustomerEdit'),
        ),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit customer',
                description:
                    'Manage customer details, purchase history, and preferences.',
                contained: true,
            },
            footer: false,
        },
    },
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
        component: lazy(
            () => import('@/views/concepts/customers/Details'),
        ),
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
                description:
                    'Employee Contact Details',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.customers.familyDetails.list',
        path: `${CONCEPTS_PREFIX_PATH}/customers/family-details/list/:name`,
        component: lazy(
            () => import('@/views/concepts/customers/FamilyDetails/FamilyDetailList'),
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
            () => import('@/views/concepts/customers/FamilyDetails/FamilyDetailCreate'),
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
            () => import('@/views/concepts/customers/FamilyDetails/FamilyDetailEdit'),
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
            () => import('@/views/concepts/customers/EducationDetails/EducationDetailCreate'),
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
            () => import('@/views/concepts/customers/EducationDetails/EducationDetailList'),
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
            () => import('@/views/concepts/customers/EducationDetails/EducationDetailEdit'),
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
                description:
                    'Employee Passport Detail Form',
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
            () => import('@/views/concepts/customers/PastEmploymentDetails/PastEmploymentDetailList'),
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
            () => import('@/views/concepts/customers/PastEmploymentDetails/PastEmploymentDetailCreate'),
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
            () => import('@/views/concepts/customers/PastEmploymentDetails/PastEmploymentDetailEdit'),
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
        component: lazy(
            () => import('@/views/concepts/customers/BankDetails'),
        ),
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
                description:
                    'Employee Driving License Form',
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
                // description:
                //     'Quickly manage product details, stock, and availability.',
                contained: true,
            },
            footer: false,
        },
    },

    {
        key: 'concepts.leave.leaveEdit',
        path: `${CONCEPTS_PREFIX_PATH}/leave/leave-edit`,
        component: lazy(() => import('@/views/concepts/leave/LeaveEdit')),
        authority: [ADMIN, USER],
        meta: {
            header: {
                title: 'Edit Leave',
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

    // Holiday Master
    {
        key: 'concepts.holidayList.holidayList',
        path: `${CONCEPTS_PREFIX_PATH}/holidayList/holiday-list`,
        component: lazy(() => import('@/views/concepts/holidayList/HolidayList')),
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            pageBackgroundType: 'plain',
        },
    },
    // {
    //     key: 'concepts.holidayList.holiday',
    //     path: `${CONCEPTS_PREFIX_PATH}/holidayList/holiday/:id`,
    //     component: lazy(() => import('@/views/concepts/holidayList/Holiday')),
    //     authority: [ADMIN, USER],
    //     meta: {
    //         pageContainerType: 'contained',
    //         pageBackgroundType: 'plain',
    //     },
    // },

    //Salary Adjustments
    {
        key: 'concepts.salaryAdjustment',
        path: `${CONCEPTS_PREFIX_PATH}/salaryAdjustment`,
        component: lazy(() => import('@/views/concepts/salaryAdjustment/SalaryAdjustment')),
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
]

export default conceptsRoute
