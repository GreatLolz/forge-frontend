import { ArrowUpFromLine, Import, Pen, Plus, RefreshCcw, Tag, Trash } from "lucide-react";
import ControlButton from "../components/datasets/ControlButton";
import { Checkbox } from "@headlessui/react";
import TableItem from "../components/datasets/TableItem";
import { useEffect, useRef, useState } from "react";
import { DATASET_TYPES, type Dataset } from "../types/datasets";
import ApiClient from "../utils/api";

export default function Datasets() {
    const [mainChecked, setMainChecked] = useState(false)
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
    const [datasets, setDatasets] = useState<Dataset[]>([])
    const [importFile, setImportFile] = useState<File | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getDatasets()
    }, [])

    useEffect(() => {
        const newCheckedItems: Record<string, boolean> = {}
        const itemIds = datasets.map(dataset => dataset.id)
        itemIds.forEach(id => {
            newCheckedItems[id] = mainChecked
        })
        setCheckedItems(newCheckedItems)
    }, [mainChecked])

    useEffect(() => {
        if (importFile) {
            ApiClient.getInstance().importDataset(importFile)
        }
    }, [importFile])

    const getDatasets = async () => {
        const _datasets = await ApiClient.getInstance().getDatasets()
        if (_datasets) {
            setDatasets(_datasets)
        }
    }

    const handleItemCheckboxChange = (id: string, checked: boolean) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: checked
        }))
    }

    const handleControlClick = (action: string) => {
        switch (action) {
            case "create":
                break;
            case "edit":
                break;
            case "rename":
                break;
            case "refresh":
                getDatasets()
                break;
            case "import":
                fileInputRef.current?.click()
                break;
            case "export":
                break;
            case "delete":
                break;
        }
    }

    return (
        <div className="p-10 h-screen flex flex-col">
            <input type="file" onChange={(e) => setImportFile(e.target.files?.[0] || null)} ref={fileInputRef} />
            <h1 className="text-2xl font-bold mb-10">Datasets</h1>
            <div className="h-8 flex space-x-1">
                <ControlButton icon={<Plus size={20} className="text-violet-300"/>} text="Create" onClick={() => handleControlClick("create")}/>
                <ControlButton icon={<Pen size={20} className="text-violet-300"/>} text="Edit in Dataset Studio" onClick={() => handleControlClick("edit")}/>
                <ControlButton icon={<Tag size={20} className="text-violet-300"/>} text="Rename" onClick={() => handleControlClick("rename")}/>
                <ControlButton icon={<RefreshCcw size={20} className="text-violet-300"/>} text="Refresh" onClick={() => handleControlClick("refresh")}/>
                <ControlButton icon={<Import size={20} className="text-violet-300"/>} text="Import from..." onClick={() => handleControlClick("import")}/>
                <ControlButton icon={<ArrowUpFromLine size={20} className="text-violet-300"/>} text="Export to..." onClick={() => handleControlClick("export")}/>
                <ControlButton icon={<Trash size={20} className="text-violet-300"/>} text="Delete" onClick={() => handleControlClick("delete")}/>
            </div>
            <div className="bg-neutral-900 w-full h-full mt-2 rounded-xl flex flex-col flex-1 overflow-hidden">
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
                <div className="overflow-y-auto flex-1 no-scrollbar">
                    {datasets.map((dataset) => (
                        <TableItem 
                            key={dataset.id} 
                            id={dataset.id} 
                            name={dataset.name} 
                            type={DATASET_TYPES[dataset.type] || dataset.type} 
                            createdAt={new Date(dataset.created_at).toLocaleString()} 
                            updatedAt={new Date(dataset.updated_at).toLocaleString()} 
                            samples={dataset.sample_count} 
                            checked={checkedItems[dataset.id] || false} 
                            onChange={(checked) => handleItemCheckboxChange(dataset.id, checked)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}