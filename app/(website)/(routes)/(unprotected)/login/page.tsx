import LoginForm from "../../../../../components/login-form";

const page = () => {
  return (
    <div className="w-full h-[600px] flex items-center justify-center ">
      <div className="w-[80%] md:w-1/4">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
