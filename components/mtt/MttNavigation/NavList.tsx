import { Building2, CalendarCog, FileText, LayoutDashboard, ListTodo, Music2Icon, User, Users } from "lucide-react";

const basePath = "/dashboard";

export const MttNavItems = [
  {
    icon: <LayoutDashboard />,
    path: "",
    label: "Home",
    basePath,
    subMenu:[]
  },
  {
    icon: <User />,
    path: "/clients",
    label: "Client",
    basePath,
    subMenu:[]
  },
  {
    icon: <ListTodo />,
    path: "/items",
    label: "Items",
    basePath,
    subMenu:[]
  },
  {
    icon: <CalendarCog />,
    path: "/chat",
    label: "Chat",
    basePath,
    subMenu:[]
  },
  {
    icon: <FileText />,
    path: "/invoice",
    label: "Invoice",
    basePath,
    subMenu:["Create", "Invoices"]
  },
  {
    icon: <FileText />,
    path: "/quote",
    label: "Quote",
    basePath,
    subMenu:["Create", "Quotations"]
  },
  {
    icon: <Building2 />,
    path: "/company",
    label: "Company",
    basePath,
    subMenu:[]
  },
  {
    icon: <Users />,
    path: "/users",
    label: "Users",
    basePath,
    subMenu:[]
  },
];



