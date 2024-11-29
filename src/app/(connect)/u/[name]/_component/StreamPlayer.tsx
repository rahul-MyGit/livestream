'use client'
import { userViewerToken } from "@/hooks/useViewerToken"
import { Stream, User } from "@prisma/client"
import {LiveKitRoom} from '@livekit/components-react'
import VIdeo from './VIdeo'
interface StreamPlayerProp{
    user: User & { stream: Stream | null}
    stream: Stream
}

const StreamPlayer = ({user,stream} :StreamPlayerProp) => {
    const {token, name, identity} = userViewerToken(user.id)

    console.log(identity);
    
    if(!token || !name || !identity){
        return (
            <div>
                Cannot watch the Stream
            </div>
        )
    }
  return (
    <>
    <LiveKitRoom token={token} serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
    className="grid grid-cols-1 lg:gap-y-0 lg:gap-cols-3 xl: frid-cols-3 2xl:grid-cols-6 h-full"
    >
        <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
            <VIdeo hostName={user.name || ""} hostIdentity={user.id || ""}/>
        </div>
    </LiveKitRoom>
    </>
  )
}

export default StreamPlayer