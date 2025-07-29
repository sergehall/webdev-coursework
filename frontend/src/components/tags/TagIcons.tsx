import type { JSX } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { TbClockHour8 } from "react-icons/tb";
import { MdOutlineOnlinePrediction } from "react-icons/md";

export type TagIconLabel =
  | "Gateway Course"
  | "Program Requirement"
  | "General Education"
  | "Appropriate for Intersession"
  | "Available Online"
  | "Global Citizenship";

export interface TagIcon {
  icon: JSX.Element;
  label: TagIconLabel;
  bg: string;
}

export const tagIcons: TagIcon[] = [
  {
    icon: <BsExclamationLg className="text-white" />,
    label: "Gateway Course",
    bg: "bg-green-600",
  },
  {
    icon: <FaStar className="text-white" />,
    label: "Program Requirement",
    bg: "bg-pink-600",
  },
  {
    icon: <span className="text-sm font-bold text-white">GE</span>,
    label: "General Education",
    bg: "bg-purple-600",
  },
  {
    icon: <TbClockHour8 className="text-white" />,
    label: "Appropriate for Intersession",
    bg: "bg-sky-900",
  },
  {
    icon: <MdOutlineOnlinePrediction className="text-white" />,
    label: "Available Online",
    bg: "bg-blue-600",
  },
  {
    icon: <span className="text-sm font-bold text-white">GC</span>,
    label: "Global Citizenship",
    bg: "bg-amber-700",
  },
];

// Dictionary: by label → data
export const tagIconMap: Record<TagIconLabel, TagIcon> = Object.fromEntries(
  tagIcons.map((item) => [item.label, item])
) as Record<TagIconLabel, TagIcon>;
