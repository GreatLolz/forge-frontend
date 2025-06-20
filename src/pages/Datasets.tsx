import TableItem from "../components/datasets/TableItem";
import { useEffect, useRef, useState } from "react";
import { DATASET_TYPES } from "../types/datasets";
import ControlPanel from "../components/datasets/ControlPanel";
import TableHeader from "../components/datasets/TableHeader";
import useDatasetActions from "../hooks/useDatasetActions";
import useSelection from "../hooks/useSelection";

export default function Datasets() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [importFile, setImportFile] = useState<File | null>(null)
    
    const {
        datasets,
        fetchDatasets,
        importDataset,
        exportDataset,
        deleteDataset
    } = useDatasetActions()
    
    const {
        mainChecked,
        setMainChecked,
        checkedItems,
        handleItemChange,
        resetSelections
    } = useSelection(datasets)

    useEffect(() => {
        fetchDatasets()
    }, [])
    
    useEffect(() => {
        const handleImport = async () => {
            if (importFile) {
                try {
                    await importDataset(importFile);
                    resetSelections();
                } catch (error) {
                    console.error("Import failed:", error);
                }
            }
        };
        
        handleImport();
    }, [importFile]);
    
    const handleControlClick = (action: string) => {
        switch (action) {
            case "create":
                break;
            case "edit":
                break;
            case "refresh":
                fetchDatasets()
                resetSelections()
                break;
            case "import":
                fileInputRef.current?.click()
                break;
            case "export":
                Object.entries(checkedItems).forEach(([id, checked]) => {
                    if (checked) {
                        const dataset = datasets.find(dataset => dataset.id === id)
                        if (dataset) {
                            exportDataset(id, dataset.name + ".json")
                        } else {
                            console.error("Tried exporting non-existent dataset with id: " + id)
                        }
                    }
                })
                break;
            case "delete":
                Object.entries(checkedItems).forEach(([id, checked]) => {
                    if (checked) {
                        deleteDataset(id)
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
                            onChange={(checked) => handleItemChange(dataset.id, checked)} 
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}