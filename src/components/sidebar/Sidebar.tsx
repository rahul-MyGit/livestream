import { auth } from "@/lib/auth"
import Something from "./Something"
import Toggle from "./Toggle"
import { Wrapper } from "./wrapper"


const Sidebar = async () => {

  const session = await auth()
  console.log(session?.user);
  

  return (
    <Wrapper>
      <Toggle />
      <div className="space-y-4 pt-4 lg:pt-0">
        < Something data={session?.user?.name || null}/>
      </div>
    </Wrapper>
  )
}

export default Sidebar