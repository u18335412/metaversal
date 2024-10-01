import Link from "next/link";
import { UserProfileCard } from "@/components/ProfileUserCard";
import { RecentPosts } from "@/components/RecentPosts";
import { ChevronLeft } from "lucide-react";

export default function Profile() {
  return (
    <div>
      <header className="flex h-[3.5rem] items-center bg-white border-[#DFDFDF] border relative">
        <Link href="/" className="absolute left-2 size-8 p-1 cursor-pointer">
          <ChevronLeft className="size-6" />
        </Link>
        <h1 className="text-lg font-extrabold text-center w-full">Profile</h1>
      </header>
      <main className="container max-w-[43.75rem] mx-auto px-4 py-8">
        <section>
          <UserProfileCard />
        </section>

        <section className="mt-12 flex flex-col gap-4">
          <h2 className=" text-2xl">Recent</h2>
          <div>
            <RecentPosts />
          </div>
        </section>
      </main>
    </div>
  );
}
