import React from "react";
import { Stack, Box, Heading, Text } from "@chakra-ui/core";
import Link from "next/link";

function Feature({ article }) {
  const { desc, title, image, ...rest } = article;

  const imageUrl =
    process.env.NODE_ENV !== "development"
      ? image.url
      : process.env.API_URL + article.image.url;

  return (
    <Link href={{ pathname: "article", query: { id: article.id } }}>
      <Box p={5} shadow="md" borderWidth="1px" {...rest}>
        <Heading fontSize="xl">{title}</Heading>
        <Text mt={4}>{desc}</Text>
        <img src={imageUrl} alt={article.image.url} height="100" />
      </Box>
    </Link>
  );
}

const Articles = ({ articles }) => {
  const leftArticlesCount = Math.ceil(articles.length / 5);
  const leftArticles = articles.slice(0, leftArticlesCount);
  const rightArticles = articles.slice(leftArticlesCount, articles.length);

  return (
    <div>
      <div className="uk-child-width-1-2" data-uk-grid>
        <div>
          {leftArticles.map((article, i) => {
            return <Feature article={article} key={`article__${article.id}`} />;
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {rightArticles.map((article, i) => {
              return (
                <Feature article={article} key={`article__${article.id}`} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Articles;
