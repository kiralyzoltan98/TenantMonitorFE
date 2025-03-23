import { RouterProvider } from "@tanstack/react-router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "./components/ui/sonner"
import { router } from "./router"
import "./index.css"
import { toast } from "sonner"
import { ServiceProvider } from "./context/serviceContext"

const queryClient = new QueryClient({
    defaultOptions: {
        mutations: {
            onError: (error) => toast.error(error.message),
        },
    },
})

function App() {
    return (
        <main className='light h-screen no-scrollbar overflow-y-auto'>
            <ServiceProvider>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router} />
                    <Toaster />
                </QueryClientProvider>
            </ServiceProvider>
        </main>
    )
}

export default App
