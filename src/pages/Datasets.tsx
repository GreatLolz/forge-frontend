import { ArrowUpFromLine, Import, Pen, Plus, RefreshCcw, Tag, Trash } from "lucide-react";
import ControlButton from "../components/datasets/ControlButton";

export default function Datasets() {
    return (
        <div className="p-10 h-full flex flex-col">
            <h1 className="text-3xl font-bold mb-10">Datasets</h1>
            <div className="h-8 flex space-x-1">
                <ControlButton icon={<Plus size={20} />} text="Create" />
                <ControlButton icon={<Pen size={20} />} text="Edit in Dataset Studio" />
                <ControlButton icon={<Tag size={20} />} text="Rename" />
                <ControlButton icon={<RefreshCcw size={20} />} text="Refresh" />
                <ControlButton icon={<Import size={20} />} text="Import from..." />
                <ControlButton icon={<ArrowUpFromLine size={20} />} text="Export to..." />
                <ControlButton icon={<Trash size={20} />} text="Delete" />
            </div>
            <div className="bg-neutral-900 w-full h-full mt-2 rounded-xl">

            </div>
        </div>
    )
}