import { FC } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export const DepartmentBadge: FC<{
  color: "purple" | "red" | "blue" | "orange" | "turquoise";
  department: string;
}> = ({ department, color }) => {
  return (
    <Badge
      className={cn("pointer-events-none rounded-xl px-3 py-1.5", {
        "bg-[#ECE9FB] text-[#361FAD]": color === "purple",
        "bg-[#FCE8EC] text-[#B61634]": color === "red",
        "bg-[#E5F4FF] text-[#0077CC]": color === "blue",
        "bg-[##FDEDE7] text-[#C03F0C]": color === "orange",
        "bg-[#E9FBFB] text-[#1FADAD]": color === "turquoise",
      })}
    >
      <h4 className="text-base">{department}</h4>
    </Badge>
  );
};
