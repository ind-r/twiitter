"use client";

import { useEffect, useRef, useState } from "react";
import SideMenu from "./side-menu";
import Image from "next/image";

export default function ProfileMenu({
  image,
  httpsImage,
  name: nickname,
}: {
  image: string;
  httpsImage: boolean;
  name: string;
}) {
  const [open, setOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-center" ref={userRef}>
      <Image
        src={httpsImage ? image : "/default-user.png"}
        height={200}
        width={200}
        alt="profile"
        className="w-10 h-10 rounded-full cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <SideMenu image={image} httpsImage={httpsImage} name={nickname} />
      )}
    </div>
  );
}
