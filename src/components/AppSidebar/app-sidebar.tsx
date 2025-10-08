"use client"

import * as React from "react"
import { sidebarData as data } from "@/components/AppSidebar/UserData/UserData"

import { NavMain } from "@/components/AppSidebar/nav-main"
import { NavSetting } from "@/components/AppSidebar/nav-setting"
import { NavUser } from "@/components/AppSidebar/nav-user"
import { TeamSwitcher } from "@/components/AppSidebar/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/Sidebar/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="mt-16">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSetting Setting={data.Setting} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
