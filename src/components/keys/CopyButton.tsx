'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { CheckCheck, Copy } from "lucide-react"

interface CopyButtonProp {
    value?: string
}

export const CopyButton = ({value} : CopyButtonProp) => {

    const [isCopy, setIsCopy] = useState(false)

    const onCopy = () => {
        if(!value) return;

        setIsCopy(true);
        navigator.clipboard.writeText(value);
        setTimeout(() => {
            setIsCopy(false)
        }, 1000)
    }

    const Icon = isCopy ? CheckCheck : Copy
    return (
        <Button onClick={onCopy} disabled={!value} variant="ghost" size="sm">
            <Icon className="h-4 w-4"/>
        </Button>
    )
}