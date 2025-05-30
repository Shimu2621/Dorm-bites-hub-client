// import { AdminSidebar } from "@/components/adminSidebar/AdminSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      {/* <AdminSidebar /> */}
      <main className="w-full h-screen">
        {/* <SidebarTrigger /> */}
        {children}
      </main>
    </SidebarProvider>
  );
}
