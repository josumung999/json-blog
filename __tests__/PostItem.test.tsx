import React from "react";
import { render, screen } from "@testing-library/react";
import { PostItem } from "@/components/post-item";
import { Post } from "@/types";
import "@testing-library/jest-dom";

describe("PostItem component", () => {
  const mockPost: Post = {
    id: 1,
    userId: 1,
    title: "Test Post Title",
    body: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe perspiciatis, nostrum optio hic dolor laboriosam culpa, repudiandae recusandae maxime quas molestiae placeat, aperiam possimus repellendus repellat ipsa nam aut sed!",
  };

  it("renders post title", () => {
    render(<PostItem post={mockPost} />);
    const postTitleElement = screen.getByText("Test Post Title");
    expect(postTitleElement).toBeInTheDocument();
  });

  it("renders post title with ellipsis if longer than 35 characters", () => {
    const longTitlePost = {
      ...mockPost,
      title: "This is a very long post title that exceeds 35 characters limit",
    };
    render(<PostItem post={longTitlePost} />);
    const postTitleElement = screen.getByText(
      "This is a very long post title that..."
    );
    expect(postTitleElement).toBeInTheDocument();
  });
});
