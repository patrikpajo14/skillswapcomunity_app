import AuthForm from "@/components/AuthForm";
import "@/styles/globals.css";

export default async function Home() {
  return (
    <section className="auth-page">
      <div className="flex-1 h-full relative">
        <img
          src="/assets/images/background.jpg"
          alt="background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="inner card py-[20px] px-[35px] w-[360px] flex flex-col justify-center">
        <AuthForm />
      </div>
    </section>
  );
}
