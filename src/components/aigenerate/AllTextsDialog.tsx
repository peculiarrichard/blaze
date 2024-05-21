import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { useRef } from "react";
import useSWR from "swr";
import { getAllGeneratedTexts } from "@/api-service/aigenerate/getAllGeneratedTexts";
import { AllGeneratedText } from "@/models/api/aigenerate/aigeneratedtextmodel";
export const AllTextsDialog = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef: any = useRef();
  const { data, isLoading, error } = useSWR(
    "getAllGeneratedTexts",
    getAllGeneratedTexts
  );
  return (
    <>
      <Button ref={btnRef} colorScheme="green" onClick={onOpen}>
        See all
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Texts</DrawerHeader>
          <DrawerBody className="overflow-y-auto">
            {isLoading ? (
              <Spinner />
            ) : error ? (
              <p>{error.message}</p>
            ) : data && data.length > 0 ? (
              data.map((text: AllGeneratedText) => (
                <div key={text._id} className="flex flex-col">
                  <p className="text-paragraph-400 text-[1.2rem] font-[600]">
                    Your prompt: {text.prompt}
                  </p>
                  <p className="text-[0.75rem]">{text.generatedText}</p>
                </div>
              ))
            ) : (
              <p>You have not generated any texts yet!</p>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
