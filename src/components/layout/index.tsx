import { ReactNode, useEffect } from "react"
import { Header } from "../commons/header"
import { SideMenu } from "../commons/side-menu"

interface LayoutProps {
  children: ReactNode
}

export const Layout = ({ children }: LayoutProps) => {
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex h-full">
        <div>
          <div className="hidden sm:flex border-r sticky self-start top-[72px] h-[calc(100vh-72px)]">
            <SideMenu device="desktop" />
          </div>
        </div>
        <div className="px-4 py-12 w-full max-w-[1280px] mx-auto h-full">
          {children}
        </div>
      </div>
    </div>
  )
}
