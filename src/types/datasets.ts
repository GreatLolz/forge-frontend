export type Dataset = {
    id: string,
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

interface InputTypes {
    [key: string]: string
}

export const INPUT_TYPES: InputTypes = {
    "trace": "Memory evaluation trace log",
}

