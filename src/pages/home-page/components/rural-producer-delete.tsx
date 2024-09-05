import { Button } from "@/components/ui/button";
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle } from "@/components/ui/credenza";
import { useDeleteRuralProducer } from "@/requests/rural-producer";
import { RuralProducer } from "@/requests/types";

interface RuralProducerDeleteModalProps {
  open: boolean
  onOpenChange: (state: boolean) => void
  ruralProducer?: RuralProducer | null
}

export function RuralProducerDeleteModal({
  open,
  onOpenChange,
  ruralProducer,
}: RuralProducerDeleteModalProps) {
  const { mutate: deleteRuralProducer } = useDeleteRuralProducer()

  return ruralProducer ? (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader className="text-start">
          <CredenzaTitle>
            Você tem certeza?
          </CredenzaTitle>

          <CredenzaDescription>
            Ao remover esse produtor rural, não será possível recuperar os dados dele novamente.
          </CredenzaDescription>
        </CredenzaHeader>

        <div className="w-full h-1" />

        <CredenzaFooter>
          <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>

          <Button type="button" onClick={() => {
            deleteRuralProducer({ id: ruralProducer.id! })
            onOpenChange(false)
          }}>
            Sim
          </Button>
        </CredenzaFooter>
      </CredenzaContent>
    </Credenza>
  ) : null
}