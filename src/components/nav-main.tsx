"use client"

import { ChevronRight, PlusCircle, type LucideIcon } from "lucide-react"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import AddPropertyForm from "./AddPropertyForm"
import { DialogDescription } from "@radix-ui/react-dialog"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: LucideIcon
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    // Wrap the entire item logic (triggers + content) in Dialog and Collapsible
                    <Dialog key={item.title}>
                        <Collapsible asChild defaultOpen={item.isActive} className='group/collapsible'>
                            <SidebarMenuItem>
                                <div className='flex w-full items-center justify-between'>
                                    <CollapsibleTrigger asChild className='flex-grow mr-1'>
                                        <SidebarMenuButton tooltip={item.title} className='justify-start w-auto'>
                                            {item.icon && <item.icon className='mr-2 h-4 w-4 shrink-0' />}
                                            <span className='flex-grow text-left truncate'>{item.title}</span>{" "}
                                            <ChevronRight className='ml-2 h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                                        </SidebarMenuButton>
                                    </CollapsibleTrigger>
                                    <DialogTrigger asChild>
                                        <Button variant='ghost' size='icon' className='shrink-0'>
                                            <PlusCircle className='text-green-400 h-4 w-4' />
                                        </Button>
                                    </DialogTrigger>
                                </div>

                                <CollapsibleContent className='w-full'>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton asChild>
                                                    <a href={subItem.url}>
                                                        <span>{subItem.title}</span>
                                                    </a>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>

                                <DialogContent>
                                    {/* description is needed for A11y reasons, console also throws a warning if absent */}
                                    <DialogDescription className='hidden'>Add your property infos</DialogDescription>
                                    <DialogHeader>
                                        <DialogTitle>Add Property</DialogTitle>
                                    </DialogHeader>
                                    <AddPropertyForm />
                                    <DialogFooter>
                                        <Button type='submit' form='your-add-property-form-id'>
                                            Add Property
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    </Dialog>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
