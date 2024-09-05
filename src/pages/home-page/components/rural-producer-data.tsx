import { Button } from "@/components/ui/button";
import { Credenza, CredenzaContent, CredenzaDescription, CredenzaFooter, CredenzaHeader, CredenzaTitle } from "@/components/ui/credenza";
import { DocNumberInput } from "@/components/ui/doc-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { useCreateRuralProducer, useUpdateRuralProducer } from "@/requests/rural-producer";
import { RuralProducer } from "@/requests/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface RuralProducerDataModalProps {
  open: boolean
  onOpenChange: (state: boolean) => void
  ruralProducer?: RuralProducer | null
}

const cultures = ["Soja", "Milho", "Algodão", "Café", "Cana de Açúcar"]

export function RuralProducerDataModal({
  open,
  onOpenChange,
  ruralProducer,
}: RuralProducerDataModalProps) {
  const { mutate: createRuralProducer } = useCreateRuralProducer();

  const { mutate: updateRuralProducer } = useUpdateRuralProducer();

  const schema = z.object({
    document: z
      .string({
        required_error: 'Este campo é obrigatório',
      })
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, '');
        return replacedDoc.length === 11 || replacedDoc.length === 14;
      }, 'Esse campo deve conter 11 caracteres (CPF) ou 14 caracteres (CNPJ)')
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, '');
        return !!Number(replacedDoc);
      }, 'CPF/CNPJ deve conter apenas números'),
    name: z.string({
      required_error: 'Este campo é obrigatório'
    }).min(1, {
      message: 'Este campo é obrigatório'
    }),
    farm: z.string({
      required_error: 'Este campo é obrigatório'
    }).min(1, {
      message: 'Este campo é obrigatório'
    }),
    city: z.string({
      required_error: 'Este campo é obrigatório'
    }).min(1, {
      message: 'Este campo é obrigatório'
    }),
    state: z.string({
      required_error: 'Este campo é obrigatório'
    }).min(1, {
      message: 'Este campo é obrigatório'
    }).max(2, {
      message: 'A UF deve ter 2 caracteres'
    }).regex(/^[A-Za-z]+$/, {
      message: 'A UF deve conter apenas letras'
    }),
    arable_area: z.coerce.number({
      required_error: 'Este campo é obrigatório'
    }).min(0.1, {
      message: 'O valor deve ser maior que 0'
    }),
    vegetation_area: z.coerce.number({
      required_error: 'Este campo é obrigatório'
    }).min(0.1, {
      message: 'O valor deve ser maior que 0'
    }),
    total_area: z.coerce.number({
      required_error: 'Este campo é obrigatório'
    }).min(0.1, {
      message: 'O valor deve ser maior que 0'
    }),
    cultures: z.array(
      z.string({
        required_error: 'Este campo é obrigatório'
      })
    ).min(1, {
      message: 'Este campo é obrigatório'
    }),
  }).refine((data) => {
    return data.arable_area + data.vegetation_area <= data.total_area;
  }, {
    path: ['total_area'],
    message: 'A soma de área agricultável e área de vegetação não pode ser maior que a área total',
  })

  const cleanForm = {
    document: '',
    name: '',
    farm: '',
    city: '',
    state: '',
    cultures: [],
    arable_area: 0,
    total_area: 0,
    vegetation_area: 0
  }

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: cleanForm
  })

  const onSubmit = (data: z.infer<typeof schema>) => {
    const formattedData = {
      document: data.document,
      name: data.name,
      farm: data.farm,
      city: data.city,
      state: data.state,
      cultures: data.cultures,
      area: {
        arable: data.arable_area,
        vegetation: data.vegetation_area,
        total: data.total_area
      }
    }

    if (ruralProducer?.id) {
      updateRuralProducer({ ...formattedData, id: ruralProducer?.id })
    } else {
      createRuralProducer(formattedData)
    }

    onToggleOpen(false)
  }

  const onToggleOpen = (state: boolean) => {
    if (!state) {
      form.reset(cleanForm)
      form.clearErrors()
    }

    onOpenChange(state)
  }

  useEffect(() => {
    if (ruralProducer) {
      form.reset({
        document: ruralProducer.document,
        name: ruralProducer.name,
        farm: ruralProducer.farm,
        city: ruralProducer.city,
        state: ruralProducer.state,
        arable_area: ruralProducer.area.arable,
        total_area: ruralProducer.area.total,
        vegetation_area: ruralProducer.area.vegetation,
        cultures: ruralProducer.cultures,
      })
    } else {
      form.reset(cleanForm)
    }
  }, [ruralProducer, form])

  return (
    <Credenza open={open} onOpenChange={onToggleOpen}>
      <CredenzaContent className="sm:max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CredenzaHeader className="text-start">
              <CredenzaTitle>
                {ruralProducer?.id ? 'Editar Produtor Rural' : 'Cadastrar Produtor Rural'}
              </CredenzaTitle>

              <CredenzaDescription>
                {ruralProducer?.id ? 'Atualize as informações desse produtor rural' : 'Cadastre um novo produtor rural'}
              </CredenzaDescription>
            </CredenzaHeader>

            <div className="flex flex-col items-center gap-3 my-4">
              <FormField
                control={form.control}
                name="document"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-2 flex flex-col w-full">
                    <FormLabel>
                      Documento (CPF ou CNPJ)
                    </FormLabel>
                    <FormControl>
                      <DocNumberInput
                        placeholder="Insira o documento do produtor rural"
                        error={!!fieldState.error}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-2 flex flex-col w-full">
                    <FormLabel>
                      Nome
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insira o nome do produtor rural"
                        error={!!fieldState.error}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="farm"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-2 flex flex-col w-full">
                    <FormLabel>
                      Nome da Fazenda
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insira o nome da fazenda"
                        error={!!fieldState.error}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-2 flex flex-col w-full">
                      <FormLabel>
                        Cidade
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira a cidade"
                          error={!!fieldState.error}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="state"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-2 flex flex-col w-full">
                      <FormLabel>
                        Estado (UF)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira o estado"
                          error={!!fieldState.error}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="cultures"
                render={({ field, fieldState }) => (
                  <FormItem className="flex flex-col w-full">
                    <FormLabel>
                      Culturas
                    </FormLabel>
                    <MultiSelect
                      placeholder="Culturas"
                      options={cultures}
                      onValueChange={field.onChange}
                      error={!!fieldState.error}
                      defaultValue={field.value}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <div className="flex gap-2">
                <FormField
                  control={form.control}
                  name="arable_area"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-2 flex flex-col w-full">
                      <FormLabel>
                        Área Agricultável
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira a área em hectares"
                          error={!!fieldState.error}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vegetation_area"
                  render={({ field, fieldState }) => (
                    <FormItem className="space-y-2 flex flex-col w-full">
                      <FormLabel>
                        Área de vegetação
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Insira a área em hectares"
                          error={!!fieldState.error}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="total_area"
                render={({ field, fieldState }) => (
                  <FormItem className="space-y-2 flex flex-col w-full">
                    <FormLabel>
                      Área Total
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Insira a área em hectares"
                        error={!!fieldState.error}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <CredenzaFooter className="mt-10">
              <Button variant="outline" type="button" onClick={() => onToggleOpen(false)}>
                Cancelar
              </Button>

              <Button type="submit">
                Confirmar
              </Button>
            </CredenzaFooter>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  )
}