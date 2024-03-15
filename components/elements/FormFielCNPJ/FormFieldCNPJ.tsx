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


export default function FormFieldCNPJ({ form, placeholder, name, label }: { form: any, placeholder: string, name: string, label: string }) {

    const formatCNPJ = (value: string) => {
        const cnpjLimpo = value.replace(/\D/g, '');

        let cnpjComMascara = '';
        if (cnpjLimpo.length <= 2) {
            cnpjComMascara = cnpjLimpo;
        } else if (cnpjLimpo.length <= 5) {
            cnpjComMascara = `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2)}`;
        } else if (cnpjLimpo.length <= 8) {
            cnpjComMascara = `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2, 5)}.${cnpjLimpo.slice(5)}`;
        } else if (cnpjLimpo.length <= 12) {
            cnpjComMascara = `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2, 5)}.${cnpjLimpo.slice(5, 8)}/${cnpjLimpo.slice(8)}`;
        } else {
            cnpjComMascara = `${cnpjLimpo.slice(0, 2)}.${cnpjLimpo.slice(2, 5)}.${cnpjLimpo.slice(5, 8)}/${cnpjLimpo.slice(8, 12)}-${cnpjLimpo.slice(12, 14)}`;
        }
        return cnpjComMascara;
    }

    const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedCPF = formatCNPJ(event.target.value);
        form.setValue(name, formattedCPF);
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} onChange={(e) => handleCNPJChange(e)} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}