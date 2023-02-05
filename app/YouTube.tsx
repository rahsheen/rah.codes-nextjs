type Props = {
  channelId: string;
  apiKey?: string;
  revalidate: number;
};

export default async function YouTubeVideo({
  channelId,
  apiKey,
  revalidate,
}: Props) {
  const videosApiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&type=video&key=${apiKey}`;

  if (!apiKey) {
    throw new Error("No Google API key provided!");
  }

  const resp = await fetch(videosApiUrl, {
    next: { revalidate: revalidate ?? 60 },
  });

  if (!resp.ok) throw new Error("Bad response");

  const data = await resp.json();

  const latestVideo = data?.items?.[0];

  return (
    latestVideo && (
      <iframe
        width="560"
        height="315"
        title={latestVideo.snippet.title}
        src={`https://www.youtube.com/embed/${latestVideo.id.videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  );
}
