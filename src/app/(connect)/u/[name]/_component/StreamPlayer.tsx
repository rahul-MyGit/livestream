'use client'
import { userViewerToken } from "@/hooks/useViewerToken"
import { Stream, User } from "@prisma/client"

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
    <div>Allowed to watch stream</div>
  )
}

export default StreamPlayer