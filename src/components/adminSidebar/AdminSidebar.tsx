"use client";
import {
  Home,
  UtensilsCrossed,
  CalendarDays,
  Star,
  Users,
  PlusCircle,
  Clock,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
// const items = [
//   {
//     title: "Home",
//     url: "#",
//     icon: Home,
//   },
//   {
//     title: "Inbox",
//     url: "#",
//     icon: Inbox,
//   },
//   {
//     title: "Calendar",
//     url: "#",
//     icon: Calendar,
//   },
//   {
//     title: "Search",
//     url: "#",
//     icon: Search,
//   },
//   {
//     title: "Settings",
//     url: "#",
//     icon: Settings,
//   },
// ];

export function AdminSidebar() {
  return (
    <Sidebar
      className="border-none"
      side="left"
      variant="sidebar"
      collapsible="none"
    >
      <SidebarHeader className="bg-[#8B4513] h-full flex items-center">
        <div className="p-4 font-bold text-2xl text-white">DORM DINE HUB</div>
      </SidebarHeader>
      <SidebarContent className="bg-[#8B4513] text-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="bg-[#1e2a38] hover:bg-[#1e2a38] text-white">
                  Admin Profile
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-[#7a3d11]">
                  <Users className="h-4 w-4" />
                  <span>Manage Users</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-[#7a3d11]">
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Meal</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-[#7a3d11]">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>All Meals</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-[#7a3d11]">
                  <Star className="h-4 w-4" />
                  <span>All Reviews</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-[#7a3d11]">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>Serve Meal</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-[#7a3d11]">
                  <Clock className="h-4 w-4" />
                  <span>Up Coming Meals</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-4 border-t border-[#7a3d11] pt-4">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-[#7a3d11]">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-[#7a3d11]">
                  <UtensilsCrossed className="h-4 w-4" />
                  <span>Meals</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-white hover:bg-[#7a3d11]">
                  <CalendarDays className="h-4 w-4" />
                  <span>Up Coming Meals</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
