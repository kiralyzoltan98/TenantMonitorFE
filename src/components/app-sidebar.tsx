import * as React from "react"
import { BookOpen, Bot, House, Map, Settings2 } from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import { useGetUserInfoQuery } from "@/hooks/useGetUserInfoQuery"

// This is sample data.
const data = {
    navMain: [
        {
            title: "Properties",
            url: "properties",
            icon: House,
            isActive: true,
            items: [
                {
                    title: "Property",
                    url: "properties",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { data: userInfo, isSuccess } = useGetUserInfoQuery()

    return (
        <Sidebar collapsible='icon' {...props}>
            <SidebarHeader>
                <h1>🏠 TenantMonitor</h1>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
                <NavProjects projects={data.projects} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={userInfo} isSuccess={isSuccess} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
