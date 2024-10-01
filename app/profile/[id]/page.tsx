"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useFetchUser } from "@/hooks";
import { useParams } from "next/navigation";
import fallbackImage from "../../avatar-fallback.svg";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin } from "lucide-react";
import { DepartmentBadge } from "@/components/DepartmentBadge";
import { Button } from "@/components/ui/button";

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading } = useFetchUser(id);

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div>
      <header className="flex justify-center items-center h-[3.5rem] bg-white border-[#DFDFDF] border">
        <h1 className="text-lg font-extrabold">Profile</h1>
      </header>
      <main className="container max-w-[43.75rem] mx-auto px-4 py-8">
        <section>
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
              </div>
            </CardContent>
            <CardFooter className="flex flex-row gap-4 px-6 pt-4 justify-start border-t bg-gradient-to-b to-[#FFFAF5] via-0% from-white from-0%">
              <Button>Follow</Button>
              <Button variant="outline">Message</Button>
            </CardFooter>
          </Card>
        </section>

        <section className="mt-12 flex flex-col gap-4">
          <h2 className=" text-2xl">Recent</h2>
          <div></div>
        </section>
      </main>
    </div>
  );
}
