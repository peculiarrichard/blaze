import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { MdCancel, MdOutlineSchedule } from "react-icons/md";
import { SlOptions } from "react-icons/sl";
import {
  useToast,
  AlertDialog,
  useDisclosure,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { PrimaryButton } from "@/utils/Buttons";
import { useRef, useState } from "react";
import { AllMessages } from "@/models/api/schedule/allMessages";
import { cancelScheduledMessages } from "@/api-service/schedule-messages/cancelScheduledMessages";

export const ActionsMenu = ({ message }: { message: AllMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelButton: any = useRef();
  const [messageId, setMessageId] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const toast = useToast();

  const handleCancelJob = async () => {
    await cancelScheduledMessages(
      messageId,
      toast,
      setLoading,
      setErrMsg,
      onClose
    );
  };

  return (
    <>
      <Menu>
        <MenuButton as={Button} variant="outline" colorScheme="teal" size="sm">
          <SlOptions />
        </MenuButton>
        <MenuList>
          <MenuItem
            icon={<MdCancel />}
            onClick={() => {
              onOpen();
              setMessageId(message._id);
            }}>
            Cancel
          </MenuItem>
          <MenuItem
            icon={<MdOutlineSchedule />}
            onClick={() => alert("not functional yet")}>
            Reschedule
          </MenuItem>
        </MenuList>
      </Menu>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelButton}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogBody className="m-4 flex flex-col gap-y-6 ">
            <p className="font-bold">
              Are you sure you want to cancel this scheduled message? It will no
              longer be delivered
            </p>
            <div className="flex justify-between gap-x-5">
              <PrimaryButton
                onClick={handleCancelJob}
                isLoading={loading}
                buttonText="Yes, Cancel"
                type="submit"
              />
              <button
                className="border-red-500 border text-black px-4 py-2 rounded-xl w-full"
                onClick={onClose}
                type="button"
                ref={cancelButton}>
                Close
              </button>
            </div>
            {errMsg && <p className="text-red-500">{errMsg}</p>}
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
