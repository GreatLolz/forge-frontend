import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ArrowUpFromLine, EllipsisVertical, Pen, Tag, Trash } from "lucide-react";

export default function TableItemMenu() {
    return (
        <Menu>
        <MenuButton className="p-1 text-neutral-700 hover:text-neutral-300 hover:cursor-pointer focus:outline-none">
            <EllipsisVertical size={18} />
        </MenuButton>
        <MenuItems 
            anchor="left start" 
            className="text-sm w-max text-neutral-300 bg-neutral-800 border-neutral-700 border-1 rounded-sm absolute focus:outline-none transition origin-top duration-100 ease-in data-[closed]:scale-95 data-[closed]:opacity-0 p-0.5"
            transition
        >
            <MenuItem as="div" className="p-1 px-2 flex items-center hover:bg-neutral-700 hover:cursor-pointer">
                <Pen size={16} className="mr-2" />
                <p>Edit</p>
            </MenuItem>
            <MenuItem as="div" className="p-1 px-2 flex items-center hover:bg-neutral-700 hover:cursor-pointer">
                <Tag size={16} className="mr-2" />
                <p>Rename</p>
            </MenuItem>
            <MenuItem as="div" className="p-1 px-2 flex items-center hover:bg-neutral-700 hover:cursor-pointer">
                <ArrowUpFromLine size={16} className="mr-2" />
                <p>Export</p>
            </MenuItem>
            <hr className="mt-1 mb-1 mx-2 border-neutral-700" />
            <MenuItem as="div" className="p-1 px-2 text-red-400 hover:text-red-300 flex items-center hover:bg-neutral-700 hover:cursor-pointer">
                <Trash size={16} className="mr-2" />
                <p>Delete</p>
            </MenuItem>
        </MenuItems>
    </Menu> 
    )
}