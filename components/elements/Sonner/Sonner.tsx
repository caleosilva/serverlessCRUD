import { toast } from "sonner"

import { Button } from "@/components/ui/button"

interface SonnerProps {
    titulo: string;
    descricao: string;
}

export function Sonner({titulo, descricao}: SonnerProps) {
    return (
        <Button
            variant="outline"
            onClick={() =>
                toast(titulo, {
                    description: descricao,
                    action: {
                        label: "Entendi",
                        onClick: () => {},
                    },
                })
            }
        >
            Show Toast
        </Button>
    )
}
