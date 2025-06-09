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
          <header className="h-14 border-b px-4 flex items-center justify-center relative">
            <SidebarTrigger className="md:hidden absolute left-4" />
            <h1 className="text-3xl text-blue-700 italic font-bold text-center">
              Admin Dashboard
            </h1>
          </header>

          <main className="p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
