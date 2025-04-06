import { useRegisterMutation } from "@/hooks/useRegisterMutation"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { cn } from "@/lib/utils"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function RegisterForm({ className, ...props }: React.ComponentProps<"div">) {
    const [emailInput, setEmailInput] = useState("")
    const [userNameInput, setUserNameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const [firstNameInput, setFirstNameInput] = useState("")
    const [lastNameInput, setLastNameInput] = useState("")
    const navigate = useNavigate()
    const registerMutation = useRegisterMutation({
        onSuccess: () => {
            navigate({ to: "/login" })
        },
    })

    function handleRegister() {
        registerMutation.mutate({
            email: emailInput,
            userName: userNameInput,
            password: passwordInput,
            firstName: firstNameInput,
            lastName: lastNameInput,
        })
    }

    function handleEmailInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEmailInput(e.target.value)
    }
    function handleUserNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserNameInput(e.target.value)
    }
    function handlePasswordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordInput(e.target.value)
    }
    function handleFirstNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFirstNameInput(e.target.value)
    }
    function handleLastNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setLastNameInput(e.target.value)
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Provide your email address, username and password to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-6'>
                        <div className='grid gap-3'>
                            <Label htmlFor='userName'>E-mail</Label>
                            <Input
                                id='email'
                                type='email'
                                placeholder='kissjozsi@gmail.com'
                                onChange={handleEmailInputChange}
                                required
                            />
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor='userName'>Username</Label>
                            <Input
                                id='userName'
                                type='text'
                                placeholder='kissjozsi'
                                onChange={handleUserNameInputChange}
                                required
                            />
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor='password'>Password</Label>
                            <Input
                                id='password'
                                type='password'
                                placeholder='********'
                                onChange={handlePasswordInputChange}
                                required
                            />
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor='userName'>First name</Label>
                            <Input
                                id='userName'
                                type='text'
                                placeholder='József'
                                onChange={handleFirstNameInputChange}
                                required
                            />
                        </div>
                        <div className='grid gap-3'>
                            <Label htmlFor='userName'>Last name</Label>
                            <Input
                                id='userName'
                                type='text'
                                placeholder='Kiss'
                                onChange={handleLastNameInputChange}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            <Button type='submit' className='w-full' onClick={handleRegister}>
                                Register
                            </Button>
                            <Button variant='outline' className='w-full'>
                                Sign up with Google
                            </Button>
                        </div>
                    </div>
                    <div className='mt-4 text-center text-sm'>
                        Already have an account?{""}
                        <a href='login' className='underline underline-offset-4'>
                            Login
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
