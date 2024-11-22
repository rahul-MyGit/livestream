'use client'

import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({
    children
}: WrapperProps) => {
    const {collapsed} = useSidebar((state) => state)
    return (
        <aside
        className={cn("absolute left-0 flex flex-col w-60 h-[calc(100vh-64px)] bg-background border-r border-[#2D2E35] z-50" , collapsed && "w-[50px]")}
        >
            {children}
        </aside>
    )
}