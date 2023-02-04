import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  HStack,
  Tag,
  SpaceProps,
} from "@chakra-ui/react";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

export const BlogItem = ({ post }: { post: any }) => {
  const coverImage = post.coverImage?.data?.attributes;
  return (
    <Box>
      <Box borderRadius="lg" overflow="hidden">
        <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
          {coverImage?.url ? (
            <Image
              transform="scale(1.0)"
              src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${coverImage?.url}`}
              alt="some text"
              objectFit="contain"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          ) : (
            <p>No image</p>
          )}
        </Link>
      </Box>
      <BlogTags tags={["Engineering", "Product"]} marginTop="3" />
      <Heading fontSize="xl" marginTop="2">
        <Link
          href={`/${encodeURIComponent(post.slug)}`}
          textDecoration="none"
          _hover={{ textDecoration: "none" }}
        >
          {post.title}
        </Link>
      </Heading>
      <Text as="p" fontSize="md" marginTop="2">
        {post.description}
      </Text>
      {/** <BlogAuthor name="John Doe" date={new Date("2021-04-06T19:01:27Z")} /> **/}
    </Box>
  );
};
