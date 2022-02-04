import type { AppProps /*, AppContext */ } from "next/app";
import "@/styles/index.css";
import "@code-hike/mdx/dist/index.css";
import "@code-hike/mini-browser/dist/index.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
