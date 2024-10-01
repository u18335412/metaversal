"use client";

import { useFetchUser, useUserPostDetails } from "@/hooks";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { MapPin } from "lucide-react";
import { useParams } from "next/navigation";
import { FC } from "react";
import { DepartmentBadge } from "./DepartmentBadge";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import fallbackImage from "@/app/avatar-fallback.svg";
import { Skeleton } from "./ui/skeleton";
import { Error } from "./ui/error";

export const UserProfileCard: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, error } = useFetchUser(id);
  const { totalLikes, totalPosts } = useUserPostDetails(id);

  if (error && error.status === 404)
    return (
      <Error
        title="User not found"
        description="We’re so sorry but it’s for the test."
      />
    );

  if (isLoading) return <UserCardSkeleton />;

  return (
    <Card className="mt-10 overflow-hidden rounded-xl bg-background md:mt-0">
      <div className="relative h-16 bg-gradient-to-r from-[#ece9fb] to-[#fdede7]" />
      <CardContent className="relative flex flex-row justify-center md:justify-start md:gap-[1.625rem] md:p-6">
        <div className="absolute -top-10 md:relative md:top-0">
          <div className="h-[7.5rem] w-[7.5rem]">
            <Avatar className="h-[7.5rem] w-[7.5rem] shrink-0 bg-white p-1 md:absolute md:-top-12 md:left-0">
              <AvatarImage></AvatarImage>
              <AvatarFallback>
                <Image
                  src={fallbackImage}
                  alt="fallback image"
                  className="h-[7.5rem] w-[7.5rem]"
                />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="mt-24 flex flex-col text-center md:mt-0 md:text-left">
          <h1 className="text-[1.875rem]">
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="flex flex-col items-center gap-3 text-secondary-foreground md:flex-row">
            <span>@{user?.username}</span>
            <span className="flex items-center">
              <MapPin className="size-4" /> {user?.address?.state},{" "}
              {user?.address?.country}
            </span>
          </div>
          <div className="mt-3">
            <DepartmentBadge
              department={user?.company?.department}
              color="blue"
            />
          </div>

          <div className="mt-3 flex justify-center gap-6 md:justify-start [&>*]:text-center md:[&>*]:text-left">
            <div>
              <h3 className="text-2xl">{totalPosts}</h3>
              <span className="text-xs uppercase text-secondary-foreground">
                Posts
              </span>
            </div>
            <div>
              <h3 className="text-2xl">{totalLikes}</h3>
              <span className="text-xs uppercase text-secondary-foreground">
                Likes
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-center gap-4 border-t bg-gradient-to-b from-white from-0% via-0% to-[#FFFAF5] px-6 pt-4 md:justify-start">
        <Button>Follow</Button>
        <Button variant="outline">Message</Button>
      </CardFooter>
    </Card>
  );
};

const UserCardSkeleton = () => {
  return (
    <Card className="mt-10 overflow-hidden rounded-xl bg-background md:mt-0">
      <div className="h-16 bg-[#F1F3F4]" />
      <CardContent className="flex flex-col items-center p-6 md:flex-row md:items-start md:gap-[1.625rem]">
        <div className="absolute md:relative">
          <div className="h-[7.5rem] w-[7.5rem]">
            <Avatar className="absolute -top-14 h-[7.5rem] w-[7.5rem] shrink-0 bg-white p-1">
              <AvatarImage></AvatarImage>
              <AvatarFallback>
                <Skeleton className="h-[7.5rem] w-[7.5rem]" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center md:mt-0 md:items-start">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="mt-2 h-5 w-40" />

          <Skeleton className="mt-4 h-7 w-32" />

          <div className="mt-6 flex gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="mt-1.5 h-3.5 w-11" />
            </div>
            <div className="flex flex-col items-center md:items-start">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="mt-1.5 h-3.5 w-11" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row justify-center gap-4 border-t px-6 pt-4 md:justify-start">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  );
};
