'use client'

import { cn } from "@/lib/utils"
import { useCreaterSidebar } from "@/store/use-creater-sidebar"


interface CreaterWrapperProps {
    children: React.ReactNode
}

const Wrapper = ({children} : CreaterWrapperProps) => {
    const {collapsed} = useCreaterSidebar((state) => state)
  return (
    <div className={cn("absolute left-0 left-col w-60 h-[calc(100vh-64px)] bg-background border-r border-[#2D2E35] z-50" , collapsed && "w-[50px]")}>
    {children}
    </div>
  )
}

export default Wrapper