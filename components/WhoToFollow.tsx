"use client";

import { FC } from "react";
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
import { Error } from "./ui/error";

export const WhoToFollow: FC = () => {
  const { data, isLoading, error, isValidating } = useFetchWhoToFollow();

  // Reason for the odd order of rendering data is to prevent major layout shift if data has not loaded, thus the skeleton is shown by default.

  if (data && data?.length > 0 && !isLoading && !error) {
    return (
      <div>
        <h2 className="text-2xl">Who to follow</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {data?.map((user) => {
            return (
              <Card
                key={user.id}
                className="flex flex-row items-center justify-between gap-3 overflow-hidden rounded-2xl p-0"
              >
                <CardHeader className="shrink-1 flex flex-row items-center gap-3 pr-0">
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
                    <CardTitle className="line-clamp-1 text-base hover:underline">
                      {user.firstName} {user.lastName}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      @{user.username}
                    </CardDescription>
                  </Link>
                </CardHeader>
                <CardContent className="p-4 pl-0">
                  <Button variant="outline">Follow</Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  if (!(!data && !isLoading && !isValidating) && error) {
    return (
      <>
        <h2 className="pb-4 text-2xl">Who to followf</h2>
        <Error
          title="Error loading users"
          description="We’re so sorry but it’s for the test."
        />
      </>
    );
  }

  return (
    <>
      <h2 className="text-2xl">Who to follow ff</h2>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <LoadingUsers />
      </div>
    </>
  );
};

const LoadingUsers = () => {
  return (
    <>
      <UserCardSmallSkeleton />
      <UserCardSmallSkeleton />
      <UserCardSmallSkeleton />
      <UserCardSmallSkeleton />
    </>
  );
};
