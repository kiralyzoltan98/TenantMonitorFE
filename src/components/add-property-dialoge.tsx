import { PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import AddPropertyForm from "./AddPropertyForm"

export default function AddPropertyDialoge() {
    return (
        <Dialog>
            <DialogTrigger>
                <PlusCircle className='text-green-400' />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Property</DialogTitle>
                </DialogHeader>
                <AddPropertyForm />
                <DialogFooter>
                    <Button type='submit'>Add Property</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
