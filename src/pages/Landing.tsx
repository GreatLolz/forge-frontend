import { useEffect } from "react";

export default function Landing() {
    const login = () => {
        window.location.href = `/api/v1/auth/login`;
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