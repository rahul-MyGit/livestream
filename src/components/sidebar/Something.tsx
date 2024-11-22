'use client'

import { useSidebar } from "@/store/use-sidebar"
import { User } from "@prisma/client"
import { Button } from "../ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"


type SomethingProps =  {
  data: string | null
}

const Something = ({ data }: SomethingProps) => {

  const { collapsed } = useSidebar((state) => state);

  console.log(data);
  if (data == null) {
    redirect('/')
  }
  const showLabel = !collapsed && data

  return (
    <div>
      {showLabel && (
        <div className="pl-6 mb-4">
          <p className="text-sm text-muted-foreground">
            <Link href={`/board/excelidraw`}>
            <Button className="m-7">
              Excelidraw
            </Button>
            </Link>
            <Link href={`/u/${data}`}>
            <Button className="m-7">
              Dashboard
            </Button>
            </Link>
          </p>
        </div>
      )}
    </div>
  )
}

export default Something