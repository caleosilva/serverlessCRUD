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


export default function FormFieldPhone({ form, placeholder, name, label }: { form: any, placeholder: string, name: string, label: string }) {

    const formatPhone = (value: string) => {
        // Remove todos os caracteres não numéricos do telefone
        const telefoneApenasNumeros = value.replace(/\D/g, '');

        let telefoneComMascara = '';
        if (telefoneApenasNumeros.length <= 2) {
            telefoneComMascara = telefoneApenasNumeros;
        } else if (telefoneApenasNumeros.length <= 7) {
            telefoneComMascara = `(${telefoneApenasNumeros.slice(0, 2)}) ${telefoneApenasNumeros.slice(2)}`;
        } else if (telefoneApenasNumeros.length <= 10) {
            telefoneComMascara = `(${telefoneApenasNumeros.slice(0, 2)}) ${telefoneApenasNumeros.slice(2, 6)}-${telefoneApenasNumeros.slice(6)}`;
        } else {
            telefoneComMascara = `(${telefoneApenasNumeros.slice(0, 2)}) ${telefoneApenasNumeros.slice(2, 7)}-${telefoneApenasNumeros.slice(7, 11)}`;
        }

        return telefoneComMascara;
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const formattedPhone = formatPhone(event.target.value);
        form.setValue(name, formattedPhone);
    };

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex-1">
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Input placeholder={placeholder} {...field} onChange={(e) => handlePhoneChange(e)} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}