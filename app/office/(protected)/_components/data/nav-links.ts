import { Roles } from "@prisma/client";
import {
  LayoutDashboard,
  LucideIcon,
  User,
  UserRoundPlus,
  Warehouse,
} from "lucide-react";

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
    allowedRoles: ["Admin", "Developer", "Super_Admin", "Staff"],
    routes: [
      { title: "Dashboard", href: root, Icon: LayoutDashboard },
      { title: "Profile", href: `${root}/staff/profile`, Icon: User },
    ],
  },
  {
    name: "Management",
    allowedRoles: ["Developer", "Super_Admin"],
    routes: [
      {
        title: "Add Staff",
        href: root + "/super-admin/add-staff",
        Icon: UserRoundPlus,
      },
      {
        title: "Add Station",
        href: root + "/super-admin/add-station",
        Icon: Warehouse,
      },
    ],
  },
];
