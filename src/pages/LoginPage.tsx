import BackButton from "@/components/BackButton"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
    return (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='w-full max-w-sm'>
                <BackButton className='mb-4' />
                <LoginForm />
            </div>
        </div>
    )
}
