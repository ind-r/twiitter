import Link from "next/link";

export default function page() {
  return (
    <>
      <section className="relative bg-[url(/advanceSociety.jpg)] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/75 sm:bg-transparent sm:from-black/95 sm:to-gray-900/25 sm:bg-gradient-to-r"></div>
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl">
              Welcome To Your
              <strong className="block font-extrabold text-blue-500">
                {" "}
                Forever Home.{" "}
              </strong>
            </h1>

            <p className="mt-4 max-w-lg text-white sm:text-xl/relaxed">
              Twiitter
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                href="/home"
                className="block w-full rounded bg-blue-700 px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-800 focus:outline-none focus:ring active:bg-blue-900 sm:w-auto"
              >
                We are waiting.
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
