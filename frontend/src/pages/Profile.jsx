import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

function Profile() {

  const [profile, setProfile] =
    useState({
      bio: "",
      headline: "",
      skills: "",
    });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const response =
        await API.get("/profile/me");

      setProfile({
        bio:
          response.data.bio || "",

        headline:
          response.data.headline || "",

        skills:
          response.data.skills
            ?.join(", ") || "",
      });

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      await API.put(
        "/profile/me",
        {
          ...profile,

          skills:
            profile.skills
              .split(",")
              .map((s) => s.trim()),
        }
      );

      alert("Profile Updated");

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div>

      <Navbar />

      <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded shadow">

        <h2 className="text-3xl font-bold mb-6">
          My Profile
        </h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="headline"
            placeholder="Headline"
            value={profile.headline}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4"
          />

          <textarea
            name="bio"
            placeholder="Bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-4 h-32"
          />

          <input
            type="text"
            name="skills"
            placeholder="Skills separated by commas"
            value={profile.skills}
            onChange={handleChange}
            className="w-full border p-3 rounded mb-6"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            {
              loading
              ? "Saving..."
              : "Save Profile"
            }
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;