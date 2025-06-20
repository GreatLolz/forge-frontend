import TableItem from "../components/datasets/TableItem";
import { useEffect, useRef, useState } from "react";
import { DATASET_TYPES, type Dataset } from "../types/datasets";
import ApiClient from "../utils/api";
import ControlPanel from "../components/datasets/ControlPanel";
import TableHeader from "../components/datasets/TableHeader";

export default function Datasets() {
    const [mainChecked, setMainChecked] = useState(false)
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({})
    const [datasets, setDatasets] = useState<Dataset[]>([])
    const [importFile, setImportFile] = useState<File | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        refresh()
    }, [])

    const getDatasets = async () => {
        try {
            const _datasets = await ApiClient.getInstance().getDatasets()
            setDatasets(_datasets)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const newCheckedItems: Record<string, boolean> = {}
        const itemIds = datasets.map(dataset => dataset.id)
        itemIds.forEach(id => {
            newCheckedItems[id] = mainChecked
        })
        setCheckedItems(newCheckedItems)
    }, [mainChecked])

    const handleItemCheckboxChange = (id: string, checked: boolean) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: checked
        }))
    }

    useEffect(() => {
        importDataset()
    }, [importFile])

    const importDataset = async () => {
        if (importFile) {
            try {
                await ApiClient.getInstance().importDataset(importFile)
                refresh()
            } catch (error) {
                console.error(error)
            }
        }
    }

    const refresh = () => {
        const newCheckedItems: Record<string, boolean> = {}
        const itemIds = datasets.map(dataset => dataset.id)
        itemIds.forEach(id => {
            newCheckedItems[id] = mainChecked
        })
        setCheckedItems(newCheckedItems)
        getDatasets()
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
                refresh()
                break;
            case "import":
                fileInputRef.current?.click()
                break;
            case "export":
                break;
            case "delete":
                Object.entries(checkedItems).forEach(([id, checked]) => {
                    if (checked) {
                        try {
                            ApiClient.getInstance().deleteDataset(id)
                            refresh()
                        } catch (error) {
                            console.error(error)
                        }
                    }
                })
                break;
        }
    }

    return (
        <div className="p-10 h-screen flex flex-col">
            <input className="hidden" type="file" onChange={(e) => setImportFile(e.target.files?.[0] || null)} ref={fileInputRef} />
            <h1 className="text-2xl font-bold mb-10">Datasets</h1>
            <ControlPanel handleControlClick={handleControlClick}/>
            <div className="bg-neutral-900 w-full h-full mt-2 rounded-xl flex flex-col flex-1 overflow-hidden relative">
                <TableHeader mainChecked={mainChecked} setMainChecked={setMainChecked}/>
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