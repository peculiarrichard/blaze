export default function NotFound() {
  return (
    <section className="mt-20 mx-auto w-[90%] h-max flex flex-col items-center justify-center gap-y-4">
      <h1 className="text-5xl text-primary-400 font-bold">404</h1>
      <p className="text-center font-semibold">
        Ooops! Page Not Found. This page may have been moved or deleted.
      </p>
      <a
        href="/"
        className="text-center py-4 px-12 md:px-24 my-4 lg:my-12 rounded-xl bg-green-300 text-white text-[1.25rem] font-[700] leading-5">
        Back to Home
      </a>
    </section>
  );
}
