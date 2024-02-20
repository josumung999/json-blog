import { CreatePostForm } from "@/components/forms/create-post-form";
import AppLayout from "@/components/layout";
import { PostItem } from "@/components/post-item";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/utils";
import { Post } from "@/types";
import Image from "next/image";
import useSWR from "swr";

export default function Home() {
  const { data, isLoading, error } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher
  );

  return (
    <AppLayout>
      <div className="py-10 w-full space-y-6">
        <div className="flex items-center justify-between">
          <h1>Trending Now</h1>
          <CreatePostForm />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6">
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, index: number) => (
                <PostItem.Skeleton key={index} />
              ))}
            </>
          ) : data?.length > 0 ? (
            <>
              {data?.map((post: Post) => (
                <PostItem post={post} key={post.id} />
              ))}
            </>
          ) : null}
        </div>
      </div>
    </AppLayout>
  );
}
