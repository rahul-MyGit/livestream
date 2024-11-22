'use client'

import { Hint } from '@/components/hint';
import { Button } from '@/components/ui/button';
import { useCreaterSidebar } from '@/store/use-creater-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react';


const Toogle = () => {
    const { collapsed, onCollapse, onExpand } = useCreaterSidebar((state) => state);

    const label = collapsed ? "Expand" : "Collapse"

    return (
        <div>
            {collapsed && (
                <div className='hidden w-full lg:flex item-center justify-center pt-4 mb-4'>
                    <Hint label={label} side='left' asChild>
                        <Button onClick={onExpand} className='h-auto p-2' variant={"ghost"}>
                            <ArrowRightFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
            {!collapsed && (
                <div className="p-3 pl-6 mb-2 flex items-center w-full">
                    <p className="font-semibold text-primary">
                        Admin Dashboard
                    </p>
                    <Hint label={label} side="right" asChild>
                        <Button onClick={onCollapse} className="h-auto p-2 ml-auto" variant={"ghost"}>
                            <ArrowLeftFromLine className="h-4 w-4" />
                        </Button>
                    </Hint>
                </div>
            )}
        </div>
    )
}

export default Toogle