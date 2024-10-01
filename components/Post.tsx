"use client";

import { FC } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import fallbackImage from "../app/avatar-fallback.svg";
import Image from "next/image";
import Link from "next/link";
import { useFetchMinimalUser } from "@/hooks";
import { Eye, Send, ThumbsUp } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

export const Post: FC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}> = ({ data }) => {
  return (
    <Card className="rounded-2xl">
      <div className="flex">
        <Link href={`/profile/${data.userId}`}>
          <Avatar className="ml-4 -mr-1 my-4 w-10 h-10 shrink-0 hover:opacity-50 transition-opacity cursor-pointer">
            <AvatarImage></AvatarImage>
            <AvatarFallback>
              <Image src={fallbackImage} alt="fallback image" />
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <User id={data.userId} />
          <CardContent className="-mt-1">
            <p className="text-sm text-secondary-foreground">{data.body}</p>
            <ul className="mt-3 flex gap-3">
              {data?.tags.map((tag: string) => (
                <li className="text-primary text-xs" key={tag}>
                  #{tag}
                </li>
              ))}
            </ul>
          </CardContent>
        </div>
      </div>
      <CardFooter className="border-t pt-4 text-secondary-foreground text-sm flex items-center gap-6">
        <span className="flex items-center gap-1">
          <ThumbsUp className="size-4" />
          {data?.reactions?.likes}
        </span>
        <span className="flex items-center gap-1">
          <Send className="size-4" />
          {data?.reactions?.likes}
        </span>
        <span className="flex items-center gap-1">
          <Eye className="size-4" />
          {data?.reactions?.likes}
        </span>
      </CardFooter>
    </Card>
  );
};

function User({ id }: { id: string }) {
  const { data: user, isLoading } = useFetchMinimalUser(id);

  if (isLoading) {
    return (
      <CardHeader className="gap-2 flex-col flex mr-12 py-4">
        <Skeleton className="w-44 h-4" />
        <Skeleton className="w-20 h-3.5" />
      </CardHeader>
    );
  }

  return (
    <Link href={`/profile/${id}`}>
      <CardHeader>
        <CardTitle className="text-base hover:underline">
          {user?.firstName} {user?.lastName}
        </CardTitle>
        <CardDescription className=" text-xs">
          @{user?.username}
        </CardDescription>
      </CardHeader>
    </Link>
  );
}
