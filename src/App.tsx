import { RouterProvider } from "@tanstack/react-router"
import { router } from "./router"
import "./index.css"
import { ServiceProvider } from "./context/serviceContext"

function App() {
    return (
        <main className='light h-screen no-scrollbar overflow-y-auto'>
            <ServiceProvider>
                <RouterProvider router={router} />
            </ServiceProvider>
        </main>
    )
}

export default App
