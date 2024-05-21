import Link from "next/link";
import Image from "next/image";
export const Nav = () => {
  return (
    <>
      <div className="flex justify-between items-center h-28 w-[90%] m-auto sticky z-40 top-0 bg-white">
        <Link className="flex" href="/">
          <Image src="/assets/logo.png" width={50} height={50} alt="logo" />
          <p className="text-[1.40975rem] font-semibold tracking-[-0.0423125rem] text-green-900 hidden lg:block">
            Blaze
          </p>
        </Link>
        <div className="flex gap-4 font-[500] text-center">
          <Link
            href="/login"
            className="lg:w-32 border px-4 py-1 rounded-lg border-green-800 hover:bg-green-950 hover:text-white">
            Login
          </Link>
          <Link
            href="/register"
            className="lg:w-32 px-4 py-1 rounded-lg text-transparent bg-clip-text bg-green-200 border-green-300 border hover:text-lime-100">
            Register
          </Link>
        </div>
      </div>
    </>
  );
};
