import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ArrowDown } from "lucide-react";

export default function Create() {
    return (
        <div className="p-10 flex flex-col h-full justify-center items-center">
            <div className="flex w-full h-full items-center justify-center max-h-100 max-w-300">
                <div className="p-10 border-r-neutral-700 border-r-1 w-full h-full flex flex-col items-center justify-center gap-10">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <h1 className="text-xl mb-2">Create new dataset</h1>
                        <Input placeholder="Name" className="w-full max-w-80"></Input>
                    </div>       
                    <div className="flex flex-col items-center gap-2">
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select input format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="trace">Trace</SelectItem>
                            </SelectContent>
                        </Select>
                        <ArrowDown />
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Select output format" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="memory-sft">Memory SFT</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="p-10 w-full h-full flex flex-col items-start gap-5">
                    <span className="text-muted-foreground text-xs">FORMAT OPTIONS</span>
                    <span>(Output format must be selected)</span>
                </div>
            </div>
        </div>
    )
}