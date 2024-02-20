import { fetcher } from "@/lib/utils";
import React, { useState } from "react";
import useSWR from "swr";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { Comment } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface PostCommentsProps {
  postId: number;
  pageSize?: number;
}

function PostComments({ postId, pageSize = 10 }: PostCommentsProps) {
  const [pageNumber, setPageNumber] = useState(1);
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/posts/${postId}/comments?_page=${pageNumber}&_limit=${pageSize}`,
    fetcher
  );
  const totalPages = Math.ceil(data?.length / pageSize) || 0;

  const handlePageChange = (pageNumber: React.SetStateAction<number>) => {
    setPageNumber(pageNumber);
  };

  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-row items-center justify-between">
        <h2 className="text-xl font-bold">Comments</h2>
        <Button variant="secondary">Leave a comment</Button>
      </div>
      {isLoading ? (
        <>
          {Array.from({ length: 5 }).map((_, index: number) => (
            <div className="space-y-2" key={index}>
              <Skeleton className="w-2/6 h-8" />
              <Skeleton className="w-5/6 h-6" />
              <Skeleton className="w-4/6 h-6" />
            </div>
          ))}
        </>
      ) : data?.length > 0 ? (
        <div className="divide-y divide-y-border rounded-md border">
          {data?.map((comment: Comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : null}
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
