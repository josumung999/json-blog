import AppLayout from "@/components/layout";
import { Author, Post } from "@/types";
import { GetStaticProps } from "next";

interface SinglePostProps {
  post: Post;
  author: Author;
}

function SinglePost({ post, author }: SinglePostProps) {
  // Render the post and author information
  return (
    <AppLayout title={post.title} description={post.body.slice(0, 160)}>
      <div className="py-10">
        <h1>{post.title}</h1>
        <p>By {author.name}</p>
        {/* ... other content */}
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
