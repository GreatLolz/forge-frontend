import { useState } from "react";

export default function useCreateParams() {
    const [params, setParams] = useState<Record<string, any>>({})

    const updateParam = (key: string, value: any) => {
        setParams((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    const getParam = (key: string) => {
        return params[key]
    }

    return {
        params,
        updateParam,
        getParam
    }
}
