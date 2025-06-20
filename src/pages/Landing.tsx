import { useEffect } from "react";
import ApiClient from "../utils/api";

export default function Landing() {
    useEffect(() => {
        ApiClient.getInstance().login()
    }, [])

    return (
        <div className="flex w-full h-screen justify-center items-center bg-neutral-950 text-neutral-300">
            <h1>Loading...</h1>
        </div>
    )
}