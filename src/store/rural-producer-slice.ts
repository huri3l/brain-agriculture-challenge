import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Area {
  arable: number;
  vegetation: number;
  total: number;
}

interface RuralProducer {
  id: string;
  document: string;
  name: string;
  farm: string;
  city: string;
  state: string;
  area: Area;
  cultures: string[];
}

interface RuralProducerState {
  data: RuralProducer[] | null;
  totalFarms: number;
  totalArea: number;
  stateDistribution: Record<string, number>;
  cultureDistribution: Record<string, number>;
  areaDistribution: Record<string, number>;
}

const initialState: RuralProducerState = {
  data: null,
  totalFarms: 0,
  totalArea: 0,
  stateDistribution: {},
  cultureDistribution: {},
  areaDistribution: {},
};

const ruralProducersSlice = createSlice({
  name: 'ruralProducers',
  initialState,
  reducers: {
    setRuralProducers: (state, action: PayloadAction<RuralProducer[]>) => {
      state.data = action.payload;
      state.totalFarms = action.payload.length;

      state.totalArea = action.payload.reduce((sum, producer) => sum + producer.area.total, 0);

      const stateCounts: Record<string, number> = {};
      action.payload.forEach(producer => {
        stateCounts[producer.state] = (stateCounts[producer.state] || 0) + 1;
      });
      const totalStates = action.payload.length;
      state.stateDistribution = Object.fromEntries(
        Object.entries(stateCounts).map(([state, count]) => [state, (count / totalStates) * 100])
      );

      const cultureCounts: Record<string, number> = {};
      action.payload.forEach(producer => {
        producer.cultures.forEach(culture => {
          cultureCounts[culture] = (cultureCounts[culture] || 0) + 1;
        });
      });
      const totalCultures = Object.values(cultureCounts).reduce((sum, count) => sum + count, 0);
      state.cultureDistribution = Object.fromEntries(
        Object.entries(cultureCounts).map(([culture, count]) => [culture, (count / totalCultures) * 100])
      );

      state.areaDistribution = action.payload.reduce(
        (acc, producer) => {
          acc['Agricultável'] = (acc['Agricultável'] || 0) + producer.area.arable;
          acc['Vegetação'] = (acc['Vegetação'] || 0) + producer.area.vegetation;
          return acc;
        },
        { 'Agricultável': 0, 'Vegetação': 0 } as Record<string, number>
      );
    },
  },
});

export const { setRuralProducers } = ruralProducersSlice.actions;
export default ruralProducersSlice.reducer;