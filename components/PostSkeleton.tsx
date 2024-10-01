import { FC } from "react";
import { Skeleton } from "./ui/skeleton";

export const PostSkeleton: FC = () => {
  return (
    <div className="h-48 bg-white rounded-2xl pb-4">
      <div className="p-4 flex gap-3">
        <div>
          <Skeleton className="size-10 rounded-full" />
        </div>
        <div>
          <div className="gap-1 flex-col flex">
            <Skeleton className="w-44 h-4" />
            <Skeleton className="w-20 h-3.5" />
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <Skeleton className="w-56 h-3.5" />
            <Skeleton className="w-48 h-3.5" />
          </div>

          <div className="flex items-center gap-3 mt-3">
            <Skeleton className="w-10 h-3.5" />
            <Skeleton className="w-10 h-3.5" />
            <Skeleton className="w-10 h-3.5" />
          </div>
        </div>
      </div>
      <div className="p-4 border-t flex items-center gap-6">
        <Skeleton className="w-10 h-5" />
        <Skeleton className="w-10 h-5" />
        <Skeleton className="w-10 h-5" />
      </div>
    </div>
  );
};
