import AuthBg from "@/components/Landing/AuthBg";
import AuthPageUI from "./Auth";
const Hero = () => {
  return (
    <AuthBg id="Home" className="w-screen h-screen">
      <section className="  w-screen h-screen flex flex-col items-center justify-center  relative z-[1]">
        <AuthPageUI />
      </section>
    </AuthBg>
  );
};

export default Hero;
