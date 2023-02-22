"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ErrorPage from "next/error";
import Head from "next/head";

import { Flex } from "@chakra-ui/react";

import { remarkCodeHike } from "@code-hike/mdx";
import { getMDXComponent } from "mdx-bundler/client";
import { bundleMDX } from "mdx-bundler";

import { getPostAndMorePosts, getAllPostsForHome } from "../lib/api";

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
    <div>
      {router.isFallback ? (
        <h2>Loading…</h2>
      ) : (
        <>
          <article>
            <Head>
              <title>{post.title}</title>
              <meta property="og:image" content={post?.ogImage?.url} />
            </Head>
            {preview ? (
              <Flex
                width="100%"
                justifyContent="center"
                backgroundColor="purple"
                color="white"
                fontWeight="bold"
              >
                Preview Mode
                <Link href="/api/exit-preview">(turn off)</Link>
              </Flex>
            ) : null}
            <MDXComponent code={previewSource} />
          </article>
        </>
      )}
    </div>
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
