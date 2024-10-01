import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse bg-muted bg-gradient-to-r from-[#ebedee] via-[#f9fafa] to-[#ebedee] h-10 rounded-full",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
