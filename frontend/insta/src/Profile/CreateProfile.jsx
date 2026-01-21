import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// axios config
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export default function CreateProfile() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    bio: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  }

  function handleAvatarChange(e) {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please select an image file");
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB");
        return;
      }

      setAvatarFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError("");
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      // Use FormData for file upload
      const data = new FormData();
      data.append("username", formData.username);
      data.append("bio", formData.bio);
      if (avatarFile) data.append("avatar", avatarFile);

      const res = await axios.post("/profile/createprofile", data);

      setSuccess("Profile created successfully!");

      const profileUsername = res?.data?.profile?.username || formData.username;
      navigate(`/userprofile/${profileUsername}`);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to create profile"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 py-8 pb-20">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="absolute left-4 top-4 flex items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-neutral-900 border border-neutral-700 rounded-lg hover:border-neutral-500 transition"
        aria-label="Go back"
      >
        <span>{"<"}</span>
        <span>Back</span>
      </button>

      <div className="w-full max-w-md">

        <h1 className="text-3xl font-bold text-center mb-2">
          Create Profile
        </h1>
        <p className="text-center text-neutral-400 text-sm mb-8">
          Set up your profile to get started
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-300 px-4 py-3 rounded-lg mb-6 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Avatar Upload Section */}
          <div className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-neutral-200">
              Profile Picture
            </label>

            {/* Avatar Preview */}
            {avatarPreview && (
              <div className="flex justify-center">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-28 h-28 rounded-full object-cover border-2 border-neutral-600"
                />
              </div>
            )}

            {/* File Input */}
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
                id="avatar-input"
              />
              <label
                htmlFor="avatar-input"
                className="block w-full px-4 py-3 bg-neutral-900 border-2 border-dashed border-neutral-700 rounded-lg text-center cursor-pointer hover:border-neutral-500 transition text-sm text-neutral-400 font-medium"
              >
                {avatarFile ? "✓ Photo Selected" : "📷 Choose Photo"}
              </label>
            </div>
            <p className="text-xs text-neutral-500 text-center">
              PNG, JPG, GIF up to 5MB
            </p>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-neutral-200">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-sm focus:outline-none focus:border-neutral-500 transition"
              required
            />
            <p className="text-xs text-neutral-500">
              {formData.username.length}/30 characters
            </p>
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-neutral-200">
              Bio
            </label>
            <textarea
              name="bio"
              placeholder="Tell us about yourself..."
              value={formData.bio}
              onChange={handleChange}
              className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-sm resize-none focus:outline-none focus:border-neutral-500 transition"
              rows="4"
            />
            <p className="text-xs text-neutral-500">
              {formData.bio.length}/150 characters
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !formData.username}
            className="w-full py-3 bg-blue-500 rounded-lg text-sm font-semibold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition mt-2"
          >
            {loading ? "Creating Profile..." : "Create Profile"}
          </button>
        </form>

        {/* Already have account */}
        <p className="text-center text-neutral-400 text-sm mt-6">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-400 hover:underline font-semibold"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
