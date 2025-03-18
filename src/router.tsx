import { createRootRoute, createRoute, createRouter, Outlet, redirect } from "@tanstack/react-router"
import { PageContainer } from "./pages/PageContainer"
import LoginPage from "./pages/LoginPage"
import Nav from "./components/Nav"
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "./components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"

function isAuthenticated() {
    return Boolean(localStorage.getItem("token"))
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
    component: () => (
        <>
            <PageContainer className='flex flex-col min-h-screen'>
                <Outlet />
            </PageContainer>
        </>
    ),
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
    component: () => (
        <>
            <h1>home</h1>
            <Nav />
        </>
    ),
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
            <h1>Register</h1>
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

const routeTree = rootRoute.addChildren([
    guestRoute.addChildren([homeRoute]),
    loginRoute,
    registerRoute,
    dashboardRoute,
])

export const router = createRouter({ routeTree })
