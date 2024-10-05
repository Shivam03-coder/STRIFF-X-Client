import {
  AlertOctagon,
  AlertTriangle,
  BringToFront,
  CircleAlert,
  Home,
  Hourglass,
  LucideIcon,
  Search,
  ShieldAlert,
  UserCog,
  UserRound,
  UsersRound,
} from "lucide-react";

interface sideBarLinkDataTypes {
  href: string;
  icon: LucideIcon;
  label: string;
}

// Example array with valid sideBarLinkDataTypes objects
export const sideBarLinksData: Array<sideBarLinkDataTypes> = [
  {
    href: "/home",
    icon: Home,
    label: "Home",
  },
  {
    href: "/timeline",
    icon: Hourglass,
    label: "Timeline",
  },
  {
    href: "/search",
    icon: Search,
    label: "Search",
  },
  {
    href: "/users",
    icon: UserRound,
    label: "User",
  },
  {
    href: "/Teams",
    icon: UsersRound,
    label: "Teams",
  },
];

export const projectAccordionLinksData: Array<sideBarLinkDataTypes> = [
  {
    href: "/home",
    icon: Home,
    label: "Home",
  },
  {
    href: "/home",
    icon: Home,
    label: "Home",
  },
  {
    href: "/home",
    icon: Home,
    label: "Home",
  },
  {
    href: "/home",
    icon: Home,
    label: "Home",
  },
  {
    href: "/home",
    icon: Home,
    label: "Home",
  },
  {
    href: "/home",
    icon: Home,
    label: "Home",
  },
];

export const prioritytAccordionLinksData: Array<sideBarLinkDataTypes> = [
  {
    href: "/priority/urgent",
    icon: CircleAlert,
    label: "Urgent",
  },
  {
    href: "/priority/high",
    icon: ShieldAlert,
    label: "High",
  },
  {
    href: "/priority/medium",
    icon: AlertTriangle,
    label: "Medium",
  },
  {
    href: "/priority/low",
    icon: AlertOctagon,
    label: "Low",
  },
  {
    href: "/priority/backlog",
    icon: BringToFront,
    label: "Backlog",
  },
];

export const TaskStatusData: Array<string> = [
  "To Do",
  "Work In Progress",
  "Under Review",
  "Completed",
];
