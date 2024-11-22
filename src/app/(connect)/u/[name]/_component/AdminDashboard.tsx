'use client'

import { Button } from "@/components/ui/button";
import { useCreaterSidebar } from "@/store/use-creater-sidebar"
import { redirect, usePathname } from "next/navigation";

import {Fullscreen, KeyRound, MessageSquare, Users} from 'lucide-react'

interface SomethingProps {
  data: string
}

const AdminDashboard = ({data} : SomethingProps) => {

  const {collapsed} = useCreaterSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0

  const handleClick = () => {
    redirect('/home')
  }

  return (
    <div>
      {showLabel && (
        <div className="pl-10 p-2 mb-4">
          <p className="text-sm text-muted-foreground">
            <Button onClick={handleClick}>
            Exit
            </Button>
          </p>
        </div>
      )}
    </div>
  )
}

export default AdminDashboard