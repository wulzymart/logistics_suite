import TrackingInput from "./tracking-input";
const Hero = () => {
  return (
    <div>
      <div className="w-full bg-[url('/fll1.jpg')] bg-cover bg-center h-screen relative font-body">
        <div className=" absolute w-full h-full bg-black opacity-50 z-10"></div>
        <div className="absolute w-full h-full bg-transparent z-20 flex justify-center items-center p-10">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black  text-white  my-5">
              YOU MOVE WITHOUT LIMITS.
            </h1>
            <div className="text-white mb-20">
              <p className="text-xl md:text-3xl">
                When you let us do the moving
              </p>
            </div>
            <div>
              <TrackingInput />
              <p className="text-gray-200 mt-2">
                Track your Items using your tracking number
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
