import { Roles } from "@prisma/client";
import { LayoutDashboard, LucideIcon, UserRoundPlus } from "lucide-react";

interface MenuEntry {
  title: string;
  Icon: LucideIcon;
  href: String;
}

export interface MenuEntities {
  name: String;
  allowedRoles: Roles[];
  routes: MenuEntry[];
}
const root = "/office";
export const routes: MenuEntities[] = [
  {
    name: "Summary",
    allowedRoles: ["Admin", "Developer", "Super", "Staff"],
    routes: [{ title: "Dashboard", href: root, Icon: LayoutDashboard }],
  },
  {
    name: "Management",
    allowedRoles: ["Developer", "Super"],
    routes: [
      {
        title: "Add Staff",
        href: root + "/super-admin/add-staff",
        Icon: UserRoundPlus,
      },
    ],
  },
];
