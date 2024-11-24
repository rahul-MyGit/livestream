'use client'
import React from 'react'
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from '../ui/button';
import { AlertTriangle} from 'lucide-react';
import {Select, SelectContent,SelectItem, SelectTrigger, SelectValue} from '@/components/ui/select'

const ConnectModal = () => {
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
            <Select>
                <SelectTrigger className='w-full'>
                    <SelectValue placeholder="Ingress Type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='RTMP'> RTMP </SelectItem>
                    <SelectItem value='WHIP'> WHIP </SelectItem>

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
                <DialogClose>
                    <div className='rounded-xl p-2 bg-white/10'>
                        Cancel
                    </div>
                </DialogClose>
                <Button onClick={() => {}} variant="secondary">
                    Generate
                </Button>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ConnectModal