import { Skeleton } from "@/components/ui/skeleton";

export default function TweetSkel() {
  return (
    <article className="pt-10 text-white h-[150px] border-b border-borderGray">
      <Skeleton className="h-[40px] w-[40px] float-left mt-2 ml-4 rounded-full" />
      <Skeleton className="mr-6 pt-1 ml-16 h-4 w-40" />
      <Skeleton className="mr-6 pb-1 ml-16 h-8 mt-3" />
      <Skeleton className="mr-6 ml-16"></Skeleton>
    </article>
  );
}
