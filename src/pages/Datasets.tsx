import { ArrowUpFromLine, Import, Pen, Plus, RefreshCcw, Tag, Trash } from "lucide-react";
import ControlButton from "../components/datasets/ControlButton";
import { Checkbox } from "@headlessui/react";
import TableItem from "../components/datasets/TableItem";
import { useEffect, useState } from "react";

export default function Datasets() {
    const [mainChecked, setMainChecked] = useState(false)
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({})

    useEffect(() => {
        const newCheckedItems: Record<number, boolean> = {}
        const itemIds = datasets.map(dataset => dataset.id)
        itemIds.forEach(id => {
            newCheckedItems[id] = mainChecked
        })
        setCheckedItems(newCheckedItems)
    }, [mainChecked])

    const handleItemCheckboxChange = (id: number, checked: boolean) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: checked
        }))
    }

    const datasets = [
        { id: 1, name: "bookcorpus", type: "text", createdAt: "2023-02-01 12:00:00", updatedAt: "2023-02-01 12:00:00", samples: 1000 },
        { id: 2, name: "cifar10", type: "image", createdAt: "2023-02-01 12:00:00", updatedAt: "2023-02-01 12:00:00", samples: 50000 },
        { id: 3, name: "openimages", type: "image", createdAt: "2023-02-01 12:00:00", updatedAt: "2023-02-01 12:00:00", samples: 9000000 },
        { id: 4, name: "wikidata", type: "knowledge", createdAt: "2023-02-01 12:00:00", updatedAt: "2023-02-01 12:00:00", samples: 100000 },
        { id: 5, name: "sst", type: "text", createdAt: "2023-02-01 12:00:00", updatedAt: "2023-02-01 12:00:00", samples: 100000 },
        { id: 6, name: "glue", type: "text", createdAt: "2023-02-01 12:00:00", updatedAt: "2023-02-01 12:00:00", samples: 100000 },
        { id: 7, name: "imdb", type: "text", createdAt: "2023-02-01 12:00:00", updatedAt: "2023-02-01 12:00:00", samples: 50000 },
        { id: 8, name: "celeba", type: "image", createdAt: "2023-02-01 12:00:00", updatedAt: "2023-02-01 12:00:00", samples: 202599 },
        { id: 9, name: "coco", type: "image", createdAt: "2023-02-01 12:00:00", updatedAt: "2023-02-01 12:00:00", samples: 118287 },
        { id: 10, name: "lm1b", type: "text", createdAt: "2023-02-01 12:00:00", updatedAt: "2023-02-01 12:00:00", samples: 3000000 },
    ]

    return (
        <div className="p-10 h-screen flex flex-col">
            <h1 className="text-2xl font-bold mb-10">Datasets</h1>
            <div className="h-8 flex space-x-1">
                <ControlButton icon={<Plus size={20} className="text-violet-300"/>} text="Create" />
                <ControlButton icon={<Pen size={20} className="text-violet-300"/>} text="Edit in Dataset Studio" />
                <ControlButton icon={<Tag size={20} className="text-violet-300"/>} text="Rename" />
                <ControlButton icon={<RefreshCcw size={20} className="text-violet-300"/>} text="Refresh" />
                <ControlButton icon={<Import size={20} className="text-violet-300"/>} text="Import from..." />
                <ControlButton icon={<ArrowUpFromLine size={20} className="text-violet-300"/>} text="Export to..." />
                <ControlButton icon={<Trash size={20} className="text-violet-300"/>} text="Delete" />
            </div>
            <div className="bg-neutral-900 w-full h-full mt-2 rounded-xl flex flex-col flex-1 overflow-hidden">
                <div className="grid grid-cols-12 gap-2 border-b border-b-neutral-700 px-3 py-2 text-sm text-neutral-400">
                    <Checkbox checked={mainChecked} onChange={setMainChecked} className="group col-span-1 w-5 h-5 border-neutral-700 border-1 hover:bg-neutral-800 flex items-center justify-center hover:cursor-default">
                        <div className="hidden group-data-[checked]:block bg-violet-300 p-1" />
                    </Checkbox>
                    <div className="col-span-1">ID</div>
                    <div className="col-span-2">Name</div> 
                    <div className="col-span-2">Type</div>
                    <div className="col-span-2">Created at</div>
                    <div className="col-span-2">Updated at</div>
                    <div className="col-span-1">Samples</div>
                    <div className="col-span-1"></div>
                </div>
                <div className="overflow-y-auto flex-1 no-scrollbar">
                    {datasets.map((dataset) => (
                        <TableItem 
                            key={dataset.id} 
                            id={dataset.id} 
                            name={dataset.name} 
                            type={dataset.type} 
                            createdAt={dataset.createdAt} 
                            updatedAt={dataset.updatedAt} 
                            samples={dataset.samples} 
                            checked={checkedItems[dataset.id] || false} 
                            onChange={(checked) => handleItemCheckboxChange(dataset.id, checked)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}