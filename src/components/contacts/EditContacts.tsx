import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useToast,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect } from "react";
import { TextInput } from "../form-elements/TextInput";
import { AllContactsInterface } from "@/models/api/contacts/allContacts";
import { PrimaryButton } from "@/utils/Buttons";
import { editContactService } from "@/api-service/contacts/editContactService";

export const EditContact = ({
  selectedContact,
  onOpen,
  onClose,
  isOpen,
  contacts,
  setContacts,
}: {
  selectedContact: AllContactsInterface | null;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  contacts: AllContactsInterface[];
  setContacts: (value: React.SetStateAction<AllContactsInterface[]>) => void;
}) => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const [errMsg, setErrMsg] = useState<string>("");
  const [values, setValues] = useState({
    _id: "",
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (selectedContact) {
      setValues({
        _id: selectedContact._id,
        name: selectedContact.name,
        phone: selectedContact.phone,
        email: selectedContact.email,
      });
    }
  }, [selectedContact]);

  const hadleEditContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await editContactService(
      values,
      toast,
      setLoading,
      setErrMsg,
      onClose,
      contacts,
      setContacts
    );
  };

  return (
    <>
      <button onClick={onOpen}>
        {" "}
        <CiEdit color="green" size="30" />
      </button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent className="py-6">
          <ModalHeader>Edit Contact</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="mb-8" onSubmit={hadleEditContact}>
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
              <PrimaryButton
                buttonText="Update"
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
