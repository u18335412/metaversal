import { Posts } from "@/components/Posts";

export default function Home() {
  return (
    <div>
      <header className="flex justify-center items-center h-[3.5rem] bg-white border-[#DFDFDF] border">
        <h1 className="text-lg font-extrabold">Feed</h1>
      </header>
      <main className="container max-w-[43.75rem] mx-auto px-4 py-8">
        <section>
          <Posts />
        </section>
      </main>
    </div>
  );
}
