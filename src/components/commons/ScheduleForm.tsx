"use client";

import { TextInput } from "../form-elements/TextInput";
import { SelectInput } from "../form-elements/SelectInput";
import { TextAreaInput } from "../form-elements/TextAreaInput";
import { PrimaryButton } from "@/utils/Buttons";
import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { getAllContactsService } from "@/api-service/contacts/getAllContactsService";
import useSWR from "swr";
import { scheduleNewMessageService } from "@/api-service/schedule-messages/scheduleNewMessage";
import { useToast, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { ScheduleFormProps } from "@/models/api/schedule/scheduleModel";
import schedule from "node-schedule";



export const ScheduleForm = () => {
  const [values, setValues] = useState<ScheduleFormProps>({
    platform: "",
    contact: "",
    text: "",
    date: "",
    time: "",
    subject: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState<string>("");
  const router = useRouter();
  const toast = useToast();

  const {
    data: contacts,
    isLoading,
    error,
  } = useSWR("contacts", getAllContactsService);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await scheduleNewMessageService(
      values,
      setLoading,
      setErrMsg,
      router,
      toast
    );
  };

  // const date = new Date();
  // const schedulepost = () => {
  //   const job = schedule.scheduleJob(date, () => {
  //     console.log("yayyy")
  //   }) 
  //   console.log(job)
  // }

  // schedulepost()

  return (
    <>
      <form className="mt-6 w-full lg:w-[70%]" onSubmit={handleFormSubmit}>
        <SelectInput
          label="Select Delivery Platform"
          name="delively-platform"
          options={["", "Email"]}
          iconAsButton={IoMdArrowDropdown}
          onChange={(e: any) => {
            setValues({ ...values, platform: e.target.value });
          }}
          value={values.platform}></SelectInput>
        <div className="mb-4 w-full">
          <label
            className="block text-paragraph-200 text-sm font-[500] mb-2 leading-normal"
            htmlFor={"contact"}>
            Select Contact
          </label>
          <div className="bg-white border-gray-200 flex items-center justify-between border rounded-[0.5rem] w-full py-[0.875rem] px-[0.75rem] text-gray-700">
            <select
              className="bg-transparent focus:outline-none focus:shadow-outline appearance-none text-paragraph-300 w-full"
              name="contact"
              onChange={(e: any) => {
                setValues({ ...values, contact: e.target.value });
              }}
              value={values.contact}>
              <option value="">Select Contact</option>
              {isLoading ? (
                <option>Loading contacts ...</option>
              ) : error ? (
                <option>{error.message}</option>
              ) : (
                contacts?.map((contact: any) => (
                  <option key={contact._id} value={contact.email}>
                    {contact.name} - {contact.email}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <TextInput
          label="Type in subject"
          type="text"
          name="subject"
          placeholder="Email Subject"
          onChange={(e: any) => {
            setValues({ ...values, subject: e.target.value });
          }}
          value={values.subject}></TextInput>
        <TextAreaInput
          label="What do you want to say to you lover?"
          name="message"
          placeholder="Enter your message"
          value={values.text}
          onChange={(e: any) => {
            setValues({ ...values, text: e.target.value });
          }}></TextAreaInput>
        <TextInput
          label="Choose a future date"
          type="date"
          name="date"
          placeholder="Enter date"
          min={new Date().toISOString().split("T")[0]}
          onChange={(e: any) => {
            setValues({ ...values, date: e.target.value });
          }}
          value={values.date}></TextInput>
        <TextInput
          label="Choose a future time"
          type="time"
          name="time"
          placeholder="Enter time"
          min={new Date().getHours().toString().split("T")[0]}
          onChange={(e: any) => {
            setValues({ ...values, time: e.target.value });
          }}
          value={values.time}></TextInput>
        <PrimaryButton
          buttonText="Schedule"
          type="submit"
          isLoading={loading}></PrimaryButton>
        {errMsg && <p className="text-red-500">{errMsg}</p>}
      </form>
    </>
  );
};
