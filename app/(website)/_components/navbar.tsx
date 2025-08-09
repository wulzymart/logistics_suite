"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import MobileSideBar from "./mobile-nav";

const Navbar = () => {
  const pathname = usePathname();
  const active = "text-red-600";
  const normal = "text-gray-800";
  const [cArea, setCArea] = useState(false);
  const currentUser = false;
  return (
    <nav className="bg-white">
      <div className="h-[120px] flex items-center border-b px-6 md:px-20 justify-between">
        <Link href="/">
          <div className="w-[80px] h-[80px]">
            <Image
              src="/logo.png"
              height={100}
              width={100}
              alt="first line logistics logo"
            />
          </div>
        </Link>
        <div className="hidden md:flex flex-col items-end">
          <Button variant="ghost">Sign in</Button>
          <div className="ml-10 flex gap-4 items-baseline">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md  font-medium ${pathname === "/" ? active : normal
                }  hover:text-gray-300`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-md  font-medium ${pathname === "/about" ? active : normal
                }  hover:text-gray-300`}
            >
              About
            </Link>
            <Link
              href="/services"
              className={`px-3 py-2 rounded-md  font-medium ${pathname === "/services" ? active : normal
                }  hover:text-gray-300`}
            >
              Services
            </Link>
            <div
              onMouseEnter={() => setCArea(true)}
              onMouseLeave={() => setCArea(false)}
              className="inline px-3 py-2 rounded-md "
            >
              <p
                className={`px-3 py-2 rounded-md  font-medium ${pathname === "/tracking" ||
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
                className={`absolute ${cArea ? "block" : "hidden"
                  } flex flex-col w-40 py-4 rounded-lg bg-white shadow-lg z-[5000]`}
              >
                <Link
                  href="/track"
                  className={`px-3 py-2 rounded-md  font-medium ${pathname === "/track" ? active : normal
                    }  hover:text-gray-300`}
                >
                  Track an Item
                </Link>
                {/* <Link
                  href="/quotation"
                  className={`px-3 py-2 rounded-md  font-medium ${pathname === "/quotation" ? active : normal
                    }  hover:text-gray-300`}
                >
                  Quotation
                </Link> */}
                <Link
                  href="/pickup-request"
                  className={`px-3 py-2 rounded-md font-medium ${pathname === "/pickup-request" ? active : normal
                    }  hover:text-gray-300`}
                >
                  Pickup Request
                </Link>
                {!currentUser ? (
                  <Link
                    href="/login"
                    className={`px-3 py-2 rounded-md  font-medium ${pathname === "/login" ? active : normal
                      }  hover:text-gray-300`}
                  >
                    Login
                  </Link>
                ) : (
                  <Link
                    href="/account"
                    className={`px-3 py-2 rounded-md  font-medium ${pathname === "/account" ? active : normal
                      }  hover:text-gray-300`}
                  >
                    My Account
                  </Link>
                )}
              </div>
            </div>
            <Link
              href="/contact"
              className={`px-3 py-2 rounded-md  font-medium ${pathname === "/contact" ? active : normal
                }  hover:text-gray-300`}
            >
              Contact
            </Link>
            <Link
              href="/career"
              className={`px-3 py-2 rounded-md  font-medium ${pathname === "/career" ? active : normal
                }  hover:text-gray-300`}
            >
              Career
            </Link>
          </div>
        </div>
        <MobileSideBar />
      </div>
    </nav>
  );
};

export default Navbar;
