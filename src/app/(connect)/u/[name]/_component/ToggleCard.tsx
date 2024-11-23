'use client'

import { Switch } from '@/components/ui/switch'
import React, { useTransition } from 'react'
import { toast } from "sonner";
import { updateStream } from '@/app/actions/streamAction';


type FieldType = "isChatEnabled" | "isChatDelayed"

interface ToggleCardProp {
    field: FieldType,
    label: string,
    value: boolean
}

const ToggleCard = ({field, label, value} : ToggleCardProp) => {

  const [ispending, startTransition] = useTransition()

  const onChange = async () => {
    startTransition(() => {
      updateStream({ [field] : !value})
      .then(() => toast.success("Chat setting updated!"))
      .catch(() => toast.error("Something went wrong"))
    })
  }

  return (
    <div className='rounded-xl bg-muted p-6'>
        <div className='flex items-center justify-between'>
        <p className='font-semibold shrink-0'>
          {label}
        </p>
        <div className='space-y-2'>
          <Switch checked={value} disabled={ispending} onCheckedChange={onChange}>
            {value ? "on" : "off"}
          </Switch>
        </div>
        </div>
    </div>
  )
}

export default ToggleCard