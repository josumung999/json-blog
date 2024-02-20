import { Post } from "@/types";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

interface PostItemProps {
  post: Post;
}

export function PostItem({ post }: PostItemProps) {
  const { data, error, isLoading } = useSWR(
    `https://jsonplaceholder.typicode.com/users/${post.userId}`,
    fetcher
  );

  return (
    <Card className="group w-full bg-transparent border-none shadow-none">
      <CardHeader className="px-0 pt-0 pb-3">
        <Link
          href={"/posts/" + post.id}
          className="relative w-full aspect-video rounded-t-xl overflow-hidden"
        >
          <Image
            src="https://source.unsplash.com/random"
            width={720}
            height={480}
            alt=""
            className="w-full object-cover rounded-t-xl group-hover:opacity-50"
          />

          <div className="absolute bottom-[8%] left-[6%] flex items-center justify-start space-x-1">
            {isLoading ? (
              <Skeleton className="w-20 h-8" />
            ) : data ? (
              <>
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://picsum.photos/200" alt="@johndoe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h3 className="font-normal text-xs text-white">{data.name}</h3>
              </>
            ) : null}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="px-2 space-y-2">
        <Link
          href={"/posts/" + post.id}
          className="group-hover:underline text-sm lg:text-base font-semibold text-prime"
        >
          {post.title.length > 35
            ? post.title.slice(0, 35) + "..."
            : post.title}
        </Link>
      </CardContent>
    </Card>
  );
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="w-full">
      <div className="space-y-3">
        <Skeleton className="aspect-video w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
