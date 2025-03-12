import { useEffect, useState } from "react"
import { Form } from '@/components/ui/Form'
import Steps from '@/components/ui/Steps'
import Button from '@/components/ui/Button'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import type { CommonProps } from '@/@types/common'
import AdditionalInformationSection from "./components/AdditionalInformationSection"
import MovementDetailsSection from "./components/MovementDetailsSection"
import OrganizationSection from "./components/OrganizationSection"
import PayRollSection from "./components/PayrollSection"
import { useForm } from "react-hook-form"
import { EmployeeMovementSchema } from "./types"

type EmployeeMovementProps = {
    onFormSubmit: (values: EmployeeMovementSchema) => void
} & CommonProps

const EmployeeMovement = (props: EmployeeMovementProps) => {
    const {
        onFormSubmit,
        children,
    } = props

    // const {
    //     handleSubmit
    // } = useForm<EmployeeMovementSchema>

    const onSubmit = (values: EmployeeMovementSchema) => {
        onFormSubmit?.(values)
    }

    const [step, setStep] = useState(0)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [step])

    const steps = [
        { component: <MovementDetailsSection /> },
        { component: <OrganizationSection /> },
        { component: <AdditionalInformationSection /> },
        { component: <PayRollSection /> },
    ]

    const onChange = (nextStep: number) => {
        if (nextStep < 0) {
            setStep(0)
        } else if (nextStep >= steps.length) {
            setStep(steps.length - 1)
        } else {
            setStep(nextStep)
        }
    }

    const onNext = () => onChange(step + 1)

    const onPrevious = () => onChange(step - 1)

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            // onSubmit={handleSubmit(onSubmit)}
            onSubmit={(e) => e.preventDefault()}
        >
            <div>
                <Steps current={step}>
                    <Steps.Item title="Movement Details" />
                    <Steps.Item title="Organization" />
                    <Steps.Item title="Additional Information" />
                    <Steps.Item title="Payroll" />
                </Steps>
                <Container>
                    <div className="flex flex-col md:flex-row gap-4 mt-10">
                        <div className="gap-4 flex flex-col flex-auto">
                            {steps[step]?.component}
                        </div>
                    </div>
                </Container>
                <div className="mt-4 text-right">
                    <Button
                        className="mx-2"
                        disabled={step === 0}
                        onClick={onPrevious}
                    >
                        Previous
                    </Button>
                    <Button disabled={step === steps.length - 1} variant="solid" onClick={onNext}>
                        {step === steps.length - 1 ? 'Completed' : 'Next'}
                    </Button>
                </div>
            </div>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default EmployeeMovement