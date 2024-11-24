import { getStreamByUserId } from '@/app/actions/streamAction'
import ConnectModal from '@/components/keys/ConnectModal'
import KeyCard from '@/components/keys/KeyCard'
import UrlCard from '@/components/keys/UrlCard'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const page = async () => {

  const session = await auth()
  if(!session || !session?.user){
    redirect('/');
  }
  const userId = session?.user.id;
  const stream = await getStreamByUserId(userId)

  if(!stream.data) {
    throw new Error("Stream not found")
  }
  return (
    <div className='p-6'>
      <div className='flex items-center justify-between mb-4'>
        <h1 className='text-2xl font-bold'>Keys</h1>
        <ConnectModal />
      </div>
      <div className='space-y-4'>
        <UrlCard value={stream.data?.serverUrl}/>
        <KeyCard  value={stream.data?.streamKey}/>
      </div>
    </div>
  )
}

export default page