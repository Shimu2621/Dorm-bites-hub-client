// import { AdminSidebar } from "@/components/adminSidebar/AdminSidebar";
// import { SidebarProvider } from "@/components/ui/sidebar";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <SidebarProvider>
//       {/* <AdminSidebar /> */}
//       <main className="w-full h-screen">
//         {/* <SidebarTrigger /> */}
//         {children}
//       </main>
//     </SidebarProvider>
//   );
// }

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/shared/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full mx-auto">
        <AppSidebar />
        <div className="flex-1">
          <header className="h-14 border-b px-4 flex items-center">
            <SidebarTrigger className="md:hidden" />
            <h1 className="ml-4 font-semibold">Admin Dashboard</h1>
          </header>
          <main className="p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
