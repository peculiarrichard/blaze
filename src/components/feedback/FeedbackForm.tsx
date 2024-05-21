import { RadioButton } from "../form-elements/RadioButton";
import { TextAreaInput } from "../form-elements/TextAreaInput";
import { PrimaryButton } from "@/utils/Buttons";
import { SuccessModal } from "../commons/SuccessModal";
import { useDisclosure } from "@chakra-ui/react";
import { FeedbackFormProps } from "@/models/api/feedback/Feedback";
import { useState } from "react";
import { sendFeedback } from "@/api-service/feedback/sendFeedback";

export const FeedbackForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [values, setValues] = useState<FeedbackFormProps>({
    rating: "",
    comment: "",
  });
  const [errMsg, setErrMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await sendFeedback(values, setLoading, setErrMsg, onOpen);
  };

  return (
    <>
      <div className="my-6 w-full lg:w-[70%]">
        <p className="text-paragraph-400 mb-4">
          How has your experience with this app been so far? *
        </p>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 md:flex gap-x-6 gap-y-4 mb-6">
            <RadioButton
              label="Poor"
              name="poor"
              value="poor"
              checked={values.rating === "poor"}
              onChange={(e) => {
                setValues({ ...values, rating: e.target.value });
              }}></RadioButton>
            <RadioButton
              label="Not bad"
              name="notbad"
              value="notbad"
              checked={values.rating === "notbad"}
              onChange={(e) => {
                setValues({ ...values, rating: e.target.value });
              }}></RadioButton>
            <RadioButton
              label="Average"
              name="average"
              value="average"
              checked={values.rating === "average"}
              onChange={(e) => {
                setValues({ ...values, rating: e.target.value });
              }}></RadioButton>
            <RadioButton
              label="Good"
              name="good"
              value="good"
              checked={values.rating === "good"}
              onChange={(e) => {
                setValues({ ...values, rating: e.target.value });
              }}></RadioButton>
            <RadioButton
              label="Superb"
              name="superb"
              value="superb"
              checked={values.rating === "superb"}
              onChange={(e) => {
                setValues({ ...values, rating: e.target.value });
              }}></RadioButton>
          </div>
          <TextAreaInput
            label="What can we improve on? (optional)"
            name="message"
            placeholder="Type here"
            value={values.comment}
            onChange={(e) => {
              setValues({ ...values, comment: e.target.value });
            }}></TextAreaInput>
          <PrimaryButton
            buttonText="Submit"
            type="submit"
            isLoading={loading}></PrimaryButton>
        </form>
        {errMsg && <p className="text-red-500">{errMsg}</p>}
      </div>

      <SuccessModal
        isOpen={isOpen}
        onClose={onClose}
        text="Thank you for your feedback. We have received it and will act on it"
        buttonText="Close"
        href="/dashboard"
      />
    </>
  );
};
