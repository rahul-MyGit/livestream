import { getSelfByUsername } from "@/app/actions/userActions";
import { auth } from "@/lib/auth"
import StreamPlayer from "../_component/StreamPlayer";

interface CreatorPagePro{
  params: Promise<{name: string}>
}

const CreaterPage = async ({params} : CreatorPagePro) => {

  const session = await auth();
  const externalUser  = session?.user
  const user = await getSelfByUsername((await params).name);

  if(!user || user.id !== externalUser?.id || !user.stream){
    throw new Error('unauthorized use')
  }


  return (
    <div className='h-full'>
      <div className='mb-4'>
        <h1 className='text-2xl font-bold'>
          <StreamPlayer user = {user} stream={user.stream}/>
        </h1>
      </div>
    </div>
  )
}

export default CreaterPage