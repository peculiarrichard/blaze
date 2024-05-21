import { IconType } from "react-icons/lib";

export interface SelectInputProps {
  label: string;
  name: string;
  options: string[];
  placeholder?: string;
  iconAsButton?: IconType | any;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: any
}
