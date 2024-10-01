"use client";

import { FC } from "react";
import { PostSkeleton } from "./PostSkeleton";
import { useFetchTopPosts } from "@/hooks";
import { Post } from "./Post";
import { Error } from "./ui/error";

export const SuggestedPosts: FC = () => {
  const { data, isLoading, error, isValidating } = useFetchTopPosts();
  // Reason for the odd order of rendering data is to prevent layout shift if data has not loaded, thus skeleton is shown by default.

  if (data && !isLoading && !error) {
    return (
      <div>
        <h2 className="text-2xl">Suggested Posts</h2>
        <div className="mt-4 flex flex-col gap-4">
          {data?.map((post) => <Post data={post} key={post.id} />)}
        </div>
      </div>
    );
  }

  if (!(!data && !isLoading && !isValidating) && error) {
    return (
      <>
        <h2 className="pb-4 text-2xl">Suggested Posts</h2>
        <Error
          title="Error loading posts"
          description="We’re so sorry but it’s for the test."
        />
      </>
    );
  }

  return (
    <>
      <h2 className="pb-4 text-2xl">Suggested Posts</h2>
      <div className="h- flex flex-col gap-4">
        <PostSkeleton />
        <PostSkeleton />
      </div>
    </>
  );
};
