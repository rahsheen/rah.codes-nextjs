import React from "react";
import { AppProps as NextAppProps } from "next/app";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { ApolloProvider, InMemoryCache } from "@apollo/react-hooks";
import withData from "../utils/apollo";
import { ApolloClient } from "@apollo/client";

interface AppProps extends NextAppProps {
  apollo: ApolloClient<InMemoryCache>;
}

const App = ({ Component, pageProps, apollo }: AppProps) => {
  return (
    <ApolloProvider client={apollo}>
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

// Wraps all components in the tree with the data provider
export default withData(App);
