import Link from "next/link";
import { UserProfileCard } from "@/components/ProfileUserCard";
import { RecentPosts } from "@/components/RecentPosts";
import { ChevronLeft } from "lucide-react";

export default function Profile() {
  return (
    <div>
      <header className="relative flex h-[3.5rem] items-center border border-[#DFDFDF] bg-white">
        <Link href="/" className="absolute left-2 size-8 cursor-pointer p-1">
          <ChevronLeft className="size-6" />
        </Link>
        <h1 className="w-full text-center text-lg font-extrabold">Profile</h1>
      </header>
      <main className="container mx-auto max-w-[43.75rem] px-4 py-8">
        <section>
          <UserProfileCard />
        </section>
        <section className="mt-12 flex flex-col gap-4">
          <div>
            <RecentPosts />
          </div>
        </section>
      </main>
    </div>
  );
}
