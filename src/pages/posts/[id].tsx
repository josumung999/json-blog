import AppLayout from "@/components/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Author, Post } from "@/types";
import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";

interface SinglePostProps {
  post: Post;
  author: Author;
}

function SinglePost({ post, author }: SinglePostProps) {
  // Render the post and author information
  return (
    <AppLayout title={post.title} description={post.body.slice(0, 160)}>
      <div className="py-10 space-y-10">
        <Image
          src="https://source.unsplash.com/random"
          alt={post.title}
          width={1080}
          height={720}
          className="rounded-xl aspect-video w-full object-cover hover:opacity-70"
        />
        <div className="flex flex-row items-center justify-start text-muted-foreground space-x-2">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span>
            {` / ${
              post.title.length > 35
                ? post.title.slice(0, 35) + "..."
                : post.title
            }`}
          </span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="space-y-4">
            <div className="flex flex-col items-start justify-start space-y-1">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://picsum.photos/200" alt="@johndoe" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="flex flex-col space-y-2">
                <h3 className="font-medium text-sm text-slate-800">
                  {author.name}
                </h3>
                <p className="inline-flex items-start justify-start space-x-1 font-light text-xs text-muted-foreground">
                  <span>Address:</span>
                  <span className="font-medium">
                    {author.address.suite +
                      ", " +
                      author.address.street +
                      ", " +
                      author.address.city +
                      ", " +
                      author.address.zipcode}
                  </span>
                </p>
                <p className="inline-flex items-start justify-start space-x-1 font-light text-xs text-muted-foreground">
                  <span>Company:</span>
                  <span className="font-medium">
                    {author.company.name + " | " + author.company.catchPhrase}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2">
            <article className="prose lg:prose-xl">
              <h1>{post.title}</h1>
              <p>{post.body}</p>
            </article>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id || typeof params.id !== "string") {
    // If params or id is missing or not a string, return a not found response
    return {
      notFound: true,
    };
  }

  try {
    const postResponse = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    const post: Post = await postResponse.json(); // Wait for JSON data

    // Now you can access post.userId safely
    const authorResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${post.userId}`
    );

    if (!postResponse.ok || !authorResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const author = await authorResponse.json();

    return {
      props: { post, author },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true, // Handle error state if needed
    };
  }
};

// Generate an array of post IDs from 1 to 100
const POST_IDS = Array.from({ length: 100 }, (_, i) => i + 1);

export async function getStaticPaths() {
  return {
    paths: POST_IDS.map((id) => ({ params: { id: id.toString() } })),
    fallback: false, // No fallback for non-existent paths
  };
}

export default SinglePost;
