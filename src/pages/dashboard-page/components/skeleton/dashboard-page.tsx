import { Skeleton } from "@/components/ui/skeleton"

export const DashboardPageSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="space-y-10 w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Skeleton className="w-full h-44 rounded-lg" />
            <Skeleton className="w-full h-44 rounded-lg" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Skeleton className="w-full h-64 rounded-lg" />
            <Skeleton className="w-full h-64 rounded-lg" />
            <Skeleton className="w-full h-64 rounded-lg" />
          </div>
        </div>

      </div>
    </div>
  )
}