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
    const authorResponse = await fetch(
      `https://jsonplaceholder.typicode.com/users/${postResponse.json()}`
    );

    if (!postResponse.ok || !authorResponse.ok) {
      throw new Error("Failed to fetch data");
    }

    const post = await postResponse.json();
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

async function getPostsPaginated(page = 1) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  );
  const posts = await response.json();
  return posts;
}

export async function getStaticPaths() {
  const pageSize = 10; // Adjust based on API and needs
  const pageCount = Math.ceil(100 / pageSize); // Approximate based on known total posts (100)

  const paths = [];
  for (let page = 1; page <= pageCount; page++) {
    const posts = await getPostsPaginated(page);
    paths.push(
      ...posts.map((post: Post) => ({ params: { id: post.id.toString() } }))
    );
  }

  return { paths, fallback: false }; // No fallback for non-existent paths
}

export default SinglePost;
