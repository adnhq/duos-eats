import RestaurantSidebarWrapper from "@/components/RestaurantSidebarWrapper";
import { Breadcrumb, BreadcrumbItem } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function RestaurantDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <RestaurantSidebarWrapper />

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbItem className="hidden md:block">
              Dashboard
            </BreadcrumbItem>
          </Breadcrumb>
        </header>

        <main className="flex-1 py-16 px-3">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
