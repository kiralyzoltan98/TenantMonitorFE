"use client"

import { BadgeCheck, Bell, ChevronsUpDown, CreditCard, LogOut, Sparkles } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar"
import { Button } from "./ui/button"
import { useNavigate } from "@tanstack/react-router"
import { User } from "@/models/dataModels"
import { useEffect, useState } from "react"
import { Skeleton } from "./ui/skeleton"

interface NavUserProps {
    user: User
    isSuccess: boolean
}

function SkeletonUser() {
    return (
        <div className='flex items-center space-x-4'>
            <Skeleton className='h-12 w-12 rounded-full' />
            <div className='space-y-2'>
                <Skeleton className='h-4 w-[220px]' />
                <Skeleton className='h-4 w-[200px]' />
            </div>
        </div>
    )
}

export function NavUser({ user, isSuccess }: NavUserProps) {
    const { isMobile } = useSidebar()

    const [monogram, setMonogram] = useState<string>()

    const navigate = useNavigate()
    function HandleLogout(): void {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate({ to: "/" })
    }

    useEffect(() => {
        if (user) setMonogram(user.lastName.charAt(0) + user.firstName.charAt(0))
    }, [user])

    useEffect(() => {
        console.log(isSuccess)
    }, [isSuccess])

    if (isSuccess !== true || !user) {
        return SkeletonUser()
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size='lg'
                            className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                        >
                            <Avatar className='h-8 w-8 rounded-lg'>
                                <AvatarImage alt={user.userName} />
                                <AvatarFallback className='rounded-lg'>{monogram}</AvatarFallback>
                            </Avatar>
                            <div className='grid flex-1 text-left text-sm leading-tight'>
                                <span className='truncate font-medium'>{user.userName}</span>
                                <span className='truncate text-xs'>{user.email}</span>
                            </div>
                            <ChevronsUpDown className='ml-auto size-4' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className='w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg'
                        side={isMobile ? "bottom" : "right"}
                        align='end'
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className='p-0 font-normal'>
                            <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                                <Avatar className='h-8 w-8 rounded-lg'>
                                    <AvatarImage alt={user.userName} />
                                    <AvatarFallback className='rounded-lg'>{monogram}</AvatarFallback>
                                </Avatar>
                                <div className='grid flex-1 text-left text-sm leading-tight'>
                                    <span className='truncate font-medium'>{user.userName}</span>
                                    <span className='truncate text-xs'>{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Sparkles />
                                Upgrade to Pro
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <BadgeCheck />
                                Account
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Button onClick={HandleLogout}>
                                <LogOut />
                                Log out
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
