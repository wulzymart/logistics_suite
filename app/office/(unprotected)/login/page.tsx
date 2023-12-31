import LoginForm from "../../../../components/login-form";
import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-col items-center md:flex-row md:h-screen">
      <div className="flex items-center justify-center w-full md:w-2/3 h-[100vh]">
        <Image
          src="/truck_driver.jpg"
          alt="Login Image"
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col bg-white/10 p-10 items-center justify-center w-full md:w-[400px] absolute z-10 right-0">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Welcome back!</h1>
            <p className="mt-2 text-gray-300">
              Please sign in to your account.
            </p>
          </div>
          <LoginForm darkBg={true} />
        </div>
      </div>
    </div>
  );
}
