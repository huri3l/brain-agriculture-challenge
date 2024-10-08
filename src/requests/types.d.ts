export interface RuralProducer {
  id?: string;
  document: string;
  name: string;
  farm: string;
  city: string;
  state: string;
  area: {
    arable: number;
    vegetation: number;
    total: number;
  }
  cultures: string[];
}

export interface CreateRuralProducerMutationData extends RuralProducer {}
export interface UpdateRuralProducerMutationData extends RuralProducer {}
export interface DeleteRuralProducerMutationData { 
  id: string
 }

type RuralProducerResponse = {
  id: string;
  document: string;
  name: string;
  farm: string;
  city: string;
  state: string;
  area: {
      arable: number;
      vegetation: number;
      total: number;
  };
  cultures: string[];
}[]