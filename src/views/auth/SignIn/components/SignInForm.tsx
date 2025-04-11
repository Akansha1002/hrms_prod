import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { FormItem, Form } from '@/components/ui/Form'
import PasswordInput from '@/components/shared/PasswordInput'
import classNames from '@/utils/classNames'
import { useAuth } from '@/auth'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import type { ReactNode } from 'react'
import { apiSignIn } from '@/services/AuthService'

interface SignInFormProps extends CommonProps {
    disableSubmit?: boolean
    passwordHint?: string | ReactNode
    setMessage?: (message: string) => void
}

type SignInFormSchema = {
    usr: string
    pwd: string
}

const validationSchema: ZodType<SignInFormSchema> = z.object({
    usr: z
        .string({ required_error: 'Please enter your email' })
        .min(1, { message: 'Please enter your email' }),
    pwd: z
        .string({ required_error: 'Please enter your password' })
        .min(1, { message: 'Please enter your password' }),
})

const SignInForm = (props: SignInFormProps) => {
    const { disableSubmit = false, className, setMessage, passwordHint } = props
    const [isSubmitting, setSubmitting] = useState(false)
    const { signIn } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm<SignInFormSchema>({
        defaultValues: {
            usr: '',
            pwd: '',
        },
        resolver: zodResolver(validationSchema),
    })


    const onSignIn = async (values: SignInFormSchema) => {
        const { usr, pwd } = values

        if (!disableSubmit) {
            setSubmitting(true)

            // const res = await axios.post(
            //     'http://159.65.147.182:8000/api/method/login',
            //     {
            //         usr,
            //         pwd,
            //     },
            //     {},
            // )
            // if (res.headers['set-cookie']) {
            //     // Set cookies using js-cookie
            //     res.headers['set-cookie'].forEach((cookie) => {
            //         const [cookieNameValue, ...options] = cookie.split('; ')
            //         const [name, value] = cookieNameValue.split('=')
            //         Cookies.set(name, value, { path: '/' })
            //     })
            // }
            const response = await signIn({ usr, pwd })
            if (response.message !== 'Logged In') {
                setMessage?.('Login failed')
            }
        }

        setSubmitting(false)
    }

    return (
        <div className={className}>
            <Form onSubmit={handleSubmit(onSignIn)}>
                <FormItem
                    label="Email"
                    invalid={Boolean(errors.usr)}
                    errorMessage={errors.usr?.message}
                >
                    <Controller
                        name="usr"
                        control={control}
                        render={({ field }) => (
                            <Input
                                // type="email"
                                placeholder="Email"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                <FormItem
                    label="Password"
                    invalid={Boolean(errors.pwd)}
                    errorMessage={errors.pwd?.message}
                    className={classNames(
                        passwordHint ? 'mb-0' : '',
                        errors.pwd?.message && 'mb-8',
                    )}
                >
                    <Controller
                        name="pwd"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <PasswordInput
                                type="text"
                                placeholder="Password"
                                autoComplete="off"
                                {...field}
                            />
                        )}
                    />
                </FormItem>
                {passwordHint}
                <Button
                    block
                    loading={isSubmitting}
                    variant="solid"
                    type="submit"
                >
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
            </Form>
        </div>
    )
}

export default SignInForm
