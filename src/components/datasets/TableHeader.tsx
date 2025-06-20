import { Checkbox } from "@headlessui/react";

export default function TableHeader({ mainChecked, setMainChecked }: { mainChecked: boolean, setMainChecked: (checked: boolean) => void }) {
    return (
        <div className="flex items-center px-2 w-full border-b border-b-neutral-700">
            <Checkbox checked={mainChecked} onChange={setMainChecked} className="group w-5 h-5 border-neutral-700 border-1 hover:bg-neutral-800 flex items-center justify-center hover:cursor-default">
                <div className="hidden group-data-[checked]:block bg-violet-300 p-1" />
            </Checkbox>
            <div className="grid grid-cols-11 gap-2 px-2 py-2 text-sm text-neutral-400 w-full">
                <div className="col-span-1">ID</div>
                <div className="col-span-2">Name</div> 
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Created at</div>
                <div className="col-span-2">Updated at</div>
                <div className="col-span-1">Samples</div>
                <div className="col-span-1"></div>
            </div>
        </div>
    )
}