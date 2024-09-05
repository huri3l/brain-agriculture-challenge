import { cn } from '@/lib/utils'
import {
  LineChart,
  UsersRound
} from 'lucide-react'
import { Link } from 'react-router-dom'

const linksMap = [
  {
    label: 'Produtores Rurais',
    href: '/',
    icon: UsersRound
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LineChart
  }
]

interface SideMenuProps {
  device: 'desktop' | 'mobile'
}

export const SideMenu = ({ device }: SideMenuProps) => {
  return (
    <nav className={cn("flex flex-col justify-between py-4 pr-4 min-w-48 md:min-w-64 bg-card", device === 'mobile' && 'h-full')}>
      <ul className="space-y-1">
        {linksMap.map(({ label, icon, href }, idx) => {
          const Icon = icon
          const isActive =
            href === window.location.pathname

          return (
            <li key={label + idx}>
              <Link
                to={href}
                className={cn(
                  'flex gap-2 items-center py-2 px-8 w-full hover:bg-muted/50 transition rounded-r-lg cursor-pointer',
                  isActive && 'bg-muted text-primary font-bold'
                )}
              >
                <Icon className="stroke-[1.5] size-4" />
                <p>{label}</p>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
