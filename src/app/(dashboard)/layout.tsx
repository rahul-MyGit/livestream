import Sidebar from "@/components/sidebar/Sidebar";
import Container from "@/components/Container"
const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <div className="flex h-[calc(100vh-64px)]">
                <Sidebar />
                <Container>
                {children}
                </Container>
            </div>
        </>
    )
}

export default DashboardLayout;