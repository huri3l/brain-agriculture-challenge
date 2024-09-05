import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useRuralProducers } from '@/requests/rural-producer'
import { RuralProducer } from '@/requests/types'
import { Search } from 'lucide-react'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RuralProducerCard } from './components/rural-producer-card'
import { RuralProducerDataModal } from './components/rural-producer-data'
import { RuralProducerDeleteModal } from './components/rural-producer-delete'
import { RuralProducerCardSkeleton } from './components/skeleton/rural-producer'

interface FilterRuralProducers {
  search?: string
}

export function HomePage() {
  const [search, setSearch] = useState('')
  const [ruralProducerDataOpen, setRuralProducerDataOpen] = useState(false)
  const [ruralProducerDeleteOpen, setRuralProducerDeleteOpen] = useState(false)
  const [currentRuralProducer, setCurrentRuralProducer] = useState<RuralProducer | null>(null)

  const { handleSubmit, register, reset } = useForm<FilterRuralProducers>()

  const {
    data: ruralProducers,
    isSuccess,
    isFetching
  } = useRuralProducers()

  const filter = (ruralProducers: FilterRuralProducers) => {
    if (ruralProducers.search) setSearch(ruralProducers.search)
  }

  const isSearchEmpty = useMemo(() => {
    if (search && !isFetching) {
      return !ruralProducers?.length
    }

    return false
  }, [search, ruralProducers, isFetching])

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
        <div className="flex flex-wrap sm:flex-nowrap justify-between gap-4">
          <form
            onSubmit={handleSubmit(filter)}
            className="flex gap-2 w-full max-w-96"
          >
            <Input {...register('search')} placeholder="Buscar" />
            <Button
              aria-label="Buscar"
              className="px-5 rounded-lg"
              type="submit"
              disabled={hasNoRuralProducers || isFetching || !isSuccess}
            >
              <Search />
            </Button>
          </form>
          <Button type="button" onClick={() => toggleModal(true, setRuralProducerDataOpen)}>
            Cadastrar Produtor Rural
          </Button>
        </div>
      </div>

      {isFetching ? (
        <RuralProducerCardSkeleton />
      ) : hasNoRuralProducers ? (
        <div className="space-y-6 text-center mt-20">
          <strong>Lista de Produtores Rurais</strong>
          <p>Visualize, edite ou remova Produtores Rurais</p>
        </div>
      ) : (
        <div className="w-full space-y-8">
          <ol className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
            {ruralProducers?.map((ruralProducer, index) => (
              <li key={ruralProducer.id + index}>
                <RuralProducerCard data={ruralProducer} onEdit={onEdit} onDelete={onDelete} />
              </li>
            ))}
          </ol>

          {isSearchEmpty ? (
            <div className="flex flex-col gap-4 items-center fade-in animate-in duration-500">
              <p className="text-center text-muted-foreground">
                Não encontramos nenhum resultado
              </p>
              <Button variant="outline" onClick={() => setSearch('')}>
                Limpar busca
              </Button>
            </div>
          ) : (
            isSuccess &&
            search && (
              <Button
                variant="outline"
                onClick={() => {
                  setSearch('')
                  reset()
                }}
                className="fade-in animate-in duration-500"
              >
                Limpar busca
              </Button>
            )
          )}
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
