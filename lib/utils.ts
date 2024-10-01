import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

class FetchError extends Error {
  status;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const fetcher = async (url: string) => {
  const resp = await fetch(url);

  if (!resp.ok) {
    const error = new FetchError(
      "An error occurred while fetching the data",
      resp.status,
    );
    throw error;
  }

  return await resp.json();
};

export function multiFetcher(urls: string[]) {
  return Promise.all(urls.map((url) => fetcher(url)));
}
