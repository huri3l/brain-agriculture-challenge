interface DashboardResumeCardProps {
  title: string
  subtitle?: string
  data: number
}

export const DashboardResumeCard = ({ title, subtitle, data }: DashboardResumeCardProps) => {
  return (
    <div className="bg-card p-8 h-44 w-full flex flex-col justify-between items-center text-lg border rounded-lg">
      <div className="inline-flex gap-2 items-center">
        <strong>{title}</strong>
        <span className="text-sm text-muted-foreground">{subtitle}</span>
      </div>
      <p className="text-center text-6xl font-bold">{data}</p>
    </div>
  )
}