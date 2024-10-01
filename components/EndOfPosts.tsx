"use client";

import { useIntersectionObserver } from "@/hooks";
import { FC, useEffect } from "react";

export const EndOfPosts: FC<{
  loadMore: () => void;
}> = ({ loadMore }) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting) loadMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isIntersecting]);

  return <div ref={ref} />;
};
