import { Pen, Plus, RefreshCcw, Import, ArrowUpFromLine, Trash } from "lucide-react";
import { Button } from "../ui/button";

const actions = [
    {
        name: "Create",
        icon: <Plus size={20}/>,
        action: "create"
    },
    {
        name: "Edit in Dataset Studio",
        icon: <Pen size={20}/>,
        action: "edit"
    },
    {
        name: "Refresh",
        icon: <RefreshCcw size={20}/>,
        action: "refresh"
    },
    {
        name: "Import from...",
        icon: <Import size={20}/>,
        action: "import"
    },
    {
        name: "Export to...",
        icon: <ArrowUpFromLine size={20}/>,
        action: "export"
    },
    {
        name: "Delete",
        icon: <Trash size={20}/>,
        action: "delete"
    }
]

export default function ControlPanel({ handleControlClick }: { handleControlClick: (action: string) => void }) {
    return (
        <div className="flex gap-1">
            {actions.map((action) => (
                <Button key={action.action} onClick={() => handleControlClick(action.action)} className="bg-background hover:bg-secondary hover:cursor-pointer ">
                    {action.icon}
                    {action.name}
                </Button>
            ))}
        </div>
    )
}