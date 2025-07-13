import axios from "axios"
import type { UserDetails } from "../types/user"
import type { Dataset } from "../types/datasets"
import type { Converter } from "@/types/converter"

export default class ApiClient {
    private static instance: ApiClient
    private api_url: string

    constructor() {
        this.api_url = import.meta.env.VITE_API_URL || "/api/v1"
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient()
        }
        return ApiClient.instance
    }

    public login() {
        window.location.href = `${this.api_url}/auth/login`;
    }

    public async logout(): Promise<void> {
        window.location.href = `${this.api_url}/auth/logout`;
    }

    public async getUser(): Promise<UserDetails> {
        try {
            const response = await axios.get(`${this.api_url}/me`, { withCredentials: true })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    // datasets

    public async getDatasets(): Promise<Dataset[]> {
        try {
            const response = await axios.get(`${this.api_url}/datasets`, { withCredentials: true })
            return response.data.datasets
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    public async importDataset(file: File): Promise<boolean> {
        try {
            const formData = new FormData()
            formData.append("import_file", file)
            const response = await axios.post(`${this.api_url}/datasets/import`, formData, { withCredentials: true })
            return response.status === 200
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    public async exportDataset(id: string, filename: string): Promise<void> {
        try {
            const response = await axios({
                url: `${this.api_url}/datasets/export`,
                method: "GET",
                params: { dataset_id: id },
                withCredentials: true,
                responseType: "blob",
            })

            const href = URL.createObjectURL(new Blob([response.data]))

            const link = document.createElement("a")
            link.href = href
            link.setAttribute("download", filename)
            document.body.appendChild(link)
            link.click()
            
            document.body.removeChild(link)
            URL.revokeObjectURL(href)
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    public async deleteDataset(id: string): Promise<boolean> {
        try {
            const response = await axios.delete(`${this.api_url}/datasets/${id}`, { withCredentials: true })
            return response.status === 200
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    public async getConverters(): Promise<Converter[]> {
        try {
            const response = await axios.get(`${this.api_url}/datasets/convert`, { withCredentials: true })
            return response.data.converters
        } catch (error) {
            console.error(error)
            throw error
        }
    }
}
