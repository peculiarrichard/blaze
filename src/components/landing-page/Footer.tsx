export const Footer = () => {
  return (
    <>
      <div className="bottom-0 mt-32 w-full border-t border-t-green-200 rounded-t-2xl h-40 flex flex-col text-center justify-center">
        <p className="text-paragraph-400">
          © {new Date().getFullYear()} Blaze. All rights reserved.
        </p>
        <p>Developed by pecullozie@gmail.com</p>
      </div>
    </>
  );
};
