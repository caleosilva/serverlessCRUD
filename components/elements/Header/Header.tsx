"use client";
import React from "react";
import Nav from "./components/Nav";
import Image from 'next/image'


export default function Header({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {

    return (
        <div className="border-b flex items-center space-between">

            <div className="flex items-center space-between">
                <Image
                    src="/logo-UEFS.png"
                    width={25}
                    height={25}
                    alt="Imagem ilustrativa da logo da UEFS."
                    className="ml-5 mr-3"
                />
                <p className="text-lg font-medium">
                    SIECOMP 2024.1
                </p>
            </div>

            <div className="flex h-16 items-center px-4 ml-auto" >
                <Nav className="mx-6" />
            </div>
        </div>

    )
}