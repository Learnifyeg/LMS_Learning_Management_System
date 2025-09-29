import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { NavLink } from "react-router-dom"
import { NavLinks } from "@/assets/Constants/NavLinks" // ✅ make sure this path is correct

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />

      <SidebarContent>
        <SidebarGroup>
          {NavLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="block px-4 py-2 hover:bg-accent transition"
            >
              {link.name}
            </NavLink>
          ))}
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </Sidebar>
  )
}
