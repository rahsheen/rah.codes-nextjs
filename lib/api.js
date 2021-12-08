async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`${process.env.STRAPI_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
  query PostBySlug($where: JSON) {
    posts(where: $where) {
      slug
    }
  }
  `,
    {
      variables: {
        where: {
          slug,
        },
      },
    }
  );
  return data?.posts[0];
}

export async function getAllPostsWithSlug() {
  const data = fetchAPI(`
    {
      posts {
        slug
      }
    }
  `);
  return data?.allPosts;
}

export async function getAllPostsForHome(preview) {
  const res = await fetch(`${process.env.STRAPI_URL}/api/posts?populate=%2A`, {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch posts ${res.status} ${res.statusText}`);
  }

  return res.json();
}

export async function getPostAndMorePosts(slug, preview) {
  const res = await fetch(
    `${process.env.STRAPI_URL}/api/posts?populate=%2A&slug=${slug}`,
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
