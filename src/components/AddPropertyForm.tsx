import { Button } from "@/components/ui/button"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default function AddPropertyForm() {
    const form = useForm()

    function onSubmit(values) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-2/3 space-y-6'>
                <FormField
                    control={form.control}
                    name='property-name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Property name</FormLabel>
                            <FormControl>
                                <Input placeholder='Property name' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='property-type'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Property type</FormLabel>
                            <FormControl>
                                <Input placeholder='Property type' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    )
}
