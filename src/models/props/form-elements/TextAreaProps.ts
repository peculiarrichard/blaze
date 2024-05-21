export interface TextAreaProps {
  label: string;
  name: string;
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}