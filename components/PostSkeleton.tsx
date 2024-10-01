import { FC } from "react";
import { Skeleton } from "./ui/skeleton";

export const PostSkeleton: FC = () => {
  return (
    <div className="h-48 rounded-2xl bg-white pb-4">
      <div className="flex gap-3 p-4">
        <div>
          <Skeleton className="size-10 rounded-full" />
        </div>
        <div>
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-44" />
            <Skeleton className="h-3.5 w-20" />
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <Skeleton className="h-3.5 w-56" />
            <Skeleton className="h-3.5 w-48" />
          </div>

          <div className="mt-3 flex items-center gap-3">
            <Skeleton className="h-3.5 w-10" />
            <Skeleton className="h-3.5 w-10" />
            <Skeleton className="h-3.5 w-10" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6 border-t p-4">
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
        <Skeleton className="h-5 w-10" />
      </div>
    </div>
  );
};
