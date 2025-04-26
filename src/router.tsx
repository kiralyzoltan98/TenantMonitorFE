import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router"
import LoginPage from "./pages/LoginPage"
import Nav from "./components/Nav"
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import RootLayout from "./layout/RootLayout"
import RegisterPage from "./pages/RegisterPage"
import LandingPage from "./pages/LandingPage"

function isAuthenticated() {
    return Boolean(localStorage.getItem("refreshToken"))
}

function authGuard() {
    if (!isAuthenticated()) {
        throw redirect({ to: "/" })
    }
}

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

export const rootRoute = createRootRoute({
    component: () => <RootLayout />,
    notFoundComponent: () => {
        return <p>404 page not found :c</p>
    },
})

const guestRoute = createRoute({
    getParentRoute: () => rootRoute,
    id: "pathlessLayout",
    component: () => (
        <>
            <Outlet />
        </>
    ),
})

const homeRoute = createRoute({
    getParentRoute: () => guestRoute,
    path: "/",
    component: () => <LandingPage />,
})

const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "login",
    component: () => (
        <>
            <LoginPage />
        </>
    ),
})

const registerRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "register",
    component: () => (
        <>
            <RegisterPage />
        </>
    ),
})

const dashboardRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "dashboard",
    beforeLoad: () => {
        authGuard()
    },
    component: () => (
        <>
            <h1>You are authenticated</h1>
            <SidebarProvider>
                <AppSidebar>
                    <SidebarTrigger />
                    <Sidebar>
                        <SidebarContent />
                    </Sidebar>
                </AppSidebar>
            </SidebarProvider>
        </>
    ),
})

const featuresRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "features",
    component: () => (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl">Features page coming soon...</h1>
        </div>
    ),
})

const pricingRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "pricing",
    component: () => (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl">Pricing page coming soon...</h1>
        </div>
    ),
})

const contactRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "contact",
    component: () => (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl">Contact page coming soon...</h1>
        </div>
    ),
})

const routeTree = rootRoute.addChildren([
    guestRoute.addChildren([homeRoute]),
    loginRoute,
    registerRoute,
    dashboardRoute,
    featuresRoute,
    pricingRoute,
    contactRoute,
])

export const router = createRouter({ routeTree })
