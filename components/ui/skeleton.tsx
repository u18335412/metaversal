import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-10 animate-pulse rounded-full bg-muted bg-gradient-to-r from-[#ebedee] via-[#f9fafa] to-[#ebedee]",
        className,
      )}
      {...props}
    />
  );
}

export { Skeleton };
