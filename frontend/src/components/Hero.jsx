const Hero = () => {
  return (
    <>
      <div className="hero w-full h-screen rounded-b-2xl bg-[linear-gradient(to_right,rgba(2,6,23,0.9),rgba(51,65,85,0.5))] flex justify-center">
        <div className="hero-content w-full h-full flex justify-center items-center">
          {/* Mobile */}
          <div className="block md:hidden w-full h-full">
            <img
              src="/HeroMobile.png"
              alt="Hero"
              className="w-full h-full object-cover
              absolute"
            />
            {/* <div className="relative mt-20 bg-amber-50 w-full h-40 "></div> */}
          </div>

          {/* Desktop */}
          <div className="hidden md:block w-full h-full">
            <img
              src="/HeorDesktop.png"
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
