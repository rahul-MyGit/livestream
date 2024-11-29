'use client'

import React from 'react'

import { Maximize, Minimize } from 'lucide-react'
import {Hint} from '@/components/hint'

interface FullScreenProp {
    isFullScreen: boolean;
    onToggle: ()=> void;
};


const FullScreenController = ({isFullScreen, onToggle} : FullScreenProp) => {
    const Icon = isFullScreen ? Minimize: Maximize

    const lavel = isFullScreen ? 'Exit Screen' : 'Enter fullscreen'

  return (
    <div className='flex items-center justify-center gap-4'>
        <Hint label={lavel} asChild>
            <button onClick={onToggle} className='text-white p-1.5 hover:bg-white/10 rounded-lg'>
                <Icon  className='h-5 w-5'/>
            </button>
        </Hint>
    </div>
  )
}

export default FullScreenController