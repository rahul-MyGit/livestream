import { getStreamByUserId } from '@/app/actions/streamAction'
import { auth } from '@/lib/auth'
import React from 'react'
import ToggleCard from '../../_component/ToggleCard'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await auth()

  if(!session?.user){
    redirect('/')
  }

  const userId = session?.user?.id;
  if(!userId){
    redirect('/')
  }
  
  const stream = await getStreamByUserId(userId);

  if(!stream) {
    throw new Error("Stream is absent");
  }

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>CHAT Page</h1>
      </div>

      <div className='space-y-4'>
        <ToggleCard 
          field="isChatEnabled"
          label="Chat Enabled"
          value={stream?.data?.isChatEnabled ?? true} 
        />
      </div>
    </div>
  )
}

export default page