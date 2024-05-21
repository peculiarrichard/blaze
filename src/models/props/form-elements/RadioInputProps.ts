import { IconType } from "react-icons/lib";

export interface RadioButtonProps {
  label: string;
  name: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
