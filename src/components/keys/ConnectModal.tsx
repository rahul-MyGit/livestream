'use client'
import React, { ElementRef, useRef, useState, useTransition } from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '../ui/button';
import { AlertTriangle} from 'lucide-react';
import {Select, SelectContent,SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'
import { IngressInput } from 'livekit-server-sdk';
import { createIngress } from '@/app/actions/IngressAction';
import { toast } from 'sonner';

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP

const ConnectModal = () => { 

    const [IngressType, setIngressType] = useState<IngressType>(RTMP)
    const [isPending, startTransition] = useTransition()
    const closeRef = useRef<ElementRef<"button">>(null);

    const onSubmitHandler = () => {
        startTransition(() => {
            createIngress(parseInt(IngressType))
            .then(() => {
                toast.success("Ingress created")
                closeRef?.current?.click();
            })
            .catch(() => toast.error("Error while creating ingress"))
        })
    }
  return (
    <Dialog>
        <DialogTrigger asChild>
            <Button variant="secondary">
                Generate connection
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle> Generate connection</DialogTitle>
            </DialogHeader>
            <Select disabled={isPending} value={IngressType} onValueChange={(value) => setIngressType(value)}>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Ingress Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={RTMP}> RTMP </SelectItem>
                    <SelectItem value={WHIP}> WHIP </SelectItem>

                </SelectContent>
            </Select>
            <Alert>
                <AlertTriangle className='h-4 w-4'/>
                <AlertTitle>Warning!</AlertTitle>
                <AlertDescription>
                    This action will reset all active stream as key's getting revalidate
                </AlertDescription>
            </Alert>
            <div className='flex justify-between'>
                <DialogClose ref={closeRef} asChild>
                    <div className='rounded-xl p-2 bg-white/10'>
                        Cancel
                    </div>
                </DialogClose>
                <Button disabled={isPending} onClick={onSubmitHandler} variant="secondary">
                    Generate
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ConnectModal