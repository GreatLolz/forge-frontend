import { NavLink } from "react-router";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { ApertureIcon, ClipboardIcon, Ellipsis, ImportIcon, LayoutDashboardIcon, LogOut, UserIcon } from "lucide-react";
import type { UserDetails } from "../types/user";
import { Button } from "./ui/button";
import { DropdownMenu } from "./ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

export default function MainSidebar({userDetails, onLogout}: {userDetails: UserDetails, onLogout: () => void}) {
    const pages = [
        {
            name: "Datasets",
            href: "/datasets",
            icon: <ClipboardIcon/>
        },
        {
            name: "Page 2",
            href: "/2",
            icon: <LayoutDashboardIcon />
        },
        {
            name: "Page 3",
            href: "/3",
            icon: <ApertureIcon />
        },
        {
            name: "Page 4",
            href: "/4",
            icon: <ImportIcon />
        }
    ]
    
    return (
        <Sidebar variant="sidebar">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild size="lg">
                            <NavLink to="/">
                                <img src="./synap.png" className="w-10"/>
                                <span className="font-bold text-lg">Synapse Forge</span>
                            </NavLink>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {pages.map((page) => (
                                <SidebarMenuItem key={page.name}>
                                    <NavLink to={page.href}>
                                    {({ isActive }) => (
                                        <SidebarMenuButton asChild isActive={isActive}>
                                            <div>
                                                {page.icon}
                                            <span className={isActive ? "font-bold" : ""}>{page.name}</span>
                                        </div>
                                    </SidebarMenuButton>
                                )}
                                </NavLink>
                            </SidebarMenuItem>
                        ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" className="justify-between">
                            <UserIcon/>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="flex items-center gap-2">{userDetails.name}</span>
                                <span className="text-xs text-muted-foreground">{userDetails.email}</span>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger className="hover:cursor-pointer" asChild>
                                    <Ellipsis/>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="center" side="top" className="bg-secondary p-1 rounded-sm border-1 ml-2">
                                    <DropdownMenuItem onClick={onLogout} className="flex items-center gap-2 p-2 hover:outline-none hover:bg-neutral-700/50 rounded-sm hover:cursor-pointer">
                                        <LogOut size={16}/>
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}