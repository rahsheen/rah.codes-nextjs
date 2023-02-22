"use client";

import { BlogItem } from "../components/blog-item";
import { SimpleGrid } from "@chakra-ui/react";
import { ApiPostPost } from "../schemas";

export const BlogPosts = ({ posts }: { posts: ApiPostPost[] }) => {
  return posts?.length ? (
    <SimpleGrid minChildWidth="120px" spacing="4vmin">
      {posts.map(({ attributes }) => {
        return <BlogItem key={attributes.slug} post={attributes} />;
      })}
    </SimpleGrid>
  ) : (
    <h2>This Blog Sucks!</h2>
  );
};
