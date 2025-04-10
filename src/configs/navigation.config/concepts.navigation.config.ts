import { CONCEPTS_PREFIX_PATH } from '@/constants/route.constant'
import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_COLLAPSE,
    NAV_ITEM_TYPE_ITEM,
} from '@/constants/navigation.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { NavigationTree } from '@/@types/navigation'

const conceptsNavigationConfig: NavigationTree[] = [
    {
        key: 'concepts',
        path: '',
        title: 'Concepts',
        translateKey: 'nav.concepts',
        icon: 'concepts',
        type: NAV_ITEM_TYPE_TITLE,
        authority: [ADMIN, USER],
        meta: {
            horizontalMenu: {
                layout: 'columns',
                columns: 4,
            },
        },
        subMenu: [
            {
                key: 'concepts.dashboards',
                path: `${CONCEPTS_PREFIX_PATH}/dashboards`,
                title: 'Dashboards',
                translateKey: 'nav.dashboards',
                icon: 'dashboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.dashboardDesc',
                        label: 'Schedule and events',
                    },
                },
                subMenu: [],
            },

            {
                key: 'concepts.customers',
                path: '',
                title: 'Employee',
                translateKey: 'nav.conceptsCustomers.customers',
                icon: 'Employee',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsCustomers.customersDesc',
                        label: 'Employee management',
                    },
                },
                subMenu: [
                    {
                        key: 'concepts.customers.employeeList',
                        path: `${CONCEPTS_PREFIX_PATH}/customers/employee-list`,
                        title: 'Employee List',
                        translateKey: 'nav.conceptsCustomers.employeeList',
                        icon: 'customerList',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsCustomers.employeeListDesc',
                                label: 'List of all employee',
                            },
                        },
                        subMenu: [],
                    },
                    // {
                    //     key: 'concepts.customers.customerEdit',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/customer-edit/1`,
                    //     title: 'Customer Edit',
                    //     translateKey: 'nav.conceptsCustomers.customerEdit',
                    //     icon: 'customerEdit',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.customerEditDesc',
                    //             label: 'Edit customer info',
                    //         },
                    //     },
                    //     subMenu: [],
                    // },
                    {
                        key: 'concepts.customers.customerCreate',
                        path: `${CONCEPTS_PREFIX_PATH}/customers/customer-create`,
                        title: 'Employee Create',
                        translateKey: 'nav.conceptsCustomers.customerCreate',
                        icon: 'customerCreate',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsCustomers.customerCreateDesc',
                                label: 'Add a new customer',
                            },
                        },
                        subMenu: [],
                    },
                    // {
                    //     key: 'concepts.customers.details',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/details/HR-EMP-00001`,
                    //     title: 'E-Details',
                    //     translateKey: 'nav.conceptsCustomers.details',
                    //     icon: 'customerDetails',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.customerDetailsDesc',
                    //             label: 'Detailed customer info',
                    //         },
                    //     },
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'concepts.customers.contactDetails',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/contact-details/HR-EMP-00007`,
                    //     title: 'Contact Details',
                    //     translateKey: 'nav.conceptsCustomers.contactDetails',
                    //     icon: 'customerList',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.contactDetailsDesc',
                    //             label: 'Contact Details',
                    //         },
                    //     },
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'concepts.customers.familyDetails',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/family-details`,
                    //     title: 'Family Details',
                    //     translateKey: 'nav.conceptsCustomers.familyDetails',
                    //     icon: 'customerList',
                    //     type: NAV_ITEM_TYPE_COLLAPSE,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.familyDetailsDesc',
                    //             label: 'Family Details',
                    //         },
                    //     },
                    //     subMenu: [
                    //         {
                    //             key: 'concepts.customers.familyDetails.list',
                    //             path: `${CONCEPTS_PREFIX_PATH}/customers/family-details/list/HR-EMP-00007`,
                    //             title: 'List',
                    //             translateKey:
                    //                 'nav.conceptsCustomers.familyDetails.list',
                    //             icon: 'customerList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsCustomers.familyDetails.listDesc',
                    //                     label: 'View all family detail',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //         {
                    //             key: 'concepts.customers.familyDetails.create',
                    //             path: `${CONCEPTS_PREFIX_PATH}/customers/family-details/create/HR-EMP-00007`,
                    //             title: 'Create',
                    //             translateKey:
                    //                 'nav.conceptsCustomers.familyDetails.create',
                    //             icon: 'customerList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsCustomers.familyDetails.listDesc',
                    //                     label: 'Add new family details',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //         {
                    //             key: 'concepts.customers.familyDetails.edit',
                    //             path: `${CONCEPTS_PREFIX_PATH}/customers/family-details/edit/1`,
                    //             title: 'Edit',
                    //             translateKey:
                    //                 'nav.conceptsCustomers.familyDetails.edit',
                    //             icon: 'customerList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsCustomers.familyDetails.editDesc',
                    //                     label: 'Edit family details',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //     ],
                    // },
                    // {
                    //     key: 'concepts.customers.educationDetails',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/education-details`,
                    //     title: 'Education Details',
                    //     translateKey: 'nav.conceptsCustomers.educationDetails',
                    //     icon: 'customerList',
                    //     type: NAV_ITEM_TYPE_COLLAPSE,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.educationDetailsDesc',
                    //             label: 'Education Details',
                    //         },
                    //     },
                    //     subMenu: [
                    //         {
                    //             key: 'concepts.customers.educationDetails.list',
                    //             path: `${CONCEPTS_PREFIX_PATH}/customers/education-details/list/HR-EMP-00007`,
                    //             title: 'List',
                    //             translateKey:
                    //                 'nav.conceptsCustomers.educationDetails.list',
                    //             icon: 'customerList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsCustomers.educationDetails.listDesc',
                    //                     label: 'View all education detail',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //         {
                    //             key: 'concepts.customers.educationDetails.create',
                    //             path: `${CONCEPTS_PREFIX_PATH}/customers/education-details/create/HR-EMP-00007`,
                    //             title: 'Create',
                    //             translateKey:
                    //                 'nav.conceptsCustomers.educationDetails.create',
                    //             icon: 'customerList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsCustomers.educationDetails.listDesc',
                    //                     label: 'Add new education details',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //         {
                    //             key: 'concepts.customers.educationDetails.edit',
                    //             path: `${CONCEPTS_PREFIX_PATH}/customers/education-details/edit/1`,
                    //             title: 'Edit',
                    //             translateKey:
                    //                 'nav.conceptsCustomers.educationDetails.edit',
                    //             icon: 'customerList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsCustomers.educationDetails.editDesc',
                    //                     label: 'Edit education details',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //     ],
                    // },
                    // {
                    //     key: 'concepts.customers.passportDetails',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/passport-details/HR-EMP-00007`,
                    //     title: 'Passport Details',
                    //     translateKey: 'nav.conceptsCustomers.passportDetails',
                    //     icon: 'customerList',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.passportDetailsDesc',
                    //             label: 'Passport Details',
                    //         },
                    //     },
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'concepts.customers.employeeDetails',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/employee-details/HR-EMP-00007`,
                    //     title: 'Employee Details',
                    //     translateKey: 'nav.conceptsCustomers.employeeDetails',
                    //     icon: 'customerList',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.employeeDetailsDesc',
                    //             label: 'Employee Details',
                    //         },
                    //     },
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'concepts.customers.pastEmploymentDetails',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/past-employment-details`,
                    //     title: 'Past Employment Details',
                    //     translateKey:
                    //         'nav.conceptsCustomers.pastEmploymentDetails',
                    //     icon: 'customerList',
                    //     type: NAV_ITEM_TYPE_COLLAPSE,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.pastEmploymentDetailsDesc',
                    //             label: 'Past Employment Details',
                    //         },
                    //     },
                    //     subMenu: [
                    //         {
                    //             key: 'concepts.customers.pastEmploymentDetails.list',
                    //             path: `${CONCEPTS_PREFIX_PATH}/customers/past-employment-details/list/HR-EMP-00007`,
                    //             title: 'List',
                    //             translateKey:
                    //                 'nav.conceptsCustomers.pastEmploymentDetails.list',
                    //             icon: 'customerList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsCustomers.pastEmploymentDetails.listDesc',
                    //                     label: 'View all Past Employment Details',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //         {
                    //             key: 'concepts.customers.pastEmploymentDetails.create',
                    //             path: `${CONCEPTS_PREFIX_PATH}/customers/past-employment-details/create/HR-EMP-00007`,
                    //             title: 'Create',
                    //             translateKey:
                    //                 'nav.conceptsCustomers.pastEmploymentDetails.create',
                    //             icon: 'customerList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsCustomers.pastEmploymentDetails.createDesc',
                    //                     label: 'Add new Past Employment Details',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //         {
                    //             key: 'concepts.customers.pastEmploymentDetails.edit',
                    //             path: `${CONCEPTS_PREFIX_PATH}/customers/past-employment-details/edit/1`,
                    //             title: 'Edit',
                    //             translateKey:
                    //                 'nav.conceptsCustomers.pastEmploymentDetails.edit',
                    //             icon: 'customerList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsCustomers.pastEmploymentDetails.editDesc',
                    //                     label: 'Edit Past Employment Details',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //     ],
                    // },
                    // {
                    //     key: 'concepts.customers.bankDetails',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/bank-details/HR-EMP-00007`,
                    //     title: 'Bank Details',
                    //     translateKey: 'nav.conceptsCustomers.bankDetails',
                    //     icon: 'customerList',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.bankDetailsDesc',
                    //             label: 'Bank Details',
                    //         },
                    //     },
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'concepts.customers.drivingLicense',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/driving-license/HR-EMP-00007`,
                    //     title: 'Driving License',
                    //     translateKey: 'nav.conceptsCustomers.drivingLicense',
                    //     icon: 'customerList',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.drivingLicenseDesc',
                    //             label: 'Driving License',
                    //         },
                    //     },
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'concepts.customers.employeeOnboarding',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/employee-onboarding`,
                    //     title: 'Employee Onboarding',
                    //     translateKey:
                    //         'nav.conceptsCustomers.employeeOnboarding',
                    //     icon: 'customerList',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.employeeOnboardingDesc',
                    //             label: 'Employee Onboarding',
                    //         },
                    //     },
                    //     subMenu: [],
                    // },
                    // {
                    //     key: 'concepts.customers.employeeMovement',
                    //     path: `${CONCEPTS_PREFIX_PATH}/customers/employee-movement`,
                    //     title: 'Employee Movement',
                    //     translateKey: 'nav.conceptsCustomers.employeeMovement',
                    //     icon: 'customerList',
                    //     type: NAV_ITEM_TYPE_ITEM,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsCustomers.employeeMovementDesc',
                    //             label: 'Employee Movement',
                    //         },
                    //     },
                    //     subMenu: [],
                    // },
                ],
            },
            //Leave
            {
                key: 'concepts.leave',
                path: '',
                title: 'Leave',
                translateKey: 'nav.conceptsLeave.leave',
                icon: 'fileManager',
                type: NAV_ITEM_TYPE_COLLAPSE,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.conceptsLeave.LeaveDesc',
                        label: 'Product inventory management',
                    },
                },
                subMenu: [
                    // {
                    //     key: 'concepts.leave.leaveTypes',
                    //     path: `${CONCEPTS_PREFIX_PATH}/leave/leave-types`,
                    //     title: 'Leave Types',
                    //     translateKey: 'nav.conceptsLeave.leaveTypes',
                    //     icon: 'leaveTypes',
                    //     type: NAV_ITEM_TYPE_COLLAPSE,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsLeave.leaveTypesDesc',
                    //             label: 'All Leave Types',
                    //         },
                    //     },
                    //     subMenu: [
                    //         {
                    //             key: 'concepts.leave.leaveList',
                    //             path: `${CONCEPTS_PREFIX_PATH}/leave/leave-list`,
                    //             title: 'List',
                    //             translateKey: 'nav.conceptsLeave.leaveList',
                    //             icon: 'leaveList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsLeave.leaveListDesc',
                    //                     label: 'All Leave',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //         {
                    //             key: 'concepts.leave.leaveCreate',
                    //             path: `${CONCEPTS_PREFIX_PATH}/leave/leave-create`,
                    //             title: 'Create',
                    //             translateKey: 'nav.conceptsLeave.leaveCreate',
                    //             icon: 'leaveCreate',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsLeave.leaveCreateDesc',
                    //                     label: 'All Leave Create',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //     ],
                    // },
                    // {
                    //     key: 'concepts.leave.leaveAllocation',
                    //     path: `${CONCEPTS_PREFIX_PATH}/leave/leave-allocation`,
                    //     title: 'Leave Allocation',
                    //     translateKey: 'nav.conceptsLeave.leaveAllocation',
                    //     icon: 'leaveAllocation',
                    //     type: NAV_ITEM_TYPE_COLLAPSE,
                    //     authority: [ADMIN, USER],
                    //     meta: {
                    //         description: {
                    //             translateKey:
                    //                 'nav.conceptsLeave.leaveallocationDesc',
                    //             label: 'All Leave Allocation',
                    //         },
                    //     },
                    //     subMenu: [
                    //         {
                    //             key: 'concepts.leave.leaveAllocation.list',
                    //             path: `${CONCEPTS_PREFIX_PATH}/leave/leave-allocation/list`,
                    //             title: 'List',
                    //             translateKey:
                    //                 'nav.conceptsLeave.leaveAllocation.list',
                    //             icon: 'leaveList',
                    //             type: NAV_ITEM_TYPE_ITEM,
                    //             authority: [ADMIN, USER],
                    //             meta: {
                    //                 description: {
                    //                     translateKey:
                    //                         'nav.conceptsLeave.leaveallocation.listDesc',
                    //                     label: 'All Leave',
                    //                 },
                    //             },
                    //             subMenu: [],
                    //         },
                    //     ],
                    // },
                    {
                        key: 'concepts.leave.leaveApplication',
                        path: `${CONCEPTS_PREFIX_PATH}/leave/leave-application`,
                        title: 'Leave Application',
                        translateKey: 'nav.conceptsLeave.leaveApplication',
                        icon: 'leaveApplication',
                        type: NAV_ITEM_TYPE_COLLAPSE,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey:
                                    'nav.conceptsLeave.leaveapplicationDesc',
                                label: 'All Leave Allocation',
                            },
                        },
                        subMenu: [
                            {
                                key: 'concepts.leave.leaveApplication.list',
                                path: `${CONCEPTS_PREFIX_PATH}/leave/leave-application/list`,
                                title: 'List',
                                translateKey:
                                    'nav.conceptsLeave.leaveApplication.list',
                                icon: 'leaveList',
                                type: NAV_ITEM_TYPE_ITEM,
                                authority: [ADMIN, USER],
                                meta: {
                                    description: {
                                        translateKey:
                                            'nav.conceptsLeave.leaveapplication.listDesc',
                                        label: 'All Leave',
                                    },
                                },
                                subMenu: [],
                            },
                        ],
                    },
                ],
            },
            {
                key: 'concepts.calendar',
                path: `${CONCEPTS_PREFIX_PATH}/calendar`,
                title: 'Calendar',
                translateKey: 'nav.calendar',
                icon: 'calendar',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.calendarDesc',
                        label: 'Schedule and events',
                    },
                },
                subMenu: [],
            },
            {
                key: 'concepts.attendance',
                path: '',
                title: 'Attendance',
                translateKey: 'nav.attendance',
                icon: 'attendance',
                type: NAV_ITEM_TYPE_COLLAPSE, // Changed from ITEM to COLLAPSE
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.attendance',
                        label: 'Attendance Tracker',
                    },
                },
                subMenu: [
                    {
                        key: 'concepts.attendance.tracker',
                        path: `${CONCEPTS_PREFIX_PATH}/attendance/tracker`,
                        title: 'Tracker',
                        translateKey: 'nav.attendance.tracker',
                        icon: 'attendance',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey: 'nav.attendance.tracker',
                                label: 'Attendance Tracker',
                            },
                        },
                        subMenu: [],
                    },
                    {
                        key: 'concepts.attendance.regularization',
                        path: `${CONCEPTS_PREFIX_PATH}/attendance/regularization`,
                        title: 'Regularization',
                        translateKey: 'nav.attendance.regularization',
                        icon: 'attendance',
                        type: NAV_ITEM_TYPE_ITEM,
                        authority: [ADMIN, USER],
                        meta: {
                            description: {
                                translateKey: 'nav.attendance.regularization',
                                label: 'Attendance Regularization',
                            },
                        },
                        subMenu: [],
                    },
                ],
            },
            {
                key: 'concepts.holidayList.holidayList',
                path: `${CONCEPTS_PREFIX_PATH}/holidayList/holiday-list`,
                title: 'Holiday Master',
                translateKey: 'nav.holidayLsit.holidayList',
                icon: 'calendar',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN, USER],
                meta: {
                    description: {
                        translateKey: 'nav.holidayDesc',
                        label: 'Schedule and events',
                    },
                },
                subMenu: [],
            },
            // {
            //     key: 'concepts.holidayList.holiday',
            //     path: `${CONCEPTS_PREFIX_PATH}/holidayList/holiday/Hyderabad`,
            //     title: '',
            //     translateKey: 'nav.holidayLsit.holiday',
            //     icon: 'calendar',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, USER],
            //     meta: {
            //         description: {
            //             translateKey: 'nav.holidayDesc',
            //             label: 'Schedule and events',
            //         },
            //     },
            //     subMenu: [],
            // },
            // {
            //     key: 'concepts.salaryAdjustment',
            //     path: `${CONCEPTS_PREFIX_PATH}/salaryAdjustment`,
            //     title: 'Salary Adjustment',
            //     translateKey: 'nav.SalaryAdjustment',
            //     icon: 'calendar',
            //     type: NAV_ITEM_TYPE_ITEM,
            //     authority: [ADMIN, USER],
            //     meta: {
            //         description: {
            //             translateKey: 'nav.holidayDesc',
            //             label: 'Schedule and events',
            //         },
            //     },
            //     subMenu: [],
            // },
            // {
            //     key: 'concepts.confirmation',
            //     path: '',
            //     title: 'Confirmation',
            //     translateKey: 'nav.conceptsConfirmation.confirmation',
            //     icon: 'fileManager',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN, USER],
            //     meta: {
            //         description: {
            //             translateKey:
            //                 'nav.conceptsConfirmation.confirmationDesc',
            //             label: 'Employee Appraisal Confirmation',
            //         },
            //     },
            //     subMenu: [
            //         {
            //             key: 'concepts.confirmation.confirmationAppraisal',
            //             path: `${CONCEPTS_PREFIX_PATH}/confirmation/confirmation-appraisal`,
            //             title: 'Confirmation Appraisal',
            //             translateKey:
            //                 'nav.conceptsConfirmation.confirmationAppraisal',
            //             icon: 'confirmationAppraisal',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN, USER],
            //             meta: {
            //                 description: {
            //                     translateKey:
            //                         'nav.conceptsConfirmation.confirmationAppraisalDesc',
            //                     label: '',
            //                 },
            //             },
            //             subMenu: [],
            //         },
            //     ],
            // },
            // {
            //     key: 'concepts.payroll',
            //     path: '',
            //     title: 'Payroll',
            //     translateKey: 'nav.payroll',
            //     icon: 'calendar',
            //     type: NAV_ITEM_TYPE_COLLAPSE,
            //     authority: [ADMIN, USER],
            //     meta: {
            //         description: {
            //             translateKey: 'nav.payrollDesc',
            //             label: '',
            //         },
            //     },
            //     subMenu: [
            //         {
            //             key: 'concepts.payroll.list',
            //             path: `${CONCEPTS_PREFIX_PATH}/payroll/list`,
            //             title: 'Employee Tax Exemption Declaration',
            //             translateKey: 'nav.payroll.list',
            //             icon: 'attendance',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN, USER],
            //             meta: {
            //                 description: {
            //                     translateKey: 'nav.payroll.list',
            //                     label: 'Payroll List',
            //                 },
            //             },
            //             subMenu: [],
            //         },
            //         {
            //             key: 'concepts.payroll.taxExemptionProofSubmission',
            //             path: `${CONCEPTS_PREFIX_PATH}/payroll/tax-exemption-proof-submission`,
            //             title: 'Employee Tax Exemption Proof Submission',
            //             translateKey:
            //                 'nav.conceptsPayroll.taxExemptionProofSubmission',
            //             icon: 'Tax',
            //             type: NAV_ITEM_TYPE_ITEM,
            //             authority: [ADMIN, USER],
            //             meta: {
            //                 description: {
            //                     translateKey:
            //                         'nav.conceptsPayroll.taxExemptionProofSubmissionDesc',
            //                     label: '',
            //                 },
            //             },
            //             subMenu: [],
            //         },
            //     ],
            // },
        ],
    },
]

export default conceptsNavigationConfig
