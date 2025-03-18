import { RouterProvider } from '@tanstack/react-router'
import { Toaster } from './components/ui/sonner'
import { router } from './router'
import './index.css'

function App() {
  return (
    <>
      <main className='light h-screen no-scrollbar overflow-y-auto'>
        <RouterProvider router={router} />
        <Toaster />
      </main>
    </>
  )
}

export default App
