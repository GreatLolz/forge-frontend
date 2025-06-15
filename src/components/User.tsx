import { UserIcon } from "lucide-react"
import type { UserDetails } from "../types/user"

interface UserProps {
    userDetails: UserDetails | null
}

export default function User({ userDetails }: UserProps) {
    return (
        <div className="flex items-center space-x-2 absolute top-2 right-4 text-neutral-400 hover:text-neutral-300 hover:cursor-pointer">
            <UserIcon size={20} />
            <span>{userDetails?.name}</span>
        </div>
    )
}