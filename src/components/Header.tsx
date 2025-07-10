import { BREADCRUMBS } from "@/types/app";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "./ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import { NavLink, useLocation } from "react-router";

export default function Header() {
    const location = useLocation()
    const currentPage = BREADCRUMBS[location.pathname]

    return (
        <div className="flex items-center p-2 border-b">
            <div className="border-r border-neutral-800 pr-1">
                <SidebarTrigger/>
            </div>
            {currentPage && (
                <Breadcrumb className="ml-4">
                <BreadcrumbList>
                {currentPage.map((page, index) => (
                    <div key={page.href} className="flex items-center gap-2.5">
                        <BreadcrumbItem>
                            {index === currentPage.length - 1 ? (
                                <BreadcrumbPage>{page.name}</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <NavLink to={page.href}>{page.name}</NavLink>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < currentPage.length - 1 && <BreadcrumbSeparator className="mt-0.5" />}
                    </div>
                ))}
                </BreadcrumbList>
            </Breadcrumb>
            )}
        </div>
    )
}