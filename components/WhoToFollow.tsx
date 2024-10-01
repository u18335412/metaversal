"use client";

import { FC } from "react";
import { PostSkeleton } from "./PostSkeleton";
import { useFetchWhoToFollow } from "@/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import fallbackImage from "@/app/avatar-fallback.svg";
import Image from "next/image";
import { UserCardSmallSkeleton } from "./UserCardSmallSkeleton";
import Link from "next/link";

export const WhoToFollow: FC = () => {
  const { data, isLoading } = useFetchWhoToFollow();
  return (
    <div>
      <h2 className="text-2xl">Who to follow</h2>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <LoadingUsers isLoading={isLoading} />
        {data?.map((user) => {
          return (
            <Card
              key={user.id}
              className="flex flex-row items-center justify-between gap-3 rounded-2xl p-0"
            >
              <CardHeader className="shrink-1 flex flex-row items-center gap-3 truncate">
                <Link href={`profile/${user.id}`}>
                  <Avatar className="size-10 shrink-0 cursor-pointer transition-opacity hover:opacity-50">
                    <AvatarImage></AvatarImage>
                    <AvatarFallback>
                      <Image src={fallbackImage} alt="fallback image" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Link
                  href={`profile/${user.id}`}
                  className="flex flex-col gap-0"
                >
                  <CardTitle className="text-base">
                    {user.firstName} {user.lastName}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    @{user.username}
                  </CardDescription>
                </Link>
              </CardHeader>
              <CardContent className="p-4">
                <Button variant="outline">Follow</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

const LoadingUsers: FC<{
  isLoading: boolean;
}> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <>
      <UserCardSmallSkeleton />
      <UserCardSmallSkeleton />
      <UserCardSmallSkeleton />
      <UserCardSmallSkeleton />
    </>
  );
};
