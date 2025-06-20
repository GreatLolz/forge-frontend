import { Checkbox } from "@headlessui/react";
import TableItemMenu from "./TableItemMenu";

export interface TableItemProps {
    id: string;
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
        <div className="flex items-center w-full px-2 py-2 hover:bg-neutral-800/50 hover:cursor-pointer">
            <Checkbox checked={checked} onChange={onChange} className="group col-span-1 w-5 h-5 border-neutral-700 border-1 hover:bg-neutral-800 flex items-center justify-center hover:cursor-default">
                <div className="hidden group-data-[checked]:block bg-violet-300 p-1" />
            </Checkbox>
            <div className="grid grid-cols-11 gap-2 items-center ml-2 pr-2 text-sm w-full">
                <div className="col-span-1 truncate">{id}</div>
                <div className="col-span-2 truncate">{name}</div>
                <div className="col-span-2 truncate">{type}</div>
                <div className="col-span-2 truncate">{createdAt}</div>
                <div className="col-span-2 truncate">{updatedAt}</div>
                <div className="col-span-1 truncate">{samples}</div>
                <div className="col-span-1 flex justify-end">
                    <TableItemMenu />
                </div>
            </div>
        </div>
    )
}
