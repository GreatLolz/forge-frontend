import { SidebarTrigger } from "./ui/sidebar";

export default function Header({currentPage}: {currentPage: string}) {
    return (
        <div className="flex items-center p-2 border-b">
            <div className="border-r border-neutral-800 pr-1">
                <SidebarTrigger/>
            </div>
            <p className="text-lg ml-2">{currentPage}</p>
        </div>
    )
}