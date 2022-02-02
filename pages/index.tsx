import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import HeroPost from "@/components/hero-post";
import Intro from "@/components/intro";
import Layout from "@/components/layout";
import { getAllPostsForHome } from "@/lib/api";
import Head from "next/head";
import { SITE_NAME } from "@/lib/constants";
import { getLatestVideos } from "../lib/api";

export default function Index({ allPosts, preview, latestVideos }) {
  const heroPost = allPosts[0]?.attributes;
  const morePosts = allPosts.slice(1);
  const firstVideo = latestVideos[0];

  return (
    <>
      <Layout preview={preview}>
        <Head>
          <title>{SITE_NAME}</title>
        </Head>
        <Container>
          <Intro />

          <section className="mb-8 md:mb-16 flex flex-wrap justify-center">
            {firstVideo && (
              <iframe
                width="560"
                height="315"
                title={firstVideo.snippet.title}
                src={`https://www.youtube.com/embed/${firstVideo.id.videoId}`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}

            {heroPost && (
              <HeroPost
                title={heroPost.title}
                coverImage={heroPost.coverImage}
                date={heroPost.createdAt}
                author={heroPost?.author}
                slug={heroPost.slug}
                excerpt={heroPost?.description}
              />
            )}
          </section>
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = null }) {
  const allPosts = await getAllPostsForHome(preview).catch(console.error);
  const videoData = await getLatestVideos().catch(console.error);

  return {
    props: {
      allPosts: allPosts?.data || [],
      preview,
      latestVideos: videoData?.items || [],
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 86400, // In seconds,
  };
}
