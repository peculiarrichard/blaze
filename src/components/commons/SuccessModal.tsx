import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { GrStatusGood } from "react-icons/gr";
import Link from "next/link";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  text: string;
  buttonText: string;
  href: string;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  text,
  buttonText,
  href,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody className="flex flex-col items-center gap-y-6 p-4">
            <GrStatusGood size={100} />
            <p className="text-paragraph-400 text-center">{text}</p>
            <Link href={href} onClick={onClose} className="border-green-300 rounded-lg p-4 border">{buttonText}</Link>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
