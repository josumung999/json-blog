import { Post } from "@/types";
import Link from "next/link";
import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

interface PostItemProps {
  post: Post;
}

function PostItem({ post }: PostItemProps) {
  return (
    <Card className="w-full bg-transparent border-none shadow-none">
      <CardHeader className="px-0 pt-0 pb-3">
        <Link
          href={"/posts" + post.id}
          className="relative w-full aspect-video rounded-t-xl overflow-hidden"
        >
          <Image
            src="https://source.unsplash.com/random"
            width={720}
            height={480}
            alt=""
            className="w-full object-cover rounded-t-xl"
          />
          <Badge
            variant="default"
            className="bg-lighter text-prime absolute top-[8%] left-[6%] text-[10px] hover:text-lighter hover:bg-prime px-0.5"
          >
            Architecture
          </Badge>
          <Badge
            variant="default"
            className="bg-lighter text-prime absolute top-[8%] right-[6%] text-[10px] px-0.5 hover:text-lighter hover:bg-prime"
          >
            <svg
              className="w-2.5 h-2.5 lucide lucide-heart"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
          </Badge>

          <div className="absolute bottom-[8%] left-[6%] flex items-center justify-start space-x-1">
            <Avatar className="w-6 h-6">
              <AvatarImage src="https://picsum.photos/200" alt="@johndoe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h3 className="font-normal text-xs text-white">Acme Corps</h3>
          </div>
        </Link>
      </CardHeader>
      <CardContent className="px-2 space-y-2">
        <h2 className="text-sm lg:text-base font-semibold text-prime">
          {post.title}
        </h2>
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
