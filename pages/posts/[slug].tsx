import React, { useMemo } from "react";
import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "@/components/container";
import MoreStories from "@/components/more-stories";
import Header from "@/components/header";
import PostHeader from "@/components/post-header";
import SectionSeparator from "@/components/section-separator";
import Layout from "@/components/layout";
import { getAllPostsForHome, getPostAndMorePosts } from "@/lib/api";
import PostTitle from "@/components/post-title";
import Head from "next/head";
import { CMS_NAME } from "@/lib/constants";

import { remarkCodeHike } from "@code-hike/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";

function MDXComponent({ code }: { code: string }) {
  const Component = useMemo(
    () => getMDXComponent(code, { react: React }),
    [code]
  );
  return <Component />;
}

export default function Post({
  previewSource,
  post,
  morePosts,
  preview,
}: {
  previewSource: string;
  post: any;
  morePosts: any;
  preview: boolean;
}) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>{post.title}</title>
                <meta property="og:image" content={post?.ogImage?.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post?.coverImage?.data?.attributes}
                date={post.date}
                author={post.author}
              />
              <MDXComponent code={previewSource} />
            </article>
            <SectionSeparator />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </Container>
    </Layout>
  );
}

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: { slug: string };
  preview?: boolean;
}) {
  const data = await getPostAndMorePosts(params.slug, preview);

  const loadedTheme = await import(`shiki/themes/monokai.json`).then(
    (module) => module.default
  );

  const previewSource = await bundleMDX({
    source: data?.content,
    esbuildOptions(options) {
      options.platform = "node";
      return options;
    },
    xdmOptions(options) {
      options.remarkPlugins = [[remarkCodeHike, { theme: loadedTheme }]];
      return options;
    },
  });

  return {
    props: {
      preview,
      previewSource: previewSource.code,
      post: {
        ...data,
      },
      morePosts: data?.morePosts || [],
    },
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsForHome().catch(console.error);

  return {
    paths:
      allPosts?.data?.map((post: any) => `/posts/${post.attributes.slug}`) ||
      [],
    fallback: true,
  };
}
