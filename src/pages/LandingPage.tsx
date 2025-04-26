import { Link } from "@tanstack/react-router"
import { Button } from "../components/ui/button"
import { ChartBarIcon, UserCircleIcon, BellIcon, ShieldCheckIcon } from "@heroicons/react/24/outline"
import Nav from "../components/Nav"

const features = [
  {
    title: "Real-time Insights",
    description: "Instantly see who's paid, who's late, and who's up next.",
    icon: ChartBarIcon,
  },
  {
    title: "Tenant Profiles",
    description: "Keep track of contact info, lease dates, notes, and history.",
    icon: UserCircleIcon,
  },
  {
    title: "Automated Alerts",
    description: "Get notified about lease expirations, missing documents, and more.",
    icon: BellIcon,
  },
  {
    title: "Secure & Private",
    description: "Your details protected with enterprise grade encryption.",
    icon: ShieldCheckIcon,
  },
]

export default function LandingPage() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features')
    featuresSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-white">
      <Nav />
      {/* Hero Section */}
      <div className="relative isolate px-6 lg:px-8">
        <div className="mx-auto max-w-7xl py-24 sm:py-32">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
            {/* Left Column - Text Content */}
            <div className="max-w-2xl">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                Track Tenants.
                <br />
                Simplify Property
                <br />
                Management
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600">
                The smart way to stay on top of your properties and tenants – all in one place.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700">
                  <Link to="/register">Get Started for Free</Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={scrollToFeatures}
                >
                  See How It Works
                </Button>
              </div>
            </div>
            
            {/* Right Column - Illustration */}
            <div className="relative">
              <img
                src="src\assets\images\dashboard.png"
                alt="Property Management Dashboard"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <feature.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 