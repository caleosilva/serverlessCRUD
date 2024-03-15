"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"


interface ComboBoxValue {
    value: string;
    label: string;
}

interface ComboboxProps {
    lista: string[];
    placeholder: string;
    className?: string;
    form: any;
    name: string;
    label: string
}

function transformarLista(valores: string[]): any {
    return valores.map(valor => ({
        value: valor,
        label: valor,
    }));
}

export default function ComboBoxComponent({ lista, placeholder, className, form, name, label }: ComboboxProps) {
    const [open, setOpen] = React.useState(false)
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={"flex flex-col flex-1 mt-1 " + className}>
                    <FormLabel className="mb-1">{label}</FormLabel>
                    <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild className="">
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className={cn(
                                        "flex justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? transformarLista(lista).find(
                                            (item: ComboBoxValue) => item.value === field.value
                                        )?.label
                                        : placeholder}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>

                        <PopoverContent className="p-0">
                            <Command>
                                <CommandInput placeholder="Buscar..." />
                                <CommandEmpty>Informação não encontrada.</CommandEmpty>
                                <CommandGroup>
                                    {transformarLista(lista).map((item: ComboBoxValue) => (
                                        <CommandItem
                                            key={item.value}
                                            value={item.label} // MUDAR ISSO AQUI
                                            onSelect={(currentValue) => {
                                                form.setValue(name, item.value)
                                                setOpen(false)
                                            }}

                                        >
                                            <Check
                                                className={cn(
                                                    "mr-2 h-4 w-4",
                                                    item.value === field.value
                                                        ? "opacity-100"
                                                        : "opacity-0"
                                                )}
                                            />
                                            {item.label}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </Command>
                        </PopoverContent>

                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />

    )
}
