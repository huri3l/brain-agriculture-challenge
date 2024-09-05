import { Menu } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sheet, SheetContent } from '../ui/sheet'
import { SideMenu } from './side-menu'

export const Header = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  return (
    <>
      <header className="flex justify-between items-center p-3 sticky inset-0 h-[72px] bg-card z-50 border-b">
        <div className="flex gap-4 items-center">
          <button
            className="sm:hidden"
            type="button"
            onClick={() => setIsSideMenuOpen(true)}
          >
            <Menu />
          </button>
          <Link to="/" className="flex gap-4 items-center">
            <img src="/logo.png" />
          </Link>
        </div>
      </header>

      <Sheet open={isSideMenuOpen} onOpenChange={setIsSideMenuOpen}>
        <SheetContent side="left" className="p-0 pt-8 max-w-56">
          <SideMenu device="mobile" />
        </SheetContent>
      </Sheet>
    </>
  )
}
