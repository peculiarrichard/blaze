import { TextAreaInput } from "../form-elements/TextAreaInput";
import { PrimaryButton } from "@/utils/Buttons";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { generateNewTextService } from "@/api-service/aigenerate/generateNewTextService";
import { AllTextsDialog } from "./AllTextsDialog";

export const Prompt = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [text, setText] = useState<string>("");
  const [errMsg, setErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("");

  const handleGenerateText = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await generateNewTextService(
      prompt,
      setLoading,
      setErrMsg,
      onOpen,
      setText
    );
  };

  const copytoClipboard = () => {
    navigator.clipboard.writeText(text);
    alert("Text copied to clipboard");
    onClose();
  };

  return (
    <>
      <div className="mt-6 w-full lg:w-[70%]">
        <div className="flex justify-between items-start gap-x-4">
          <p className="">Hola👋, type in a prompt to generate text</p>
          <AllTextsDialog></AllTextsDialog>
        </div>
        
        <form className="mt-6" onSubmit={handleGenerateText}>
          <TextAreaInput
            label="Prompt"
            name="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Eg., generate a message for my wife"></TextAreaInput>
          <PrimaryButton
            buttonText="Generate"
            type="submit"
            isLoading={loading}></PrimaryButton>
        </form>
        {errMsg && <p className="text-red-500">{errMsg}</p>}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Your generated text message</ModalHeader>
          <ModalCloseButton />
          <ModalBody className="flex flex-col p-4 gap-y-8">
            <p>{text}</p>
            <button
              className="border-green-300 rounded-lg p-4 border"
              onClick={copytoClipboard}>
              Copy
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
