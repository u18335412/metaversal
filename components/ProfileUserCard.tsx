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

export const UserProfileCard: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useFetchUser(id);
  const { totalLikes, totalPosts } = useUserPostDetails(id);

  if (isLoading) return <UserCardSkeleton />;

  return (
    <Card className=" bg-background rounded-xl overflow-hidden">
      <div className="h-16 bg-gradient-to-r from-[#ece9fb] to-[#fdede7]" />
      <CardContent className="p-6 flex gap-[1.625rem]">
        <div className="relative">
          <div className="w-[7.5rem] h-[7.5rem]">
            <Avatar className="w-[7.5rem] h-[7.5rem] shrink-0 absolute -top-14 p-1 bg-white">
              <AvatarImage></AvatarImage>
              <AvatarFallback>
                <Image
                  src={fallbackImage}
                  alt="fallback image"
                  className="w-[7.5rem] h-[7.5rem] "
                />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-[1.875rem]">
            {user?.firstName} {user?.lastName}
          </h1>
          <div className="text-secondary-foreground flex items-center gap-3">
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

          <div className="mt-6 flex gap-6">
            <div>
              <h3 className="text-2xl">{totalPosts}</h3>
              <span className="uppercase text-xs text-secondary-foreground">
                Posts
              </span>
            </div>
            <div>
              <h3 className="text-2xl">{totalLikes}</h3>
              <span className="uppercase text-xs text-secondary-foreground">
                Likes
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-4 px-6 pt-4 justify-start border-t bg-gradient-to-b to-[#FFFAF5] via-0% from-white from-0%">
        <Button>Follow</Button>
        <Button variant="outline">Message</Button>
      </CardFooter>
    </Card>
  );
};

const UserCardSkeleton = () => {
  return (
    <Card className=" bg-background rounded-xl overflow-hidden">
      <div className="h-16 bg-[#F1F3F4]" />
      <CardContent className="p-6 flex gap-[1.625rem]">
        <div className="relative">
          <div className="w-[7.5rem] h-[7.5rem]">
            <Avatar className="w-[7.5rem] h-[7.5rem] shrink-0 absolute -top-14 p-1 bg-white">
              <AvatarImage></AvatarImage>
              <AvatarFallback>
                <Skeleton className="w-[7.5rem] h-[7.5rem] " />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
        <div className="flex flex-col">
          <Skeleton className="w-56 h-8" />
          <Skeleton className="w-40 h-5 mt-2" />

          <Skeleton className="mt-4 w-32 h-7" />

          <div className="mt-6 flex gap-6">
            <div>
              <Skeleton className="w-20 h-6" />
              <Skeleton className=" w-11 h-3.5 mt-1.5" />
            </div>
            <div>
              <Skeleton className="w-20 h-6" />
              <Skeleton className=" w-11 h-3.5 mt-1.5" />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row gap-4 px-6 pt-4 justify-start border-t">
        <Skeleton className="w-24 h-9" />
        <Skeleton className="w-24 h-9" />
      </CardFooter>
    </Card>
  );
};
