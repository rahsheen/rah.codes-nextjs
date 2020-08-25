import Head from "next/head";
import styles from "../styles/Home.module.css";
import Articles from "../components/articles";
import Query from "../components/query";
import ARTICLES_QUERY from "../apollo/queries/articles";
import { Heading, Box } from "@chakra-ui/core";

export default function Home() {
  return (
    <Box p={[2, 4, 6, 8]}>
      <Head>
        <title>rah.codes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Heading>rah.codes</Heading>
        <Box d="flex" justifyContent="center" alignItems="center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/0eJ7WacNuE8"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Box>
        <Query query={ARTICLES_QUERY}>
          {({ data: { articles } }) => {
            return <Articles articles={articles} />;
          }}
        </Query>
      </Box>
    </Box>
  );
}
