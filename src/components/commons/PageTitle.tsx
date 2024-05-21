
export const PageTitle = ({ text }: { text: string }) => {
  return (
    <div className="text-paragraph-100 mt-5 font-semibold py-3 border-b border-b-paragraph-400 lg:text-base xl:text-lg">
      <p>{text} </p>
    </div>
  );
};
