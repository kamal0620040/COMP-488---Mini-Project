import Link from "next/link";
import React from "react";
import Image from "next/image";
import Theme from "./Theme";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className="flex items-center gap-1">
        <Image src="vercel.svg" width={50} height={50} alt="fake news logo" />
        <p className="h2-bold text-dark-100 dark:text-light-900 max-sm:hidden">
          <span className="text-primary-500">Fake</span> News
        </p>
      </Link>
      <div className="flex-between gap-5">
        <Theme />
      </div>
    </nav>
  );
};

export default Navbar;
