import { useEffect, useState } from "react";

import Loader from "../components/Loader";

import API from "../api/axios";

import {
  FaProjectDiagram,
  FaCertificate,
  FaTrophy,
  FaCheckCircle,
} from "react-icons/fa";


function Dashboard() {

  const [stats, setStats] = useState(null);

  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchDashboard = async () => {

      try {

        const response = await API.get(
          "/dashboard/stats"
        );

        setStats(response.data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchDashboard();

  }, []);


  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };


  if (loading) {
    return (
      <div className="p-10">
        <Loader />
      </div>
    );
  }


  return (

    <div className="min-h-screen bg-gray-100 p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">

        <h1 className="text-4xl font-bold">
          Dashboard
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>

      </div>


      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* PROJECTS */}
        <div className="bg-white p-6 rounded shadow flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Projects
            </h2>

            <p className="text-3xl mt-4">
              {stats?.totalProjects || 0}
            </p>

          </div>

          <FaProjectDiagram
            className="text-5xl text-blue-500"
          />

        </div>


        {/* CERTIFICATIONS */}
        <div className="bg-white p-6 rounded shadow flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Certifications
            </h2>

            <p className="text-3xl mt-4">
              {stats?.totalCertifications || 0}
            </p>

          </div>

          <FaCertificate
            className="text-5xl text-green-500"
          />

        </div>


        {/* ACHIEVEMENTS */}
        <div className="bg-white p-6 rounded shadow flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Achievements
            </h2>

            <p className="text-3xl mt-4">
              {stats?.totalAchievements || 0}
            </p>

          </div>

          <FaTrophy
            className="text-5xl text-yellow-500"
          />

        </div>


        {/* VERIFICATIONS */}
        <div className="bg-white p-6 rounded shadow flex items-center justify-between">

          <div>

            <h2 className="text-xl font-bold">
              Verifications
            </h2>

            <p className="text-3xl mt-4">
              {stats?.totalVerifications || 0}
            </p>

          </div>

          <FaCheckCircle
            className="text-5xl text-purple-500"
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;