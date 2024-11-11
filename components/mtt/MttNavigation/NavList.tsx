import { Building2, CalendarCog, FileText, LayoutDashboard, ListTodo, Music2Icon, User } from "lucide-react";

const basePath = "/dashboard";

export const MttNavItems = [
  {
    icon: <LayoutDashboard />,
    path: "",
    label: "Home",
    basePath,
  },
  {
    icon: <User />,
    path: "/clients",
    label: "Client",
    basePath,
  },
  {
    icon: <ListTodo />,
    path: "/items",
    label: "Items",
    basePath,
  },
  {
    icon: <CalendarCog />,
    path: "/chat",
    label: "Chat",
    basePath,
  },
  {
    icon: <FileText />,
    path: "/quote",
    label: "Quote",
    basePath,
  },
  {
    icon: <Building2 />,
    path: "/company",
    label: "Company",
    basePath,
  },
];



