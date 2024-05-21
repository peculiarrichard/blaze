import { deleteContactService } from "@/api-service/contacts/deleteContactService";
import { useState, useEffect, useRef } from "react";
import { AllContactsInterface } from "@/models/api/contacts/allContacts";
import {
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { MdDeleteForever } from "react-icons/md";
import { PrimaryButton } from "@/utils/Buttons";

export const DeleteContact = ({
  selectedContact,
  onOpen,
  onClose,
  contacts,
  setContacts,
  isOpen,
}: {
  selectedContact: AllContactsInterface | null;
  onOpen: () => void;
  onClose: () => void;
  contacts: AllContactsInterface[];
  setContacts: (value: React.SetStateAction<AllContactsInterface[]>) => void;
  isOpen: boolean;
}) => {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const toast = useToast();
  const cancelButton: any = useRef();

  useEffect(() => {
    if (selectedContact) {
      setId(selectedContact._id);
    }
  }, [selectedContact]);

  const hadleDeleteContact = async () => {
    await deleteContactService(
      id,
      toast,
      setLoading,
      setErrMsg,
      contacts,
      setContacts,
      onClose
    );
  };
  return (
    <>
      <button onClick={onOpen}>
        {" "}
        <MdDeleteForever color="red" size="30" />
      </button>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelButton}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogBody className="m-4 flex flex-col gap-y-6 ">
            <p className="font-bold">
              Are you sure you want to delete this contact?
            </p>
            <div className="flex justify-between gap-x-5">
              <PrimaryButton
                onClick={hadleDeleteContact}
                isLoading={loading}
                buttonText="Delete"
                type="submit"
              />
              <button
                className="border-red-500 border text-black px-4 py-2 rounded-xl w-full"
                onClick={onClose}
                type="button"
                ref={cancelButton}>
                Cancel
              </button>
            </div>
            {errMsg && <p className="text-red-500">{errMsg}</p>}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
