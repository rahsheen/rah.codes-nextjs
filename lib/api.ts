import qs from "qs";

export async function getPreviewPostBySlug(slug: string) {
  const query = qs.stringify(
    {
      publicationState: "preview",
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(`${process.env.STRAPI_API_URL}/api/posts?${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const { data } = await res.json();

  return data[0].attributes;
}

export async function getPostAndMorePosts(slug: string, preview = false) {
  const query = qs.stringify(
    {
      publicationState: preview ? "preview" : "live",
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: "*",
    },
    {
      encodeValuesOnly: true,
    }
  );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/posts?${query}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch post");
  }

  const { data } = await res.json();

  return data[0].attributes;
}

export async function getAllPostsForHome() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/posts?populate=%2A`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error(
      `Failed to fetch posts ${res.status} ${res.statusText} ${process.env.NEXT_PUBLIC_STRAPI_API_URL} ${process.env.STRAPI_API_TOKEN}`
    );
  }

  const resJson = await res.json();
  return resJson?.data;
}
