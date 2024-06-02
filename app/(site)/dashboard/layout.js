import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import Image from "next/image";
import PageLoader from "@/components/PageLoader/PageLoader";

export const metadata = {
  title: "Dashboard",
  description: "Dashboard App For Creating Offers",
};

const DashboardLayout = async ({ children }) => {
  /*  
  if (!currentUser) {
    return <PageLoader />;
  }
  if (currentUser?.activated === 0 && currentUser?.role === 0) {
    return (
      <>
        <section className="container-max">
          <Nav currentUser={currentUser} />
          <div className="inner card py-[20px] px-[35px] w-[100%] md:w-[50%] mx-auto text-center">
            <Image
              src="/assets/icons/ico_error.svg"
              alt="error"
              width={70}
              height={70}
              className="inline-block"
            />
            <h1 className="text-2xl font-bold mb-5">Access denied!</h1>
            <p className="mb-3">
              You don't have acces to app, please contact your administrator to
              grant you access to the application.
            </p>
            <a href="mailto:admin@gmail.com" className="text-primary-red">
              admin@gmail.com
            </a>
          </div>
        </section>
      </>
    );
  } else { */
  const currentUser = {
    id: 1,
    name: "patrik stojsavljevic",
    email: "patrik.stojsavljevic@gmail.com",
    phone: "095555555",
    description: "patrik description",
    achievements: "achievements",
    skill: 1,
    salary: 2000,
    rating: 4.5,
    experience: 2,
    company: 1,
  };
  return (
    <>
      <Sidebar currentUser={currentUser} />
      <section className="container-fluid">
        <Nav currentUser={currentUser} />
        {children}
      </section>
    </>
  );
  //}
};

export default DashboardLayout;
