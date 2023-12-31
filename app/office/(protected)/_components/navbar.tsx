import { Button } from "@/components/ui/button";
import { AddCircleOutlineOutlined } from "@mui/icons-material";

import Image from "next/image";
import Link from "next/link";
import UserButton from "./user-button";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between items-center px-6 md:px-20 py-4 border-b shadow-sm">
        <div>
          <Image src="/logo1.png" alt="logo" height={20} width={30} />
        </div>
        <div className="flex">
          <Link href="#">
            <Button variant="secondary">
              <AddCircleOutlineOutlined fontSize="medium" />
              <span className="font-semibold ml-2">Create waybill</span>
            </Button>
          </Link>
          <UserButton name="John Doe" id="udhh3999" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
