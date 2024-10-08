/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetcher, multiFetcher } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";

// Data caching is handle through useSWR
export const useFetchUser = (id: string) => {
  return useSWR(
    `user/${id}`,
    () =>
      fetcher(
        `https://dummyjson.com/users/${id}?select=firstName,lastName,username,address,company`,
      ),
    {
      onError: (err) => {
        if (err.status === 404) return;
      },
    },
  );
};

export const useFetchMinimalUser = (id: string) => {
  return useSWR(`user/minimal/${id}`, () =>
    fetcher(
      `https://dummyjson.com/users/${id}?select=firstName,lastName,username`,
    ),
  );
};

export const useFetchUserPosts = (id: string) => {
  return useSWR(
    `posts/user/${id}`,
    () => fetcher(`https://dummyjson.com/posts/users/${id}`),
    {
      onError: (err) => {
        if (err.status === 404) return;
      },
    },
  );
};

const getPostKey = (pageIndex: number, previousPageData: any) => {
  if (previousPageData && !previousPageData) return null;
  // first page, we don't have `previousPageData`
  if (pageIndex === 0) return "https://dummyjson.com/posts?limit=5";
  // add the cursor to the API endpoint
  return `https://dummyjson.com/posts?limit=5&skip=${pageIndex * 5}`;
};

export const useFetchInfinitePosts = () => {
  return useSWRInfinite(getPostKey, fetcher, {});
};

export const useFetchInfiniteUserPosts = (id: string) => {
  const getUserPostsKey = useCallback(
    (pageIndex: number, previousPageData: any) => {
      if (previousPageData && !(previousPageData.posts.length > 0)) return null;
      // first page, we don't have `previousPageData`
      if (pageIndex === 0)
        return `https://dummyjson.com/posts/user/${id}?limit=5`;
      // add the cursor to the API endpoint
      return `https://dummyjson.com/posts/user/${id}?limit=5&skip=${
        pageIndex * 5
      }`;
    },
    [id],
  );
  return useSWRInfinite(getUserPostsKey, fetcher, {
    onError: (err) => {
      if (err.status === 404) return;
    },
    revalidateOnFocus: false,
  });
};

export const useUserPostDetails = (id: string) => {
  const { data } = useSWR(`user/${id}/post-details/`, () =>
    fetcher(`https://dummyjson.com/posts/user/${id}?limit=0&select=reactions`),
  );
  const totalLikes = data?.posts?.reduce(
    (total: number, post: any) => post?.reactions.likes + total,
    0,
  );
  return {
    totalLikes,
    totalPosts: data?.total,
  };
};

export const useFetchWhoToFollow = () => {
  const { data: ungrouped } = useSWR(
    `posts/whotofollow`,
    () =>
      fetcher(
        `https://dummyjson.com/posts?limit=0&select=userId&sortBy=userId&order=desc`,
      ),
    {
      onError: (err) => {
        if (err.status === 404) return;
      },
    },
  );

  const unsorted = Object.groupBy(ungrouped?.posts || [], (post: any) => {
    return post.userId;
  });

  const sorted = Object.entries(unsorted)
    .sort(([, a], [, b]) => {
      if (a && b) {
        return b?.length - a?.length;
      }
      return 0;
    })
    .slice(0, 4);

  const ids = Object.keys(Object.fromEntries(sorted)).map((key) => key);

  const usersUrl = ids.map(
    (id) =>
      `https://dummyjson.com/users/${id}?select=firstName,lastName,username`,
  );

  return useSWR(`users/top/${ids}`, () => multiFetcher(usersUrl));
};

export const useFetchTopPosts = () => {
  const { data } = useSWR(
    `posts/top-posts`,
    () =>
      fetcher(`https://dummyjson.com/posts?limit=0&select=reactions&delay=0`),
    {
      onError: (err) => {
        if (err.status === 404) return;
      },
    },
  );

  const sorted = data?.posts
    .sort((a: any, b: any) => b.reactions.likes - a.reactions.likes)
    .slice(0, 2);

  const postUrls = sorted?.map(
    (post: any) => `https://dummyjson.com/posts/${post?.id}`,
  );

  return useSWR(`posts/top/${sorted}`, () => multiFetcher(postUrls));
};

type State = {
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
};

type UseIntersectionObserverOptions = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  freezeOnceVisible?: boolean;
  onChange?: (
    isIntersecting: boolean,
    entry: IntersectionObserverEntry,
  ) => void;
  initialIsIntersecting?: boolean;
};

type IntersectionReturn = [
  (node?: Element | null) => void,
  boolean,
  IntersectionObserverEntry | undefined,
] & {
  ref: (node?: Element | null) => void;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
};

export function useIntersectionObserver({
  threshold = 0,
  root = null,
  rootMargin = "0%",
  freezeOnceVisible = false,
  initialIsIntersecting = false,
  onChange,
}: UseIntersectionObserverOptions = {}): IntersectionReturn {
  const [ref, setRef] = useState<Element | null>(null);

  const [state, setState] = useState<State>(() => ({
    isIntersecting: initialIsIntersecting,
    entry: undefined,
  }));

  const callbackRef = useRef<UseIntersectionObserverOptions["onChange"]>();

  callbackRef.current = onChange;

  const frozen = state.entry?.isIntersecting && freezeOnceVisible;

  useEffect(() => {
    // Ensure we have a ref to observe
    if (!ref) return;

    // Ensure the browser supports the Intersection Observer API
    if (!("IntersectionObserver" in window)) return;

    // Skip if frozen
    if (frozen) return;

    let unobserve: (() => void) | undefined;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]): void => {
        const thresholds = Array.isArray(observer.thresholds)
          ? observer.thresholds
          : [observer.thresholds];

        entries.forEach((entry) => {
          const isIntersecting =
            entry.isIntersecting &&
            thresholds.some(
              (threshold) => entry.intersectionRatio >= threshold,
            );

          setState({ isIntersecting, entry });

          if (callbackRef.current) {
            callbackRef.current(isIntersecting, entry);
          }

          if (isIntersecting && freezeOnceVisible && unobserve) {
            unobserve();
            unobserve = undefined;
          }
        });
      },
      { threshold, root, rootMargin },
    );

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    ref,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(threshold),
    root,
    rootMargin,
    frozen,
    freezeOnceVisible,
  ]);

  const prevRef = useRef<Element | null>(null);

  useEffect(() => {
    if (
      !ref &&
      state.entry?.target &&
      !freezeOnceVisible &&
      !frozen &&
      prevRef.current !== state.entry.target
    ) {
      prevRef.current = state.entry.target;
      setState({ isIntersecting: initialIsIntersecting, entry: undefined });
    }
  }, [ref, state.entry, freezeOnceVisible, frozen, initialIsIntersecting]);

  const result = [
    setRef,
    !!state.isIntersecting,
    state.entry,
  ] as IntersectionReturn;

  result.ref = result[0];
  result.isIntersecting = result[1];
  result.entry = result[2];

  return result;
}
