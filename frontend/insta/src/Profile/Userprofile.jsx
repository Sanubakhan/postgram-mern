import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Footer from "../footer";

// axios config (IMPORTANT)
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export default function ProfilePage() {
    const navigate = useNavigate();
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfilePage() {
      try {
        // 1️⃣ GET PROFILE INFO (TOP SECTION)
        const profileRes = await axios.get(`/profile/${username}`);
        setProfile(profileRes.data);

        // 2️⃣ GET POSTS GRID (BOTTOM SECTION)
        const postsRes = await axios.get(
          `/posts/user/${profileRes.data.userId}`
        );
        setPosts(postsRes.data);

      } catch (error) {
        console.error("Profile page error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfilePage();
  }, [username]);

  if (loading) {
    return (
      <>
        <div className="min-h-screen bg-black text-white flex items-center justify-center pb-20">
          Loading profile...
        </div>
        <Footer />
      </>
    );
  }

  if (!profile) {
  return (
    <>
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-4 px-4 pb-20">
        <p className="text-lg font-semibold">Profile not found</p>
        <p className="text-sm text-neutral-400 text-center">
          This user hasn’t created a profile yet.
        </p>

        <button
          onClick={() => navigate("/create-profile")}
          className="mt-2 px-6 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition"
        >
          Create Profile
        </button>
      </div>
      <Footer />
    </>
  );
}


  return (
    <>
    <div className="min-h-screen bg-black text-white">

      {/* ===== TOP PROFILE SECTION ===== */}
      <div className="px-4 pt-6">
        <div className="flex items-center gap-6">

          {/* Avatar */}
          <img
            src={profile.avatarUrl || "/default-avatar.png"}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover bg-neutral-800"
          />

          {/* Stats */}
          <div className="flex flex-1 justify-between text-center">
            <Stat label="Posts" value={posts.length} />
            <Stat label="Followers" value={profile.followersCount} />
            <Stat label="Following" value={profile.followingCount} />
          </div>
        </div>

        {/* Username + Bio */}
        <div className="mt-4">
          <p className="font-semibold text-sm">{profile.username}</p>
          <p className="text-sm text-neutral-300 mt-1">
            {profile.bio || "No bio yet"}
          </p>
        </div>

        {/* Button */}
       <button
  onClick={() => navigate(`/userprofile/${profile.username}/edit`)}
  className="w-full mt-4 py-1.5 rounded-md border border-neutral-700 text-sm"
>
  Edit Profile
</button>

      </div>

      {/* ===== TABS ===== */}
      <div className="flex justify-around border-t border-neutral-800 mt-6">
        <Tab active label="▦" />
       
      </div>

      {/* ===== POSTS GRID ===== */}
      <div className="grid grid-cols-3 gap-[2px] mt-1 ">
      {/* Create Post Bar */}
{/* Create Post Button (centered & small) */}
<div className="col-span-3 flex justify-center mt-10 mb-6">
  <button
    onClick={() => navigate("/create-post")}
    className="px-6 py-2 bg-neutral-900 text-white text-sm rounded-md border border-neutral-800 hover:bg-neutral-800 transition"
  >
    Create New Post
  </button>
</div>

        {posts.length === 0 ? (
          <p className="col-span-3 text-center text-neutral-500 py-10">
            No posts yet
          </p>
        ) : (
          posts.map(post => (
            <img
              key={post._id}
              src={post.imageUrl}
              alt="post"
              className="aspect-square object-cover bg-neutral-900 cursor-pointer hover:opacity-80 transition"
              onClick={() => setSelectedPost(post)}
            />
          ))
        )}
      </div>

      {/* POST MODAL */}
      {selectedPost && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="bg-neutral-900 rounded-lg max-w-md w-full max-h-96 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <div className="sticky top-0 flex justify-between items-center p-4 bg-neutral-900 border-b border-neutral-700">
              <h2 className="text-lg font-semibold">Post</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-neutral-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            {/* Post Content */}
            <div className="p-4 space-y-4">
              {/* Image */}
              <img
                src={selectedPost.imageUrl}
                alt="post"
                className="w-full rounded-lg"
              />

              {/* Caption */}
              {selectedPost.caption && (
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{selectedPost.userId?.username}</span>
                    <span className="text-neutral-300 ml-2">{selectedPost.caption}</span>
                  </p>
                </div>
              )}

              {/* Likes */}
              {selectedPost.likesCount > 0 && (
                <p className="text-sm font-semibold">
                  {selectedPost.likesCount} like{selectedPost.likesCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
    <Footer />
    </>
  );
}

/* ===== SMALL COMPONENTS ===== */

function Stat({ label, value }) {
  return (
    <div>
      <p className="font-semibold">{value}</p>
      <p className="text-xs text-neutral-400">{label}</p>
    </div>
  );
}

function Tab({ label, active }) {
  return (
    <div
      className={`py-3 text-xl ${
        active ? "border-t border-white" : "text-neutral-500"
      }`}
    >
      {label}
    </div>
  );
}
