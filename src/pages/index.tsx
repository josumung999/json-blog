import { CreatePostForm } from "@/components/forms/create-post-form";
import AppLayout from "@/components/layout";
import { PostItem } from "@/components/post-item";
import { fetcher } from "@/lib/utils";
import { Post } from "@/types";
import { useEffect } from "react";
import useSWRInfinite from "swr/infinite"; // Import useSWRInfinite

const PAGE_SIZE = 18; // Number of posts per page

export default function Home() {
  const getKey = (pageIndex: number, previousPageData: string | any[]) => {
    if (previousPageData && !previousPageData.length) return null; // Reached end

    return `https://jsonplaceholder.typicode.com/posts?_page=${
      pageIndex + 1
    }&_limit=${PAGE_SIZE}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  const allPosts = data ? [].concat(...data) : [];

  const isReachingEnd =
    isLoadingMore || (data && data[data.length - 1]?.length < PAGE_SIZE);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadMore = () => {
    if (!isReachingEnd) {
      setSize(size + 1);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight &&
          !isLoadingMore
        ) {
          loadMore();
        }
      };
    }

    // Clean up the event listener
    return () => {
      if (typeof window !== "undefined") {
        window.onscroll = null;
      }
    };
  }, [isLoadingMore, loadMore]);

  return (
    <AppLayout>
      <div className="py-10 w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-muted-foreground">
            Trending Now
          </h1>
          <CreatePostForm />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">
          {allPosts.map((post: Post) => (
            <PostItem post={post} key={post.id} />
          ))}
          {isLoadingMore && (
            <>
              {Array.from({ length: 10 }).map((_, index: number) => (
                <PostItem.Skeleton key={index} />
              ))}
            </>
          )}
        </div>
        {isReachingEnd && (
          <p className="text-lg text-muted-foreground text-center">
            All posts have been fetched.
          </p>
        )}
      </div>
    </AppLayout>
  );
}
