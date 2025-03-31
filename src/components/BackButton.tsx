import { ArrowLeft } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import { useRouter } from "@tanstack/react-router"
import { VariantProps } from "class-variance-authority"

type CustomBackButtonProps = React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }

export default function BackButton({ ...props }: CustomBackButtonProps) {
    const router = useRouter()

    const handleGoBack = () => {
        router.history.back()
    }

    return (
        <Button variant='outline' onClick={handleGoBack} className='' {...props}>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back
        </Button>
    )
}
