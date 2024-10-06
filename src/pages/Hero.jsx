import AuthBg from "@/components/Landing/AuthBg";

const Hero = () => {
  return (
    <AuthBg id="Home" className="w-screen h-screen">
      <section className="  w-screen h-screen flex flex-col items-center justify-center  relative z-[1]">
        <div className="max-w-[70%] lg:mb-[76px] md:mb-12 mb-8">
          <h1 className="[text-shadow:_0px_2px_5.1px_rgba(0,0,0,0.2)] text-[36px] md:text-[64px] font-urbanist text-center font-[900]">
            Trade Finance <br className="md:hidden" />
            <span className="bg-gradient-to-r from-[rgba(124,58,237,1)] to-[rgba(0,249,255,1)] bg-clip-text text-transparent">
              Faster
            </span>
          </h1>
          <p className="text-center font-sf-pro text-xl md:text-[24px] mt-4 md:mt-0">
            World's first AI platform for complete trade products
          </p>
        </div>
        <div className="md:px-0 px-6 w-full">
          <div className="p-[2.5px] rounded-[74px] card-border-container mb-6 lg:mb-[80px] max-w-md mx-auto">
            hi
          </div>
        </div>
        <div className="hero-image-container max-w-[750px] mx-[27px] md:mx-0 mb-[20px] md:mb-0 mt-3">
          <img
            src="/Images/landing_1.jpeg"
            alt="Hero Image"
            className="rounded-[24px] shadow-[0px_0px_45px_9px_rgba(129,45,226,0.55)]"
          />
        </div>
      </section>
    </AuthBg>
  );
};

export default Hero;
