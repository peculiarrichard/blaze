import { Spinner } from "@chakra-ui/react";
export const PrimaryButton = ({
  onClick,
  buttonText,
  isLoading,
  type,
  ref,
  ...rest
}: {
  onClick?: () => void;
  buttonText?: string;
  isLoading?: boolean;
  type?: "submit" | "reset" | "button";
  ref?: any;
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      ref={ref}
      {...rest}
      className={`w-full p-4 rounded-lg border leading-normal text-white font-semibold bg-green-200 border-green-300 text-sm`}>
      {isLoading ? <Spinner color="white" /> : buttonText}
    </button>
  );
};
