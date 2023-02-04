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

  return res.json();
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

export async function getLatestVideos() {
  const channelId = "UCy3jFrt6CwE0W072c7MVcEg";
  const apiKey = process.env.GOOGLE_API_KEY;
  const videosApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${apiKey}`;

  if (!apiKey) {
    throw new Error("No API key provided for YouTube API");
  }

  const resp = await fetch(videosApiUrl);
  const data = await resp.json();

  return data;
}
