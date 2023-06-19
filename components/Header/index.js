import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div className="h-16 w-full bg-sky-500 text-white shadow-lg">
      <Link href="/">
        <h1 className="pt-3 text-center text-2xl font-bold">SI Perpustakaan</h1>
      </Link>
    </div>
  );
};

export default Header;
