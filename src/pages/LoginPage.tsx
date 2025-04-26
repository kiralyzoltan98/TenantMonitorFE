import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { HomeIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useLoginMutation } from "../hooks/useLoginMutation"

export default function LoginPage() {
    const [userNameInput, setUserNameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")
    const navigate = useNavigate()
    const loginMutation = useLoginMutation({
        onSuccess: () => {
            navigate({ to: "/dashboard" })
        },
    })

    function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        loginMutation.mutate({
            userName: userNameInput,
            password: passwordInput,
        })
    }

    function handleUserNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserNameInput(e.target.value)
    }
    
    function handlePasswordInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        setPasswordInput(e.target.value)
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
                            Welcome back
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                Sign up for free
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                            <form onSubmit={handleLogin} className="space-y-6">
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
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password">Password</Label>
                                        <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                                            Forgot your password?
                                        </a>
                                    </div>
                                    <div className="mt-2">
                                        <Input
                                            id="password"
                                            name="password"
                                            type="password"
                                            onChange={handlePasswordInputChange}
                                            required
                                            className="block w-full"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                                    />
                                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                        Login
                                    </Button>
                                    <Button type="button" variant="outline" className="w-full">
                                        Login with Google
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
