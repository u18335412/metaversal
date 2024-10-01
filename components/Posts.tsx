"use client";

import { Post } from "@/components/Post";
import { FC } from "react";
import { EndOfPosts } from "./EndOfPosts";
import { PostSkeleton } from "./PostSkeleton";
import { useFetchInfinitePosts } from "@/hooks";

export const Posts: FC = () => {
  const { data, isValidating, isLoading, setSize, size } =
    useFetchInfinitePosts();

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
      {data && data[size - 1]?.skip < data[size - 1]?.total && (
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
