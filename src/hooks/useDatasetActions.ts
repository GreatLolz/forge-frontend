import { useState } from "react";
import type { Dataset } from "../types/datasets";
import ApiClient from "../utils/api";

export default function useDatasetActions() {
    const [datasets, setDatasets] = useState<Dataset[]>([])
    const [loading, setLoading] = useState(false)

    const fetchDatasets = async () => {
        try {
            setLoading(true)
            const _datasets = await ApiClient.getInstance().getDatasets()
            setDatasets(_datasets)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const importDataset = async (importFile: File) => {
        if (importFile) {
            try {
                setLoading(true)
                await ApiClient.getInstance().importDataset(importFile)
            } catch (error) {
                console.error(error)
            } finally {
                fetchDatasets()
                setLoading(false)
            }
        }
    }

    const exportDataset = async (id: string, filename: string) => {
        try {
            setLoading(true)
            await ApiClient.getInstance().exportDataset(id, filename)
        } catch (error) {
            console.error(error)
        } finally {
            fetchDatasets()
            setLoading(false)
        }
    }

    const deleteDataset = async (id: string) => {
        try {
            setLoading(true)
            await ApiClient.getInstance().deleteDataset(id)
        } catch (error) {
            console.error(error)
        } finally {
            fetchDatasets()
            setLoading(false)
        }
    }

    return {
        datasets,
        loading,
        fetchDatasets,
        importDataset,
        exportDataset,
        deleteDataset
    }
}
