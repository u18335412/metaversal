import { FC } from "react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

export const DepartmentBadge: FC<{
  color: "purple" | "red" | "blue" | "orange" | "turquoise";
  department: string;
}> = ({ department, color }) => {
  return (
    <Badge
      className={cn("px-3 py-1.5 rounded-xl pointer-events-none", {
        "text-[#361FAD] bg-[#ECE9FB]": color === "purple",
        "text-[#B61634] bg-[#FCE8EC]": color === "red",
        "text-[#0077CC] bg-[#E5F4FF]": color === "blue",
        "text-[#C03F0C] bg-[##FDEDE7]": color === "orange",
        "text-[#1FADAD] bg-[#E9FBFB]": color === "turquoise",
      })}
    >
      <h4 className="text-base">{department}</h4>
    </Badge>
  );
};
