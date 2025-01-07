import Signin from "./signin";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <Signin params={params} />
    </>
  );
}
