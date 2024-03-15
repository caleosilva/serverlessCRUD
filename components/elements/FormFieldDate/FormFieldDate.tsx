"use client"

import * as React from "react"
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FormFieldBasicProps {
    form: any;
    placeholder: string;
    name: string;
    label: string;
    type: string;
    className?: string; // Parâmetro opcional para className
}


export default function FormFieldDate({ form, placeholder, name, label, type, className }: FormFieldBasicProps) {
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} type={type} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}