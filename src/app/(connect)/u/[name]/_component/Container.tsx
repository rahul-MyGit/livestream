"use client"

import { useEffect } from "react";
import {useMediaQuery} from "usehooks-ts";

import { cn } from "@/lib/utils";
import { useCreaterSidebar } from "@/store/use-creater-sidebar";

interface CreaterContainerProps {
    children: React.ReactNode
}

const Container = ({children}: CreaterContainerProps) => {

    const matches = useMediaQuery("(max-width: 1024px)");
    const {collapsed, onCollapse, onExpand} = useCreaterSidebar((state) => state);

    useEffect(() => {
        if(matches) {
            onCollapse();
        } else {
            onExpand();
        }
    }, [matches, onCollapse, onExpand]);

  return (
    <div className={cn("flex-1 h-[calc(100vh-64px)]", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}>{children}</div>
  )
}

export default Container