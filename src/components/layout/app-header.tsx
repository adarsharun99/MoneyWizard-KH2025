import { UserNav } from "@/components/user-nav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


export function AppHeader() {
  return (
    <>
      <div className="w-full flex-1">
        {/* Can be used for search or breadcrumbs in the future */}
      </div>
      <UserNav />
    </>
  );
}
