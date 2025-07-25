import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import ApiClient from "@/utils/api";
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import { CONVERTER_TYPES, type Converter } from "@/types/converter";
import { DATASET_TYPES } from "@/types/datasets";
import useCreateParams from "@/hooks/useCreateParams";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { isAxiosError } from "axios";

export default function Create() {
    const navigate = useNavigate()
    const [name, setName] = useState<string | undefined>(undefined)
    const [converters, setConverters] = useState<Converter[] | null>(null)
    const [selectedConverter, setSelectedConverter] = useState<Converter | undefined>(undefined)
    const [outputFormat, setOutputFormat] = useState<string | undefined>(undefined)
    const [datasetFile, setDatasetFile] = useState<File | null>(null)
    const { params, updateParam, getParam } = useCreateParams()

    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const getConverters = async () => {
            const _converters = await ApiClient.getInstance().getConverters()
            setConverters(_converters)
        }

        getConverters()
    }, [])

    const handleSubmit = async () => {
        if (!name) {
            alert("Name is required!")
            return
        }

        if (!outputFormat) {
            alert("Output format is required!")
            return
        }

        if (!datasetFile) {
            alert("Dataset file is required!")
            return
        }

        try {
            setLoading(true)
            await ApiClient.getInstance().convert(selectedConverter!.input_format, name, datasetFile, outputFormat, params)
        } catch (error) {
            if (isAxiosError(error) && error.status === 422) {
                alert("Error while validating dataset.")
                return
            }

            console.error(error)
            alert("Error while creating dataset: " + error)
            return
        } finally {
            setLoading(false)
        }

        alert("Dataset created successfully!")
        navigate("/datasets")
    }

    return (
        <div className="p-10 flex flex-col h-full justify-center items-center">
            {loading && <div className="absolute inset-0 bg-neutral-700/50 flex items-center justify-center z-10 m-0">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-neutral-300"></div>
            </div>}
            <div className="flex w-full h-full items-center justify-center">
                <div className="p-10 border-r-neutral-700 border-r-1 w-full h-full flex flex-col items-center justify-center gap-10">
                    <div className="flex flex-col items-center gap-2 w-full">
                        <h1 className="text-xl mb-2">Create new dataset</h1>
                        <Input placeholder="Name" className="w-full max-w-80" onChange={(e) => setName(e.target.value)}></Input>
                        <Input 
                            type="file" 
                            className="max-w-60 hover:cursor-pointer file:border-1 file:rounded-md file:border-primary file:px-1 file:py-0.5 file:mt-[-1px] hover:file:border-primary/50" 
                            onChange={(e) => setDatasetFile(e.target.files?.[0] || null)}
                        />
                    </div>       
                    <div className="flex flex-col items-center gap-2">
                        <Select value={selectedConverter?.input_format} onValueChange={(value) => setSelectedConverter(converters?.find((converter) => converter.input_format === value))}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select input format" />
                            </SelectTrigger>
                            <SelectContent>
                                {converters?.map((converter) => (
                                    <SelectItem key={converter.input_format} value={converter.input_format}>{CONVERTER_TYPES[converter.input_format].label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        
                        { selectedConverter && (
                            <>
                                <ArrowDown />
                                <Select value={outputFormat} onValueChange={setOutputFormat}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select output format" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectedConverter.output_formats.map((format) => (
                                            <SelectItem key={format} value={format}>{DATASET_TYPES[format]}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleSubmit} className="w-full max-w-60 mt-5 hover:cursor-pointer">Submit</Button>
                            </>
                        )}
                    </div>
                </div>
                <div className="p-10 w-full h-full flex flex-col items-start justify-center gap-5">
                    <span className="text-muted-foreground text-sm">FORMAT OPTIONS</span>
                    {selectedConverter ? (
                        <>
                            <div className="flex flex-col items-start gap-5">
                                {Object.entries(CONVERTER_TYPES[selectedConverter.input_format].options).map(([key, option]) => (
                                    <div key={key} className="flex items-center">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex flex-col">
                                                <span>{option.label}</span>
                                                <span className="text-xs text-muted-foreground">{option.description}</span>
                                            </div>
                                            {option.type === "number" && (
                                                <Input type="number" value={getParam(key)} placeholder={option.default.toString()} onChange={(e) => updateParam(key, e.target.value)}/>
                                            )}
                                            {option.type === "range" && (
                                                <>
                                                    <span>{((getParam(key) || option.default) * 100).toFixed(0)}%</span>
                                                    <Slider defaultValue={[getParam(key) || option.default]} min={option.min} max={option.max} step={option.step} onValueChange={(value) => updateParam(key, value)}/>
                                                </>
                                            )}
                                            {option.type === "boolean" && (
                                                <Checkbox checked={getParam(key) || option.default} onCheckedChange={(value) => updateParam(key, value)}/>
                                            )}
                                            {option.type === "string" && (
                                                <Input value={getParam(key)} placeholder={option.default} onChange={(e) => updateParam(key, e.target.value)}/>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <span>(Input format must be selected)</span>
                    )}
                </div>  
            </div>
        </div>
    )
}