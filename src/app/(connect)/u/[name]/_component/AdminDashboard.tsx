'use client'

import { Button } from "@/components/ui/button";
import { useCreaterSidebar } from "@/store/use-creater-sidebar"
import { redirect, usePathname} from "next/navigation";
import {useSession} from "next-auth/react"
import {Fullscreen, KeyRound, MessageSquare} from 'lucide-react'
import NavItem from "./NavItem";
import { Skeleton } from "@/components/ui/skeleton";

interface SomethingProps {
  data: string
}

const AdminDashboard = ({data} : SomethingProps) => {

  const {collapsed} = useCreaterSidebar((state) => state);

  const showLabel = !collapsed && data.length > 0

  const handleClick = () => {
    redirect('/home')
  }

  const pathname = usePathname();
  const {data: session} = useSession();

  const routes = [
    {
      label : "Stream",
      href: `/u/${session?.user?.name}`,
      icon: Fullscreen
    },
    {
      label : "Keys",
      href: `/u/${session?.user?.name}/keys`,
      icon: KeyRound
    },
    {
      label : "Chat",
      href: `/u/${session?.user?.name}/chat`,
      icon: MessageSquare
    }  
  ]

  if(!session?.user?.name) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i}/>
        ))}
      </ul>
    )
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

      <ul>
      {routes.map((route) =>(
        <NavItem 
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive= {pathname === route.href}
        />
      ))}
      </ul>
    </div>
  )
}

export default AdminDashboard