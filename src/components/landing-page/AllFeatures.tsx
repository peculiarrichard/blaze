import { Features } from "./Features";
import { FaBrain } from "react-icons/fa6";
import { FaClover } from "react-icons/fa6";
import { MdContactPhone } from "react-icons/md";

export const AllFeatures = () => {
  return (
    <>
      <div className="w-[90%] m-auto flex flex-col lg:flex-row gap-y-6 justify-between items-center lg:items-start lg:my-40 my-20">
        <Features
          icon={FaClover}
          title="Different channels"
          description="You can schedule Emails, SMS, and WhatsApp messages (coming soon) from one place. "
        />
        <Features
          icon={FaBrain}
          title="Smart AI"
          description="Generate love messages with our in-built AI tool. No need to manually type. "
        />
        <Features
          icon={MdContactPhone}
          title="Add contact"
          description="Add contacts and use them across all channels. You don't need multiple uploads."
        />
        <Features
          icon={MdContactPhone}
          title="Multiple messages"
          description="You can schedule more than one message"
        />
      </div>
    </>
  );
};
