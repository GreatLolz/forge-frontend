export type Dataset = {
    id: number,
    name: string,
    type: string,
    created_at: string,
    updated_at: string,
    samples: number,
}

export type Commit = {
    tag: string,
    created_at: string,
}