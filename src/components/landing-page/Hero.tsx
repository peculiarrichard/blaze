import Link from "next/link";
import Image from "next/image";

export const Hero = () => {
  return (
    <>
      <div className="flex w-[90%] m-auto my-14 flex-col lg:flex-row items-start justify-between gap-y-10">
        <div className="w-full lg:w-1/2 flex flex-col gap-y-10">
          <div className="flex flex-col text-center lg:text-left">
            <p className="text-lg text-paragraph-400 ">Keep the fire blazing</p>
            <p className="text-green-950 text-3xl xl:text-4xl font-bold">
              with scheduled
            </p>
            <p className="text-transparent bg-gradient-to-r from-lime-100 bg-green-200 bg-clip-text text-4xl lg:text-6xl font-semibold">
              love messages
            </p>
          </div>
          <p className="text-paragraph-400 text-center lg:text-left lg:w-[70%]">
            With Blaze, you can schedule love texts and we will deliver them to
            your lover at your chosen time, helping you keep the romance alive.
          </p>
          <Link
            href="/register"
            className="lg:w-3/5 shadow-lg bg-green-200 border-green-300 px-8 py-4 text-center rounded-xl text-white font-bold">
            {" "}
            Sign me up!
          </Link>
        </div>
        <div className="lg:w-1/2 ">
          <Image
            src="/assets/hero-bg.png"
            alt="hero"
            width={600}
            height={500}
          />
        </div>
      </div>
    </>
  );
};
