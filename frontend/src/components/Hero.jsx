const Hero = () => {
  return (
    <>
      <div className="hero w-full h-screen rounded-b-2xl bg-[linear-gradient(to_right,rgba(2,6,23,0.9),rgba(51,65,85,0.5)),url('/hero.jpg')] bg-no-repeat bg-cover bg-center flex justify-center">
        <div className="hero-content flex flex-col justify-center items-center gap-10">
          <div className="flex justify-center items-center">
            <h1 className="text-3xl">Welcome to pickUP</h1>
          </div>
          <div>
            <h3>Shop from the comfort of your home</h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
