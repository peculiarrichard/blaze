export interface ToastOption {
  title: string;
  description: string;
  status: "success" | "error";
  duration: number;
  isClosable: boolean;
}