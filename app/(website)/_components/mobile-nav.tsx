import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MobileSideBar = () => {
  const pathname = usePathname();
  const active = "text-red-600";
  const normal = "text-gray-800";
  const [cArea, setCArea] = useState(false);
  const currentUser = false;
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="right" className="p-6 bg-white">
        <div className="w-full pr-10 text-right">
          {!currentUser ? (
            <Link
              href="/login"
              className={`px-3 py-2 rounded-md text-sm font-medium ${normal}  hover:text-gray-300`}
            >
              Sign in
            </Link>
          ) : (
            <button
              className={` py-2 rounded-md text-sm font-medium ${normal}  hover:text-gray-300`}
            >
              Sign out
            </button>
          )}
        </div>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
          <Link
            href="/"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === "/" ? active : normal
            }  hover:text-gray-300`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === "/about" ? active : normal
            }  hover:text-gray-300`}
          >
            About
          </Link>
          <Link
            href="/services"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === "/services" ? active : normal
            }  hover:text-gray-300`}
          >
            Services
          </Link>
          <div
            onClick={() => setCArea(!cArea)}
            className="inline px-3 py-2 rounded-md"
          >
            <p
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                pathname === "/tracking" ||
                pathname === "/quotation" ||
                pathname === "/pickup-request" ||
                pathname === "/login" ||
                pathname === "/account"
                  ? active
                  : normal
              }  hover:text-gray-300`}
            >
              Client Area <span>{cArea ? "△" : "▽"}</span>
            </p>
            <div
              className={`${
                cArea ? "block" : "hidden"
              } flex flex-col w-40 py-4   z-[5000]`}
            >
              <Link
                href="/tracking"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/tracking" ? active : normal
                }  hover:text-gray-300`}
              >
                Track an Item
              </Link>
              <Link
                href="/quotation"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/quotation" ? active : normal
                }  hover:text-gray-300`}
              >
                Quotation
              </Link>
              <Link
                href="/pickup-request"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/pickup-request" ? active : normal
                }  hover:text-gray-300`}
              >
                Pickup Request
              </Link>
              {!currentUser ? (
                <Link
                  href="/login"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/login" ? active : normal
                  }  hover:text-gray-300`}
                >
                  Login
                </Link>
              ) : (
                <Link
                  href="/account"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === "/account" ? active : normal
                  }  hover:text-gray-300`}
                >
                  My Account
                </Link>
              )}
            </div>
          </div>
          <Link
            href="/contact"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === "/contact" ? active : normal
            }  hover:text-gray-300`}
          >
            Contact
          </Link>
          <Link
            href="/career"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === "/career" ? active : normal
            }  hover:text-gray-300`}
          >
            Career
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSideBar;
