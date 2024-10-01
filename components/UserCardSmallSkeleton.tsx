import { Card, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export const UserCardSmallSkeleton = () => {
  return (
    <Card className="flex flex-row items-center justify-between gap-3 rounded-2xl p-0">
      <CardHeader className="shrink-1 flex flex-row items-center gap-3 truncate">
        <Skeleton className="size-10 shrink-0 cursor-pointer rounded-full transition-opacity hover:opacity-50" />
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3.5 w-16 text-xs" />
        </div>
      </CardHeader>
    </Card>
  );
};
