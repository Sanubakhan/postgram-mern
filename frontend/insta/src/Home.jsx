import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "./footer";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export default function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => {
    async function fetchFeed() {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
        
        // Load liked posts from localStorage
        const savedLikes = localStorage.getItem("likedPosts");
        if (savedLikes) {
          setLikedPosts(new Set(JSON.parse(savedLikes)));
        }
      } catch (err) {
        console.error("Feed error:", err);
      }
    }
    fetchFeed();
    
    // Refetch when page becomes visible (user comes back from another page)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchFeed();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  function handleLike(postId) {
    setLikedPosts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(postId)) {
        newLiked.delete(postId);
      } else {
        newLiked.add(postId);
      }
      
      // Save to localStorage
      localStorage.setItem("likedPosts", JSON.stringify(Array.from(newLiked)));
      
      return newLiked;
    });
    
    // Call backend to persist like
    axios.post(`/posts/${postId}/like`, {}).catch(err => {
      console.error("Like error:", err);
    });
  }

  const avatarSymbols = ["🌟", "🎨", "🚀", "🎭", "🎪", "🎯", "🎸", "🎮", "🎲", "🎰", "🔮", "💎", "🌈", "⚡", "🔥", "✨", "🌺", "🦋", "🐉", "🦄"];

  const getSymbolForUsername = (username) => {
    // Simple hash function to get consistent index for username
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarSymbols[Math.abs(hash) % avatarSymbols.length];
  };

  return (
    <div className="min-h-screen bg-black text-white pb-16">

      {/* TOP BAR */}
      <div className=" top-0 z-40 bg-black border-b border-neutral-800 px-4 py-3">
        <h1 className="text-2xl font-extrabold tracking-wide text-center">
          Postgram
        </h1>
      </div>

      {/* FEED */}
      <div className="max-w-md mx-auto">
        {posts.map((post) => (
          <div key={post._id} className="border-b border-neutral-800">

            {/* USER */}
            <div
              className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-neutral-900 transition"
              onClick={() => {
                if (post.userId?.username) {
                  navigate(`/profile/${post.userId.username}`);
                }
              }}
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xl">
                {getSymbolForUsername(post.userId?.username || "User")}
              </div>
              <p className="text-sm font-semibold">
                {post.userId?.username || "Unknown User"}
              </p>
            </div>

            {/* IMAGE */}
            <img
              src={post.imageUrl}
              alt="post"
              className="w-full aspect-square object-cover bg-neutral-900"
            />

            {/* LIKE BUTTON */}
            <div className="px-4 py-2">
              <button
                onClick={() => handleLike(post._id)}
                className="text-2xl transition hover:opacity-70"
              >
                {likedPosts.has(post._id) ? "❤️" : "🤍"}
              </button>
              {post.likesCount > 0 && (
                <p className="text-sm font-semibold mt-1">
                  {post.likesCount} like{post.likesCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            {/* CAPTION */}
            {post.caption && (
              <p className="px-4 py-3 text-sm">
                <span className="font-semibold mr-2">
                  {post.userId.username}
                </span>
                {post.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}
