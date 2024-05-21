import { SidebarItems } from "@/models/props/navigation/SidebarProps";
import { GiSelfLove } from "react-icons/gi";
import { RiAiGenerate } from "react-icons/ri";
import { IoMdContacts } from "react-icons/io";
import { GrSchedule } from "react-icons/gr";


export const sidebarItems: SidebarItems[] = [
  {
    id: 1,
    path: "/dashboard",
    icon: GiSelfLove,
    label: "Home",
  },
  {
    id: 2,
    path: "/dashboard/schedule-messages",
    icon: GrSchedule,
    label: "Schedule",
  },
  {
    id: 3,
    path: "/dashboard/generate",
    icon: RiAiGenerate ,
    label: "Generate",
  },
  {
    id: 4,
    path: "/dashboard/contacts",
    icon: IoMdContacts,
    label: "Add contacts",
  },
];
