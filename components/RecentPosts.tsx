"use client";

import { useFetchInfiniteUserPosts } from "@/hooks";
import { useParams } from "next/navigation";
import { FC } from "react";
import { EndOfPosts } from "./EndOfPosts";
import { Post } from "./Post";
import { PostSkeleton } from "./PostSkeleton";

export const RecentPosts: FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isValidating, setSize, size, error } =
    useFetchInfiniteUserPosts(id);

  if (error) return null;

  return (
    <div>
      <h2 className="text-2xl">Recent</h2>
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
    </>
  );
};
