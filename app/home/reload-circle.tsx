"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";

export default function ReloadCircle() {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        router.refresh();
        router.replace("/home");
      }}
    >
      <FontAwesomeIcon
        color="white"
        className={`flex justify-center w-full`}
        icon={faRotateRight}
      />
    </div>
  );
}
