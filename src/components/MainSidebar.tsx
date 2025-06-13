import { Radio, RadioGroup } from "@headlessui/react"
import { useState } from "react"
import logo from "/synap.png"
import { Clipboard } from "lucide-react"
import { Aperture } from "lucide-react"
import { Book } from "lucide-react"
import { ChartBar } from "lucide-react"

export default function MainSidebar() {
    const pages = [
        { name: "Datasets", href: "/datasets", icon: <Clipboard />},
        { name: "Page 2", href: "/2", icon: <Aperture />},
        { name: "Page 3", href: "/3", icon: <Book />},
        { name: "Page 4", href: "/4", icon: <ChartBar />},
    ]
    
    const [selected, setSelected] = useState(pages[0])
    
    return (
        <div className="w-64 bg-neutral-900">
            <div className="flex flex-row items-center px-5 py-2 justify-between">
                <img src={logo} alt="Synapse Logo" className="w-16" />
                <h1 className="text-xl font-bold">Synapse Forge</h1>
            </div>
            <hr className="my-2 mx-5 border-neutral-700" />
            <RadioGroup value={selected} onChange={setSelected} className="flex flex-col p-4 space-y-1">
                {pages.map((page) => (
                    <Radio value={page.name} className="flex flex-row items-center space-x-3 bg-neutral-900 p-1 hover:bg-neutral-800 hover:cursor-pointer data-checked:bg-violet-700 rounded-md font-semibold">
                        {page.icon}
                        <span>{page.name}</span>
                    </Radio>
                ))}

            </RadioGroup>
            <hr className="my-2 mx-5 border-neutral-700" />
        </div>
    )
}