import { WifiOff } from "lucide-react";

interface OfflinevideoProp {
    name: string
}

export const OfflineVideo = ({name} : OfflinevideoProp) => {
    return (
        <div className="-full flex flex-col space-y-4 justify-center items-center">
            <WifiOff className="h-10 w-10 text-muted-foreground"/>
            <p className="text-muted-foreground">
                {name} is Offline
            </p>
        </div>
    )
}