import logo from "/synap.png"
import { Clipboard } from "lucide-react"
import { Aperture } from "lucide-react"
import { Book } from "lucide-react"
import { ChartBar } from "lucide-react"
import { NavLink } from "react-router"

export default function MainSidebar() {
    const pages = [
        { name: "Datasets", href: "/datasets", icon: <Clipboard />},
        { name: "Page 2", href: "/2", icon: <Aperture />},
        { name: "Page 3", href: "/3", icon: <Book />},
        { name: "Page 4", href: "/4", icon: <ChartBar />},
    ]

    return (
        <div className="w-64 bg-neutral-900">
            <NavLink to="/">
                <div className="flex flex-row items-center px-5 py-2 justify-between">
                    <img src={logo} alt="Synapse Logo" className="w-16" />
                    <h1 className="text-xl font-bold">Synapse Forge</h1>
                </div>
            </NavLink>
            <hr className="my-2 mx-5 border-neutral-700" />
            <div className="flex flex-col px-4 space-y-2">
                {pages.map((page) => (
                    <NavLink
                        key={page.href}
                        to={page.href}
                        className={({ isActive }) =>
                            `flex flex-row items-center space-x-3 p-1 hover:bg-neutral-800 hover:cursor-pointer rounded-md ${
                                isActive ? "bg-violet-700 font-semibold hover:bg-violet-600" : "bg-neutral-900"
                            }`
                        }
                    >
                        {page.icon}
                        <span>{page.name}</span>
                    </NavLink>
                ))}
            </div>
            <hr className="my-2 mx-5 border-neutral-700" />
        </div>
    )
}