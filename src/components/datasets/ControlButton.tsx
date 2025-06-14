import { Button } from "@headlessui/react";

export default function ControlButton({ icon, text }: { icon: React.ReactNode, text: string }) {
    return (
        <Button className="px-2 rounded-md flex items-center space-x-2 hover:bg-neutral-900 hover:cursor-pointer">
            {icon}
            <span className="text-sm">{text}</span>
        </Button>
    )
}