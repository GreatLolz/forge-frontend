import axios from "axios"
import type { UserDetails } from "../types/user"
import type { Dataset } from "../types/datasets"

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

    public async getUser(): Promise<UserDetails | null> {
        try {
            const response = await axios.get(`${this.api_url}/me`, { withCredentials: true })
            return response.data
        } catch (error) {
            console.error(error)
            return null
        }
    }

    public async getDatasets(): Promise<Dataset[] | null> {
        try {
            const response = await axios.get(`${this.api_url}/datasets`, { withCredentials: true })
            return response.data.datasets
        } catch (error) {
            console.error(error)
            return null
        }
    }
}
