import Sidebar from "@/components/sidebar/Sidebar";
import Container from "@/components/Container"
const DashboardLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <>
            <div className="flex h-full">
                <Sidebar />
                <Container>
                {children}
                </Container>
            </div>
        </>
    )
}

export default DashboardLayout;