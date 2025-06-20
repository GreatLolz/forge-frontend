import { useState } from "react";
import type { Dataset } from "../types/datasets";
import ApiClient from "../utils/api";

export default function useDatasetActions() {
    const [datasets, setDatasets] = useState<Dataset[]>([])    

    const fetchDatasets = async () => {
        try {
            const _datasets = await ApiClient.getInstance().getDatasets()
            setDatasets(_datasets)
        } catch (error) {
            console.error(error)
        }
    }

    const importDataset = async (importFile: File) => {
            if (importFile) {
                try {
                    await ApiClient.getInstance().importDataset(importFile)
                    fetchDatasets()
                } catch (error) {
                    console.error(error)
                }
            }
        }

    const exportDataset = async (id: string, filename: string) => {
        try {
            await ApiClient.getInstance().exportDataset(id, filename)
            fetchDatasets()
        } catch (error) {
            console.error(error)
        }
    }

    const deleteDataset = async (id: string) => {
        try {
            await ApiClient.getInstance().deleteDataset(id)
            fetchDatasets()
        } catch (error) {
            console.error(error)
        }
    }

    return {
        datasets,
        fetchDatasets,
        importDataset,
        exportDataset,
        deleteDataset
    }
}
