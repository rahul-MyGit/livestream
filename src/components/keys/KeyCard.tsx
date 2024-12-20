'use client'

import { useState } from "react";
import { Input } from "../ui/input";
import { CopyButton } from "./CopyButton";
import { Button } from "../ui/button";

interface KeyCardProp {
    value: string | null;
}

const KeyCard = ({value} : KeyCardProp) => {
    const [show, setShow] = useState(false);

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-start gap-x-10">
                <p className="font-semibold shrink-0">
                    Stream Key
                </p>

                <div className="space-y-2 w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input value={value || ""} type={show ? "text" : "password"} disabled placeholder="Stream Key"/>
                        <CopyButton value={value || ""}/>
                    </div>
                    <Button onClick={() => setShow(!show)} size="sm" variant="link">
                        {show ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default KeyCard;