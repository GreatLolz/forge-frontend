import { useEffect, useRef, useState } from "react";
import useDatasetActions from "../hooks/useDatasetActions";
import { DataTable } from "@/components/datasets/table/DataTable";
import { columns } from "@/components/datasets/table/columns";
import ControlPanel from "@/components/datasets/ControlPanel";

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

    const handleControlClick = (action: string) => {
        switch (action) {
            case "create":
                break;
            case "edit":
                break;
            case "refresh":
                break;
            case "import":
                break;
            case "export":
                break;
            case "delete":
                break;
        }
    }
    
    return (
        <div className="p-10 h-screen flex flex-col">
            <input className="hidden" type="file" onChange={(e) => setImportFile(e.target.files?.[0] || null)} ref={fileInputRef} />
            <h1 className="text-2xl font-bold mb-10">Datasets</h1>
            <div className="mb-2">
                <ControlPanel handleControlClick={handleControlClick}/>
            </div>
            <DataTable columns={columns} data={datasets}/>
        </div>
    )
}