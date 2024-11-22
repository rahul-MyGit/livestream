import {create} from 'zustand'

interface CreaterSideBarProps {
    collapsed: boolean;
    onExpand: () => void;
    onCollapse: () => void;
}

export const useCreaterSidebar = create<CreaterSideBarProps>((set) => ({
    collapsed: false,
    onExpand: () => set(() => ({ collapsed: false})),
    onCollapse: () => set(() => ({ collapsed: true}))
}))