import Sidebar from "@/components/sidebar/Sidebar";

const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <div className="flex h-full">
                <Sidebar />
                {children}
            </div>
        </>
    )
}

export default DashboardLayout;