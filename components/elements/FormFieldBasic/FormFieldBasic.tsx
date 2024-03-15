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
    className?: string;
}


export default function FormFieldBasic({ form, placeholder, name, label, type, className }: FormFieldBasicProps) {
    const formatarCampo = (value: any) => {
        try {
            if (type === 'date' && typeof value === 'string') {
                return new Date(value).toISOString().slice(0, 10);
            }
            return value;
        } catch (error) {
        }

    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} type={type} value={formatarCampo(field.value)} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}