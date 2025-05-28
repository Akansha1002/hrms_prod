import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import Card from '@/components/ui/Card'
import Tabs from '@/components/ui/Tabs'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { PerformanceFeedbackFormSchema } from './types'
import EmployeeDetailSection from './components/EmployeeDetailSection'
import useSWR from 'swr'
import { apiGetEmployeeNameList } from '@/services/HolidayService'
import FeedbackSection from './components/FeedbackSection'
import FeedbackRatingSection from './components/FeedbackRatingSection'

const { TabNav, TabList, TabContent } = Tabs

type PerformanceFeedbackFormProps = {
  onFormSubmit: (values: PerformanceFeedbackFormSchema) => void
  defaultValues?: PerformanceFeedbackFormSchema
} & CommonProps

const validationSchema: ZodType<PerformanceFeedbackFormSchema> = z.object({
  employee: z.string().min(1, 'Employee is required'),
  reviewer: z.string().min(1, 'Reviewer is required'),
  added_on: z.string().min(1, 'Added On is required'),
  company: z.string().min(1, 'Company is required'),

  feedback: z.string().min(1, 'Feedback is required'),

  appraisal: z.string().min(1, 'Appraisal is required'),
  total_score: z.string().optional(),
})

const PerformanceFeedbackForm = (props: PerformanceFeedbackFormProps) => {
  const {
    onFormSubmit,
    defaultValues = {},
    children,
  } = props

  const {
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm<PerformanceFeedbackFormSchema>({
    defaultValues: {
      company: 'Anavadya',
      ...defaultValues,
    },
    resolver: zodResolver(validationSchema),
  })

  useEffect(() => {
    if (!isEmpty(defaultValues)) {
      reset(defaultValues)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(defaultValues)])

  const { data, isLoading } = useSWR(
    'fetch-all-data',
    async () => {
      const [employeeRes] = await Promise.all([
        apiGetEmployeeNameList<{ data: { name: string; employee_name: string }[] }, Record<string, unknown>>({}),
        // apiGetCompany<{ data: { name: string }[] }>(),
      ]);

      return {
        employeeNameList: employeeRes?.data || [],
        // companyList: companyRes?.data || [],
      };
    },
    { revalidateOnFocus: false },
  )

  const employeeNameList =
    data?.employeeNameList?.map((emp) => ({
      value: emp.name,
      label: `${emp.employee_name} (${emp.name})`,
      name: emp.employee_name,
    })) || []

  const onSubmit = (values: PerformanceFeedbackFormSchema) => {
    onFormSubmit?.(values)
  }

  const [employeeName, setEmployeeName] = useState<string>('')

  return (
    <Form
      className="flex w-full h-full"
      containerClassName="flex flex-col w-full justify-between"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Container>
        <Card className="w-full">
          <Tabs defaultValue="employee" >
            <TabList>
              <TabNav value="employee">Employee Details</TabNav>
              <TabNav value="exemptionProofs">Feedback</TabNav>

            </TabList>
            <div className="p-4">
              <TabContent value="employee">
                <div className="gap-4 flex flex-col flex-auto">
                  {<EmployeeDetailSection
                    control={control}
                    errors={errors}
                    employeeData={employeeNameList}
                    employeeName={employeeName}
                    setEmployeeName={setEmployeeName}
                    isLoading={isLoading}
                  />}
                  {<FeedbackRatingSection
                    control={control}
                    errors={errors}
                  />}
                </div>
              </TabContent>
              <TabContent value="exemptionProofs">
                <FeedbackSection
                  control={control}
                  errors={errors}
                />
                {/* {<ExemptionProofs
                    control={control}
                  />}
                  {<HRAExemption
                    control={control}
                    errors={errors}
                  />} */}
              </TabContent>
            </div>
          </Tabs>
        </Card>
      </Container>
      <BottomStickyBar>{children}</BottomStickyBar>
    </Form>
  )
}

export default PerformanceFeedbackForm