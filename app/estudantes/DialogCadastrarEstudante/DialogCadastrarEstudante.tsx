import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Loader2 } from "lucide-react"

import { useForm } from "react-hook-form"
import FormFieldBasic from '@/components/elements/FormFieldBasic/FormFieldBasic'
import FormFieldCPF from "@/components/elements/FormFieldCPF/FormFieldCPF"
import AlertDestructive from "@/components/elements/AlertDestructive/AlertDestructive"
import AlertAttention from "@/components/elements/AlertAttention/AlertDestructive"
import { useState } from "react";
import { Form } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

function isEmail(value: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
}

const formSchema = z.object({
    nome: z.string().min(2, { message: "O nome deve ter no mínimo 2 caracteres" }),
    matricula: z.string().min(4, { message: "A matrícula deve possuir no mínimo 4 caracteres" }),
    cpf: z.string().min(13, { message: "O CPF deve conter entre 13 e 14 números" }),
    email: z.string().refine(value => isEmail(value), {
        message: "O e-mail inserido é inválido",
    }),
});

export default function DialogCadastrarUsuario({ dataTabela, update, setUpdate }: { dataTabela: any, update: any, setUpdate: any }) {
    const { toast } = useToast()

    const [erroServer, setErroServer] = useState(false)
    const [erroUsuarioExiste, setErroUsuarioExiste] = useState(false)

    const [open, setOpen] = useState(false);
    const [isFormSubmitting, setFormSubmitting] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            matricula: "",
            cpf: "",
            email: "",
        }
    });

    const limparCampos = () => {
        form.reset();
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setFormSubmitting(true);
        setErroServer(false);
        setErroUsuarioExiste(false);

        console.log("Dados do cadastro: ", values);

        try {
            const response = await fetch('/api/estudante', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            });

            if (response.ok) {
                limparCampos();
                setOpen(false)
                setUpdate(!update)

                toast({
                    title: "Sucesso!",
                    description: "O estudante foi cadastrado.",
                    duration: 5000,
                    variant: "success"
                });
            } else {
                const status = response.status;
                if (status === 409) {
                    setErroUsuarioExiste(true);
                } else if (status === 500) {
                    setErroServer(true)
                } else {
                    setErroServer(true)
                }
            }
        } catch (error) {
            setErroServer(true)
        } finally {
            setFormSubmitting(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Cadastrar estudante</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[825px] " onInteractOutside={(event) => { event.preventDefault() }}>
                <DialogHeader>
                    <DialogTitle>Cadastrar estudante</DialogTitle>
                </DialogHeader>

                <ScrollArea className="max-h-[600px]">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} id="cadastroForm" className="space-y-2 flex flex-col">
                            
                            <FormFieldBasic form={form} placeholder="" name="nome" label="Nome" type="text" />
                            <FormFieldBasic form={form} placeholder="" name="email" label="Email" type="text" className="flex-1 mr-4"/>


                            <div className="grid grid-cols-2 gap-8">
                                <FormFieldBasic form={form} placeholder="" name="matricula" label="Matrícula" type="text" />
                                <FormFieldCPF form={form} label="CPF" name="cpf" placeholder="XXX.XXX.XXX-XX" />
                            </div>
                        </form>
                    </Form>
                </ScrollArea>

                {erroServer &&
                    <AlertDestructive descricao="Não foi possível cadastrar o estudante. Tente novamente." titulo="Erro" />
                }

                {erroUsuarioExiste &&
                    <AlertAttention descricao="Já existe um estudante com o CPF inserido acima." titulo="Atenção!" />
                }

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary" className="">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <div>
                        <Button type="submit" form="cadastroForm" disabled={isFormSubmitting}>
                            {isFormSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Cadastrando...
                                </>
                            ) : (
                                "Cadastrar"
                            )}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


