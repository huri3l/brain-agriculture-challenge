import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { getInitials } from '@/lib/utils'
import { RuralProducer } from '@/requests/types'
import { Pencil, Trash2 } from 'lucide-react'

interface RuralProducerCardProps {
  data: RuralProducer
  onEdit: (ruralProducer: RuralProducer) => void
  onDelete: (ruralProducer: RuralProducer) => void
}

export function RuralProducerCard({ data, onEdit, onDelete }: RuralProducerCardProps) {
  return (
    <div className="w-full h-64 bg-card border border-border rounded-xl p-5 flex flex-col justify-between animate-in fade-in duration-500">
      <div className="space-y-3">
        <div className="flex items-center gap-1.5">
          <Avatar className="size-14">
            <AvatarFallback className="text-xl">
              {getInitials(data.name)}
            </AvatarFallback>
          </Avatar>
          <p className="flex flex-col justify-center">
            <strong className="font-medium text-card-foreground">
              {data.name}
            </strong>
            <span className="text-muted-foreground text-sm">{data.document}</span>
            <span className="text-muted-foreground text-sm">{data.cultures.join(', ')}</span>
          </p>
        </div>

        <div>
          <p>{data.farm} - {data.area.total} (hectares)</p>

          <p className="text-sm text-muted-foreground inline-flex gap-6">
            <span>Agricultável: {data.area.arable}</span>
            <span>Vegetação: {data.area.vegetation}</span>
          </p>
          <p className="text-sm">

          </p>
          <span className="text-muted-foreground text-sm">
            {data.city} - {data.state}
          </span>
        </div>
      </div>

      <div className="w-full flex gap-4 justify-center">
        <Button
          variant="outline"
          className="w-20"
          aria-label={`Editar o produtor rural ${data.name}`}
          onClick={() => onEdit(data)}
        >
          <Pencil className="size-4" />
        </Button>
        <Button
          variant="outline"
          className="border-destructive text-destructive w-20"
          aria-label={`Deletar o produtor rural ${data.name}`}
          onClick={() => onDelete(data)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  )
}
