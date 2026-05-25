import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import API from "../api/axios";

function PublicProfile() {

  const { username } =
    useParams();

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProfile();

  }, [username]);

  const fetchProfile = async () => {

    try {

      const response =
        await API.get(
          `/profile/public/${username}`
        );

      setProfile(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="p-10">
        Profile not found
      </div>
    );
  }

  return (

    <div className="min-h-screen bg-gray-100">

      <div className="max-w-5xl mx-auto p-10">

        <div className="bg-white rounded shadow p-8">

          <h1 className="text-4xl font-bold">
            {profile.user.name}
          </h1>

          <p className="text-gray-500 mt-2">
            @{profile.user.username}
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Headline
          </h2>

          <p className="mt-2">
            {profile.headline}
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Bio
          </h2>

          <p className="mt-2">
            {profile.bio}
          </p>

          <h2 className="text-2xl font-semibold mt-8">
            Skills
          </h2>

          <div className="flex flex-wrap gap-3 mt-4">

            {
              profile.skills?.map(
                (skill, index) => (

                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-4 py-2 rounded"
                  >
                    {skill}
                  </span>
                )
              )
            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default PublicProfile;