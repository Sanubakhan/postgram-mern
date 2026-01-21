import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export default function Createpost() {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("/posts", {
        imageUrl,
        caption
      });

      navigate(-1); // go back to profile
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-35">
        {/* Top Header */}
<div className="fixed top-8 left-0 right-0 z-50 bg-black border-b border-neutral-800">
  <div className="max-w-md mx-auto flex items-center justify-between px-4 py-3">
    
    {/* Back Button */}
    <button
      onClick={() => navigate(-1)}
      className="text-white text-3xl font-bold hover:text-gray-200 transition cursor-pointer"
    >
      ←
    </button>

    {/* Instagram Title */}
    <h1 className="text-3xl  font-extrabold tracking-wide">
      Postgram
    </h1>

    {/* Spacer (to keep title centered) */}
    <div className="w-6"></div>
  </div>
</div>

      <div className="max-w-md mx-auto">

        <h1 className="text-xl font-bold mb-6">Create Post</h1>

        {error && (
          <div className="bg-red-500/20 text-red-300 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Image Upload */}
          <div className="border-2 border-dashed border-neutral-700 rounded-lg p-6 text-center hover:border-neutral-500 transition cursor-pointer">
            <label className="cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                required={!imageUrl}
              />
              <div className="text-center">
                <svg
                  className="w-10 h-10 mx-auto mb-2 text-neutral-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="text-sm text-neutral-400">
                  Click to upload an image
                </p>
              </div>
            </label>
          </div>

          {/* Image URL Input */}
          <div>
            <label className="text-xs text-neutral-400 mb-1 block">
              Or paste image URL
            </label>
            <input
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm"
            />
          </div>

          {/* Preview */}
          {imageUrl && (
            <div className="relative">
              <img
                src={imageUrl}
                alt="preview"
                className="w-full aspect-square object-cover rounded"
              />
              <button
                type="button"
                onClick={() => {
                  setImageUrl("");
                  setImageFile(null);
                }}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}

          {/* Caption */}
          <textarea
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={3}
            className="w-full bg-neutral-900 border border-neutral-700 rounded px-3 py-2 text-sm resize-none"
          />

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-2 bg-neutral-800 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-blue-500 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
