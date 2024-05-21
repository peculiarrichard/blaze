import Link from "next/link";

export const GetStarted = () => {
  return (
    <>
      <section className="mx-auto w-[90%] bg-[#2c9e41] rounded-3xl">
        <div className="flex flex-col items-center justify-center text-center xl:w-3/5 mx-auto py-16 md:py-20 my-16 px-8 sm:px-0">
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get started?
          </h2>
          <h2 className="text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Create an account
          </h2>
          <p className="mt-4 text-base leading-6 text-white">
            Create an account and start scheduling messages
          </p>
          <Link
            href="/register"
            className="mt-6 px-5 py-3 border text-base font-medium rounded-full text-green-300 bg-[white] border-green-300">
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
};
