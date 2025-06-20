import { Pen, Plus, Tag, RefreshCcw, Import, ArrowUpFromLine, Trash } from "lucide-react";
import ControlButton from "./ControlButton";

export default function ControlPanel({ handleControlClick }: { handleControlClick: (action: string) => void }) {
    return (
        <div className="h-8 flex space-x-1">
            <ControlButton icon={<Plus size={20} className="text-violet-300"/>} text="Create" onClick={() => handleControlClick("create")}/>
            <ControlButton icon={<Pen size={20} className="text-violet-300"/>} text="Edit in Dataset Studio" onClick={() => handleControlClick("edit")}/>
            <ControlButton icon={<Tag size={20} className="text-violet-300"/>} text="Rename" onClick={() => handleControlClick("rename")}/>
            <ControlButton icon={<RefreshCcw size={20} className="text-violet-300"/>} text="Refresh" onClick={() => handleControlClick("refresh")}/>
            <ControlButton icon={<Import size={20} className="text-violet-300"/>} text="Import from..." onClick={() => handleControlClick("import")}/>
            <ControlButton icon={<ArrowUpFromLine size={20} className="text-violet-300"/>} text="Export to..." onClick={() => handleControlClick("export")}/>
            <ControlButton icon={<Trash size={20} className="text-violet-300"/>} text="Delete" onClick={() => handleControlClick("delete")}/>
        </div>
    )
}