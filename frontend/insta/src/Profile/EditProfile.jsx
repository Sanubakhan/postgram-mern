import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export default function EditProfile() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    bio: "",
    avatarUrl: ""
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchMyProfile() {
      try {
        const res = await axios.get("/profile/me");
        setForm({
          username: res.data.username || "",
          bio: res.data.bio || "",
          avatarUrl: res.data.avatarUrl || ""
        });
        if (res.data.avatarUrl) {
          setAvatarPreview(res.data.avatarUrl);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    }
    fetchMyProfile();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
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
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("username", form.username);
      formData.append("bio", form.bio);

      // If a new avatar file is selected, upload it
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      } else if (form.avatarUrl) {
        // Otherwise use the existing avatarUrl
        formData.append("avatarUrl", form.avatarUrl);
      }

      const response = await axios.put("/profile/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setSuccess("Profile updated successfully!");
      setTimeout(() => {
        navigate(`/userprofile/${form.username}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8 pb-20">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>

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

          {/* Avatar Upload */}
          <div className="flex flex-col gap-4">
            <label className="text-sm font-semibold text-neutral-200">Profile Picture</label>
            
            {/* Avatar Preview */}
            {avatarPreview && (
              <div className="flex justify-center">
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-neutral-600"
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
                className="block w-full px-4 py-2 bg-neutral-900 border-2 border-dashed border-neutral-700 rounded-lg text-center cursor-pointer hover:border-neutral-500 transition text-sm text-neutral-400"
              >
                {avatarFile ? "Change Photo" : "Choose Photo"}
              </label>
            </div>
            <p className="text-xs text-neutral-500">PNG, JPG up to 5MB</p>
          </div>

          {/* Username */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-neutral-200">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-neutral-500 transition"
              required
            />
          </div>

          {/* Bio */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-neutral-200">Bio</label>
            <textarea
              name="bio"
              value={form.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about yourself..."
              className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 text-sm resize-none focus:outline-none focus:border-neutral-500 transition"
            />
            <p className="text-xs text-neutral-500">{form.bio.length}/150</p>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 py-2 rounded-lg bg-neutral-800 text-white font-medium hover:bg-neutral-700 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
