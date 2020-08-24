import Head from "next/head";
import styles from "../styles/Home.module.css";
import Articles from "../components/articles";
import Query from "../components/query";
import ARTICLES_QUERY from "../apollo/queries/articles";
import { Heading, Box } from "@chakra-ui/core";

export default function Home() {
  return (
    <Box p={[2,4,6,8]}>
      <Head>
        <title>rah.codes</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Heading>rah.codes</Heading>
        <Query query={ARTICLES_QUERY}>
          {({ data: { articles } }) => {
            return <Articles articles={articles} />;
          }}
        </Query>
      </Box>
    </Box>
  );
}
