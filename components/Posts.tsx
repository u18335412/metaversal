"use client";

import { Post } from "@/components/Post";
import { fetcher } from "@/lib/utils";
import { FC } from "react";
import useSWRInfinite from "swr/infinite";
import { EndOfPosts } from "./EndOfPosts";
import { PostSkeleton } from "./PostSkeleton";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return "https://dummyjson.com/posts?limit=5";
  // add the cursor to the API endpoint
  return `https://dummyjson.com/posts?limit=5&skip=${pageIndex * 5}&delay=2000`;
};

export const Posts: FC = () => {
  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {}
  );

  return (
    <div className="mt-4 flex flex-col gap-y-4">
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      {data?.map((posts) => {
        return (
          <>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            {posts.posts?.map((post: any) => (
              <div key={post.id}>
                <Post data={post} />
              </div>
            ))}
          </>
        );
      })}
      <LoadingPosts isLoading={isLoading || isValidating} />
      {data && data?.length > 0 && (
        <EndOfPosts
          loadMore={() => {
            setSize(size + 1);
          }}
        />
      )}
    </div>
  );
};

const LoadingPosts: FC<{
  isLoading: boolean;
}> = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <>
      <PostSkeleton />
      <PostSkeleton />
      <PostSkeleton />
    </>
  );
};
