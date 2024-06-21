import { Button } from "@/components/ui/button";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="container flex md:flex-row flex-col h-screen">
        <div className="basis-1/2 flex justify-center items-center">
          <Image
            src="/advanceSociety.jpg"
            height="3000"
            width="3000"
            alt="advance Society object-cover"
            className="rounded-3xl"
          />
        </div>
        <div className="flex flex-col justify-evenly items-center basis-1/2">
          <FontAwesomeIcon icon={faX} className="text-8xl" />
          <h1 className="sm:text-5xl text-4xl">Welcome to Twitter</h1>
          <Link href="/home">
            <Button
              className="text-xl p-8 rounded-2xl border-2"
              variant="outline"
            >
              Home
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
