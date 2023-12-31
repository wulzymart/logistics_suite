import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const UserButton = ({ name, id }: { name: string; id: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center px-4 ">
          <Image
            src="/avatar.jpg"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full border-2 border-slate-200"
          />
          <span className="font-semibold italic ml-2">{name}</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Pin & Password</DropdownMenuItem>
        <DropdownMenuItem>Bank details</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Stats</DropdownMenuLabel>
        <DropdownMenuItem>My Orders</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
