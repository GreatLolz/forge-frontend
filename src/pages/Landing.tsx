import { useEffect } from "react";

export default function Landing() {
    const api_url = import.meta.env.VITE_API_URL || "/api/v1"

    const login = () => {
        window.location.href = `${api_url}/auth/login`;
    }

    useEffect(() => {
        login()
    }, [])

    return (
        <div className="flex w-full h-screen justify-center items-center bg-neutral-950 text-neutral-300">
            <h1>Loading...</h1>
        </div>
    )
}