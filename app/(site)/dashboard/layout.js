import "@/styles/globals.css";
import { AuthGuard } from "@/src/auth/guard";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export const metadata = {
  title: "Dashboard",
  description: "Skill Swap Community dashboard",
};

const Layout = async ({ children }) => {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
};

export default Layout;
