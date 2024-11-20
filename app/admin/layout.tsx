import AppSidebarWrapper from "@/components/AdminSidebarWrapper";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen pb-20 pt-32">
      <SidebarProvider>
        <AppSidebarWrapper />

        <SidebarInset className="px-4">
          <main>
            <div className="max-w-7xl mx-auto">
              <SidebarTrigger />
              {children}
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
