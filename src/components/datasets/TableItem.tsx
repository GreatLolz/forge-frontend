import { Checkbox } from "@headlessui/react";
import { X } from "lucide-react";
import TableItemMenu from "./TableItemMenu";

export interface TableItemProps {
    id: number;
    name: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    samples: number;
    checked: boolean;
    onChange: (checked: boolean) => void;
}

export default function TableItem({ id, name, type, createdAt, updatedAt, samples, checked, onChange }: TableItemProps) {
    return (
        <div className="divide-y divide-neutral-800">
            <div className="grid grid-cols-12 gap-2 items-center px-3 py-2 hover:bg-neutral-800/50 hover:cursor-pointer text-sm">
                <Checkbox checked={checked} onChange={onChange} className="group col-span-1 w-5 h-5 border-neutral-700 border-1 hover:bg-neutral-800 flex items-center justify-center hover:cursor-default">
                    <X className="hidden group-data-[checked]:block text-violet-300" size={16} />
                </Checkbox>
                <div className="col-span-1">{id}</div>
                <div className="col-span-2">{name}</div>
                <div className="col-span-2">{type}</div>
                <div className="col-span-2">{createdAt}</div>
                <div className="col-span-2">{updatedAt}</div>
                <div className="col-span-1">{samples}</div>
                <div className="col-span-1 flex justify-end">
                    <TableItemMenu />
                </div>
            </div>
        </div>
    )
}
