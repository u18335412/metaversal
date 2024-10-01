import { Posts } from "@/components/Posts";

export default function Home() {
  return (
    <div>
      <header className="flex h-[3.5rem] items-center justify-center border border-[#DFDFDF] bg-white">
        <h1 className="text-lg font-extrabold">Feed</h1>
      </header>
      <main className="container mx-auto max-w-[43.75rem] px-4 py-8">
        <section>
          <Posts />
        </section>
      </main>
    </div>
  );
}
