import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"

export default function Nav() {
    return (
        <nav className="bg-white border-b">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="">
                        <img src="src\assets\images\logo.png" alt="logo" className="w-[20%] h-[20%]" />
                    </Link>

                    {/* Center - Navigation Links */}
                    <div className="hidden md:flex md:items-center md:gap-6">
                        <Link
                            to="/features"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                        >
                            Features
                        </Link>
                        <Link
                            to="/pricing"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                        >
                            Pricing
                        </Link>
                        <Link
                            to="/contact"
                            className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium"
                        >
                            Contact
                        </Link>
                    </div>

                    {/* Right side - Login Button */}
                    <div className="flex items-center gap-4">
                        <Button
                            asChild
                            variant="ghost"
                            className="hidden md:inline-flex"
                        >
                            <Link to="/login">Login</Link>
                        </Button>
                        <Button
                            asChild
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Link to="/register">Get Started</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
