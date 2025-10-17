import {
  Calendar,
  Home,
  Inbox,
  ClipboardList,
  CookingPot,
  UserCheck,
  UtensilsCrossed,
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
import Link from "next/link";

const items = [
  { title: "Home", url: "/", icon: Home },
  { title: "Admin Profile", url: "/dashboard/admin-profile", icon: Inbox },
  { title: "Manage Users", url: "/dashboard/manage-users", icon: Inbox },
  { title: "Add Meals", url: "/dashboard/add-meals", icon: Calendar },
  { title: "All Meals", url: "/dashboard/all-meals", icon: CookingPot },
  { title: "All Reviews", url: "/dashboard/all-reviews", icon: UserCheck },
  {
    title: "All Requested Meals",
    url: "/dashboard/requested-meals",
    icon: ClipboardList,
  },
  {
    title: "Up Coming Meals",
    url: "/dashboard/upcoming-meals",
    icon: UtensilsCrossed,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} className="bg-blue-600">
      <SidebarContent className="w-70 bg-blue-700 text-white flex flex-col">
        <SidebarGroup>
          <SidebarHeader className="bg-blue-600 text-white p-4">
            <div className="font-bold text-lg">DORMBITES HUB</div>
          </SidebarHeader>

          <SidebarGroupContent className="pt-4">
            <SidebarMenu className="space-y-1">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="group flex items-center gap-3 px-4 py-2 hover:bg-blue-800 hover:pl-6 transition-all duration-200 rounded-md text-sm font-medium"
                    >
                      <item.icon className="w-5 h-5 transition-colors duration-200" />
                      <span className="hover:text-black transition-colors duration-200">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
