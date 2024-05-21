import { PrimaryButton } from "@/utils/Buttons";
import useSWR from "swr";
import { getAllContactsService } from "@/api-service/contacts/getAllContactsService";
import { TiUser } from "react-icons/ti";
import { MdOutlineAttachEmail } from "react-icons/md";
import { CiPhone } from "react-icons/ci";
import { AllContactsInterface } from "@/models/api/contacts/allContacts";
import { PageTitle } from "../commons/PageTitle";
import { Spinner } from "@chakra-ui/react";
import { useState } from "react";
import { EditContact } from "./EditContacts";
import { useDisclosure } from "@chakra-ui/react";
import { DeleteContact } from "./DeleteContact";

export const AllContacts = ({
  setContacts,
  contacts,
  onOpen,
}: {
  setContacts: React.Dispatch<React.SetStateAction<AllContactsInterface[]>>;
  contacts: AllContactsInterface[];
  onOpen: () => void;
}) => {
  const [selectedContact, setSelectedContact] =
    useState<AllContactsInterface | null>(null);
  const {
    isOpen: isEditOpen,
    onOpen: editOpen,
    onClose: editOnclose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: deleteOpen,
    onClose: deleteOnclose,
  } = useDisclosure();
  const { data, isLoading, error } = useSWR(
    "/contacts/getAll",
    getAllContactsService,
    {
      onSuccess: (data) => {
        setContacts(data);
      },
    }
  );

  return (
    <div className="w-full lg:w-[70%]">
      <PageTitle text="Add the contacts of your better half." />
      <div className="my-6 ">
        <p className="text-paragraph-400 mb-4">Existing contacts:</p>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-red-500">{error.message}</p>
        ) : contacts && contacts.length > 0 ? (
          contacts.map((contact) => (
            <div
              key={contact._id}
              className="bg-[#F9FFFA] border-2 border-[#E5E5E5] p-4 flex justify-between items-start rounded-2xl my-6">
              <div className="flex flex-col gap-4">
                <p className="text-paragraph-100 flex gap-2 items-center">
                  {" "}
                  <TiUser /> <span className="font-bold">
                    {contact.name}
                  </span>{" "}
                </p>
                <p className="text-paragraph-100 flex gap-2 items-center">
                  {" "}
                  <CiPhone /> <span className="font-bold">
                    {contact.phone}
                  </span>{" "}
                </p>
                <p className="text-paragraph-100 flex gap-2 items-center">
                  {" "}
                  <MdOutlineAttachEmail />{" "}
                  <span className="font-bold">{contact.email}</span>{" "}
                </p>
              </div>
              <div className="flex items-start justify-center gap-x-3">
                <EditContact
                  selectedContact={selectedContact}
                  isOpen={isEditOpen}
                  onClose={editOnclose}
                  onOpen={() => {
                    setSelectedContact(contact);
                    editOpen();
                  }}
                  contacts={contacts}
                  setContacts={setContacts}
                />
                <DeleteContact
                  selectedContact={selectedContact}
                  contacts={contacts}
                  setContacts={setContacts}
                  onOpen={() => {
                    setSelectedContact(contact);
                    deleteOpen();
                  }}
                  onClose={deleteOnclose}
                  isOpen={isDeleteOpen}
                />
              </div>
            </div>
          ))
        ) : (
          <p>You are yet to add any contacts</p>
        )}
      </div>
      <div className="w-full lg:w-1/2 mt-20">
        <PrimaryButton
          buttonText="Add New Contact"
          onClick={onOpen}
          type="button"
        />
      </div>
    </div>
  );
};
