import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react";
import { SizeIcon } from "@radix-ui/react-icons"

import FormFieldView from "@/components/elements/FormFieldView/FormFieldView"
import { capitalizeEachWord } from "@/utils/formatName"


export default function DialogVisualizarEstudante({ data }: { data: any }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-md">
                    <SizeIcon className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[825px] " onInteractOutside={(event) => { event.preventDefault() }}>
                <DialogHeader>
                    <DialogTitle>Visualizar estudante</DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[600px]">

                    <div className="flex flex-wrap mb-4">
                        <FormFieldView label="Nome" placeholder={capitalizeEachWord(data.nome)} />
                    </div>

                    <div className="flex flex-wrap mb-4">
                    <FormFieldView label="Email" placeholder={data.email} />
                    </div>


                    <div className="flex flex-wrap space-between">
                        <div className="flex-grow w-full md:w-1/2 mb-4">
                            <FormFieldView label="Matrícula" placeholder={data.matricula} />
                        </div>

                        <div className="flex-grow w-full md:w-1/2 mb-4">
                            <FormFieldView label="CPF" placeholder={data.cpf} />
                        </div>
                    </div>
                </ScrollArea>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="">
                            Fechar
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


