import { TextInput } from "../form-elements/TextInput";
import TopBar from "../navigation/Topbar";
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { ContactInterface } from "@/models/api/contacts/contactModel";
import { AllContactsInterface } from "@/models/api/contacts/allContacts";
import { PrimaryButton } from "@/utils/Buttons";
import { SelectInput } from "../form-elements/SelectInput";
import { IoMdArrowDropdown } from "react-icons/io";
import { AllContacts } from "./AllContacts";
import { createContactService } from "@/api-service/contacts/createService";

export const AddContacts = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [contacts, setContacts] = useState<AllContactsInterface[]>([]);
  const [values, setValues] = useState<ContactInterface>({
    name: "",
    email: "",
    phone: "",
    isOnWhatsapp: false,
  });
  const [errMsg, setErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const toast = useToast();

  const handleCreateContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createContactService(
      values,
      setLoading,
      onClose,
      toast,
      setErrMsg,
      setFormErrors,
      setContacts
    );
  };

  return (
    <>
      <TopBar title="Add Contacts" />
      <AllContacts
        setContacts={setContacts}
        contacts={contacts}
        onOpen={onOpen}></AllContacts>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="py-6">
          <ModalHeader>Add Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="mb-8" onSubmit={handleCreateContact}>
              <TextInput
                label="Name"
                name="name"
                type="text"
                placeholder="Enter name"
                onChange={(e) => setValues({ ...values, name: e.target.value })}
                value={values.name}
              />
              {formErrors.name && (
                <p className="text-red-500">{formErrors.name}</p>
              )}
              <TextInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                value={values.email}
              />
              {formErrors.email && (
                <p className="text-red-500">{formErrors.email}</p>
              )}
              <TextInput
                label="Phone"
                name="phone"
                type="tel"
                placeholder="Enter phone number with country code"
                onChange={(e) =>
                  setValues({ ...values, phone: e.target.value })
                }
                value={values.phone}
              />
              {formErrors.phone && (
                <p className="text-red-500">{formErrors.phone}</p>
              )}
              <SelectInput
                label="Is the number on WhatsApp?"
                name="isWhatsapp"
                options={["Yes", "No"]}
                onChange={(e) =>
                  setValues({
                    ...values,
                    isOnWhatsapp: e.target.value === "Yes" ? true : false,
                  })
                }
                value={values.isOnWhatsapp ? "Yes" : "No"}
                iconAsButton={IoMdArrowDropdown}></SelectInput>
              {formErrors.isOnWhatsapp && (
                <p className="text-red-500">{formErrors.isOnWhatsapp}</p>
              )}
              <PrimaryButton
                buttonText="Add"
                type="submit"
                isLoading={loading}
              />
            </form>
            {errMsg && <p className="text-red-500">{errMsg}</p>}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
