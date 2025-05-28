import Card from '@/components/ui/Card'
import { FormItem } from '@/components/ui/Form'
import { Controller, useWatch } from 'react-hook-form'
import RichTextEditor from '@/components/shared/RichTextEditor'
import { FormSectionBaseProps } from '../types'

type FeedbackProps = FormSectionBaseProps
const FeedbackSection = ({ control, errors }: FeedbackProps) => {
    return (
        <Card >
            <FormItem
            asterisk
                // label="Feedback"
                invalid={Boolean(errors.feedback)}
                errorMessage={errors.feedback?.message}
            >
                <Controller
                    name="feedback"
                    control={control}
                    render={({ field }) =>
                        <RichTextEditor
                            content={field.value}
                            invalid={Boolean(errors.feedback)}
                            onChange={({ html }) => {
                                field.onChange(html)
                                console.log(field.value)
                            }}
                        />
                    }
                />
            </FormItem>
        </Card>

    )
}

export default FeedbackSection