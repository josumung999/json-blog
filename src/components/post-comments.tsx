import { fetcher } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Comment } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import useSWRInfinite from "swr/infinite";

interface PostCommentsProps {
  postId: number;
  pageSize?: number;
}

function PostComments({ postId, pageSize = 10 }: PostCommentsProps) {
  // const [pageNumber, setPageNumber] = useState(1);
  // const { data, error, isLoading } = useSWR(
  //   `https://jsonplaceholder.typicode.com/posts/${postId}/comments?_page=${pageNumber}&_limit=${pageSize}`,
  //   fetcher
  // );
  // const totalPages = Math.ceil(data?.length / pageSize) || 0;

  // const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
  //   setPageNumber(pageNumber);
  // };

  // if (error) return <div>Error: {error.message}</div>;
  // if (!data) return <div>Loading...</div>;

  const getKey = (pageIndex: number, previousPageData: string | any[]) => {
    if (previousPageData && !previousPageData.length) return null; // Reached end

    return `https://jsonplaceholder.typicode.com/posts/${postId}/comments?_page=${
      pageIndex + 1
    }&_limit=${pageSize}`;
  };

  const { data, error, size, setSize } = useSWRInfinite(getKey, fetcher);

  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");

  const allComments = data ? [].concat(...data) : [];

  const isReachingEnd =
    isLoadingMore || (data && data[data.length - 1]?.length < pageSize);

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
    <div className="space-y-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Comments</h2>
        <Button variant="secondary">Leave a comment</Button>
      </div>
      <div className="divide-y divide-y-border rounded-md border">
        {allComments.map((comment: Comment) => (
          <CommentCard key={comment.id} comment={comment} />
        ))}
      </div>
      {isLoadingMore && (
        <>
          {Array.from({ length: 10 }).map((_, index: number) => (
            <div className="space-y-2" key={index}>
              <Skeleton className="w-2/6 h-8" />
              <Skeleton className="w-5/6 h-6" />
              <Skeleton className="w-4/6 h-6" />
            </div>
          ))}
        </>
      )}
      {isReachingEnd && (
        <p className="text-lg text-muted-foreground text-center">
          All posts have been fetched.
        </p>
      )}
    </div>
  );
}

interface CommentCardProps {
  comment: Comment;
}
function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="w-full px-4 py-6">
      <div className="flex items-center flex-row mb-2 space-x-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src="https://picsum.photos/200" alt={comment.name} />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h5 className="text-base font-bold text-muted-foreground">
            {comment.name.length > 40
              ? comment.name.slice(0, 40)
              : comment.name}
          </h5>
          <p className="text-muted-foreground/70 text-xs lowercase">
            {comment.email}
          </p>
        </div>
      </div>
      <p className="text-muted-foreground text-xs">{comment.body}</p>
    </div>
  );
}

export default PostComments;
