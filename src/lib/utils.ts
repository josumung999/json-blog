import { Post } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDate(input: any): string {
  const date = new Date(input)
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}


export const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export function storeAndAddPost(newPost: Post) {
  // Check if window object is accessible
  if (typeof window !== 'undefined') {
    try {
      // Retrieve existing posts or initialize an empty array
      const storedPosts = JSON.parse(localStorage.getItem('posts') as string) || [];

      // Add the new post to the array
      storedPosts.push(newPost);

      // Stringify the updated array and store it in localStorage
      localStorage.setItem('posts', JSON.stringify(storedPosts));
    } catch (error) {
      console.error('Error storing posts in localStorage:', error);
      // Handle storage errors gracefully (e.g., display a message)
    }
  } else {
    console.warn('Unable to access localStorage: window object unavailable');
    // Handle the case where window is not available (e.g., server-side rendering)
  }
}