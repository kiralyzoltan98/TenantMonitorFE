import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { HomeIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useRegisterMutation } from "../hooks/useRegisterMutation"

export default function RegisterPage() {
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

    function handleRegister(e: React.FormEvent) {
        e.preventDefault()
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
        <div className="min-h-screen">
            {/* Header with logo */}
            <div className="h-16 bg-white border-b">
                <div className="mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8">
                    <div className="flex h-full items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8">
                                <div className="w-full h-full bg-blue-600 rounded-md flex items-center justify-center">
                                    <HomeIcon className="h-5 w-5 text-white" />
                                </div>
                            </div>
                            <span className="text-xl font-semibold text-gray-900">TenantMonitor</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Hero Image Section */}
            <div className="relative h-52 bg-gradient-to-b from-slate-800 to-blue-900 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <img src="src\assets\images\authilustration.png" className="translate-y-[-4%] scale-50" alt="auth illustration" />
                </div>
            </div>

            <div className="bg-gray-50">
                <div className="flex min-h-[calc(100vh-16rem)] flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
                            Create your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                            <form onSubmit={handleRegister} className="space-y-6">
                                <div>
                                    <Label htmlFor="email">Email address</Label>
                                    <div className="mt-2">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="kissjozsi@gmail.com"
                                            onChange={handleEmailInputChange}
                                            required
                                            className="block w-full"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="userName">Username</Label>
                                    <div className="mt-2">
                                        <Input
                                            id="userName"
                                            name="userName"
                                            type="text"
                                            placeholder="kissjozsi"
                                            onChange={handleUserNameInputChange}
                                            required
                                            className="block w-full"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <div className="mt-2">
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder="********"
                                            onChange={handlePasswordInputChange}
                                            required
                                            className="block w-full"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <Label htmlFor="firstName">First name</Label>
                                        <div className="mt-2">
                                            <Input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                placeholder="József"
                                                onChange={handleFirstNameInputChange}
                                                required
                                                className="block w-full"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="lastName">Last name</Label>
                                        <div className="mt-2">
                                            <Input
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                placeholder="Kiss"
                                                onChange={handleLastNameInputChange}
                                                required
                                                className="block w-full"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="terms"
                                        name="terms"
                                        type="checkbox"
                                        required
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                    />
                                    <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                                        I agree to the{' '}
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                            Terms of Service
                                        </a>{' '}
                                        and{' '}
                                        <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                        Register
                                    </Button>
                                    <Button type="button" variant="outline" className="w-full">
                                        Sign up with Google
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
