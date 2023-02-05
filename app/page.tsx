import { getAllPostsForHome } from "../lib/api";
import LatestVideo from "../app/YouTube";
import { CallToActionWithVideo } from "../components/hero";
import { BlogPosts } from "../components/blog-posts";

const Home = async () => {
  // const [showMenu, toggleShowMenu] = useState(false);

  const allPosts = await getAllPostsForHome().catch((e) =>
    console.error("Strapi Error", e)
  );
  //const heroPost = allPosts?.[0]?.attributes;
  //const morePosts = allPosts?.slice(1);

  /**
  const toggleMenu = () => {
    toggleShowMenu((prev) => !prev);
  };
  **/

  return (
    <>
      <CallToActionWithVideo>
        <LatestVideo
          apiKey={process.env.GOOGLE_API_KEY}
          channelId={"UCy3jFrt6CwE0W072c7MVcEg"}
        />
      </CallToActionWithVideo>
      <BlogPosts posts={allPosts} />
    </>
  );
};

export default Home;
