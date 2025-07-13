import { useEffect, useRef, useState } from "react";
import useDatasetActions from "@/hooks/useDatasetActions";
import { DataTable } from "@/components/datasets/table/DataTable";
import { columns } from "@/components/datasets/table/columns";
import ControlPanel from "@/components/datasets/ControlPanel";
import type { Dataset } from "@/types/datasets";
import { useNavigate } from "react-router";

export default function Datasets() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [importFile, setImportFile] = useState<File | null>(null)
    const [selection, setSelection] = useState<Dataset[]>([])

    const navigate = useNavigate()
    
    const {
        datasets,
        loading,
        fetchDatasets,
        importDataset,
        exportDataset,
        deleteDataset
    } = useDatasetActions()

    useEffect(() => {
        fetchDatasets()
    }, [])
    
    useEffect(() => {
        const handleImport = async () => {
            if (importFile) {
                try {
                    await importDataset(importFile);
                } catch (error) {
                    console.error("Import failed:", error);
                }
            }
        };
        
        handleImport();
    }, [importFile]);

    const handleSelectionChange = (selection: Dataset[]) => {
        setSelection(selection)
    }

    const handleControlClick = (action: string) => {
        switch (action) {
            case "create":
                navigate("/datasets/create")
                break;
            case "edit":
                break;
            case "refresh":
                fetchDatasets()
                break;
            case "import":
                fileInputRef.current?.click();
                break;
            case "export":
                selection.forEach((dataset) => exportDataset(dataset.id, dataset.name))
                break;
            case "delete":
                selection.forEach((dataset) => {
                    setSelection(selection.filter((d) => d.id !== dataset.id))
                    deleteDataset(dataset.id)
                })
                break;
        }
    }
    
    return (
        <div className="p-10 flex flex-col h-full">
            {loading && <div className="absolute inset-0 bg-neutral-700/50 flex items-center justify-center z-10 m-0">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-neutral-300"></div>
            </div>}
            <input className="hidden" type="file" onChange={(e) => setImportFile(e.target.files?.[0] || null)} ref={fileInputRef} />
            <div className="mb-2">
                <ControlPanel handleControlClick={handleControlClick}/>
            </div>
            <DataTable columns={columns} data={datasets} onSelectionChange={handleSelectionChange}/>
        </div>
    )
}