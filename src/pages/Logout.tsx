import { Button } from "@/components/ui/button";

export default function Logout() {
    return (
        <div className="flex flex-col gap-2 w-full h-screen justify-center items-center bg-neutral-950 text-neutral-300">
            <h1>You have been successfully logged out.</h1>
            <Button className="hover:cursor-pointer" onClick={() => window.location.href = "https://tessact.cloud"}>Back to Tessact</Button>
        </div>
    )
}
