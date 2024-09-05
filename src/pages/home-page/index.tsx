import { Button } from '@/components/ui/button'
import { useRuralProducers } from '@/requests/rural-producer'
import { RuralProducer } from '@/requests/types'
import { useCallback, useMemo, useState } from 'react'
import { RuralProducerCard } from './components/rural-producer-card'
import { RuralProducerDataModal } from './components/rural-producer-data'
import { RuralProducerDeleteModal } from './components/rural-producer-delete'
import { RuralProducerCardSkeleton } from './components/skeleton/rural-producer'

export function HomePage() {
  const [ruralProducerDataOpen, setRuralProducerDataOpen] = useState(false)
  const [ruralProducerDeleteOpen, setRuralProducerDeleteOpen] = useState(false)
  const [currentRuralProducer, setCurrentRuralProducer] = useState<RuralProducer | null>(null)

  const {
    data: ruralProducers,
    isSuccess,
    isFetching
  } = useRuralProducers()

  const hasNoRuralProducers = useMemo(() => {
    if (isSuccess) return !ruralProducers?.length
    return false
  }, [ruralProducers, isSuccess])

  const toggleModal = (state: boolean, cb: (state: boolean) => void) => {
    if (!state) {
      setCurrentRuralProducer(null)
    }

    cb(state)
  }

  const onEdit = useCallback((ruralProducer: RuralProducer) => {
    setCurrentRuralProducer(ruralProducer)
    toggleModal(true, setRuralProducerDataOpen)
  }, [setCurrentRuralProducer, setRuralProducerDataOpen, toggleModal])

  const onDelete = useCallback((ruralProducer: RuralProducer) => {
    setCurrentRuralProducer(ruralProducer)
    toggleModal(true, setRuralProducerDeleteOpen)
  }, [setCurrentRuralProducer, setRuralProducerDeleteOpen, toggleModal])

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="space-y-10 w-full">
        <h1 className="text-2xl font-bold">Produtores Rurais</h1>
        <Button type="button" onClick={() => toggleModal(true, setRuralProducerDataOpen)}>
          Cadastrar Produtor Rural
        </Button>
      </div>

      {isFetching ? (
        <RuralProducerCardSkeleton />
      ) : hasNoRuralProducers ? (
        <div className="space-y-6 text-center mt-20">
          <strong>Nenhum produtor rural encontrado</strong>
        </div>
      ) : (
        <div className="w-full space-y-8">
          <ol className="grid sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
            {ruralProducers?.map((ruralProducer, index) => (
              <li key={ruralProducer.id + index}>
                <RuralProducerCard data={ruralProducer} onEdit={onEdit} onDelete={onDelete} />
              </li>
            ))}
          </ol>
        </div>
      )}

      <RuralProducerDataModal
        open={ruralProducerDataOpen}
        onOpenChange={(state) => toggleModal(state, setRuralProducerDataOpen)}
        ruralProducer={currentRuralProducer}
      />

      <RuralProducerDeleteModal
        open={ruralProducerDeleteOpen}
        onOpenChange={(state) => toggleModal(state, setRuralProducerDeleteOpen)}
        ruralProducer={currentRuralProducer}
      />
    </div>
  )
}
