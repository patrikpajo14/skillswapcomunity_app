import "@/styles/globals.css";
import { AuthGuard } from "@/src/auth/guard";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard App For Creating Offers",
};

const DashboardLayout = async ({ children }) => {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
};

export default DashboardLayout;
