export type Dataset = {
    id: number,
    name: string,
    type: string,
    created_at: string,
    updated_at: string,
    sample_count: number,
}

export type Commit = {
    tag: string,
    created_at: string,
}

interface DatasetTypes {
    [key: string]: string
}

export const DATASET_TYPES: DatasetTypes = {
    "memory-sft": "Memory SFT",
}
