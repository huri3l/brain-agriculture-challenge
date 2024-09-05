import { useAppSelector } from "@/hooks/use-redux";
import { useRuralProducers } from "@/requests/rural-producer";
import { RootState } from "@/store/store";
import { useMemo } from "react";
import { DashboardChart } from "./components/dashboard-chart";
import { DashboardResumeCard } from "./components/dashboard-resume";
import { DashboardPageSkeleton } from "./components/skeleton/dashboard-page";

export const DashboardPage = () => {
  const { data, isFetching } = useRuralProducers();

  const isFetched = useMemo(() => !!data?.length && !isFetching, [data, isFetching])

  const {
    totalFarms,
    totalArea,
    stateDistribution,
    cultureDistribution,
    areaDistribution,
  } = useAppSelector((state: RootState) => state.ruralProducers);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="space-y-10 w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        {isFetched ? (
          <div className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
              <DashboardResumeCard title="Total de Fazendas" data={totalFarms} />
              <DashboardResumeCard title="Total de Área" subtitle="(em hectares)" data={totalArea} />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <DashboardChart title="Estado" description="Distribuição de fazendas por estado" data={stateDistribution} />
              <DashboardChart title="Cultura" description="Distribuição de culturas" data={cultureDistribution} />
              <DashboardChart title="Uso do Solo" description="Distribuição de área agricultável e vegetação" data={areaDistribution} />
            </div>
          </div>
        ) : (
          <DashboardPageSkeleton />
        )}
      </div>
    </div>
  )
}