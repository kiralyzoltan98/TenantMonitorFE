import BackButton from "@/components/BackButton"
import RegisterForm from "@/components/register-form"

export default function RegisterPage() {
    return (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <div className='w-full max-w-sm'>
                <BackButton className='mb-4' />
                <RegisterForm />
            </div>
        </div>
    )
}
