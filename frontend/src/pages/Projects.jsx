import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

function Projects() {

  const [projects, setProjects] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      technologies: "",
      githubLink: "",
    });

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const response =
        await API.get("/projects");

      setProjects(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/projects",
        {
          ...formData,

          technologies:
            formData.technologies
              .split(",")
              .map((t) => t.trim()),
        }
      );

      setFormData({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
      });

      fetchProjects();

    } catch (error) {

      alert(
        error.response?.data?.message
      );
    }
  };

  return (

    <div>

      <Navbar />

      <div className="max-w-5xl mx-auto mt-10">

        <div className="bg-white p-6 rounded shadow mb-10">

          <h2 className="text-3xl font-bold mb-6">
            Add Project
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="text"
              name="technologies"
              placeholder="React, Node.js, MongoDB"
              value={formData.technologies}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="text"
              name="githubLink"
              placeholder="GitHub Link"
              value={formData.githubLink}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-6"
            />

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded"
            >
              Add Project
            </button>

          </form>

        </div>

        <div className="grid gap-6">

          {
            projects.map((project) => (

              <div
                key={project._id}
                className="bg-white p-6 rounded shadow"
              >

                <h3 className="text-2xl font-bold">
                  {project.title}
                </h3>

                <p className="mt-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">

                  {
                    project.technologies?.map(
                      (tech, index) => (

                        <span
                          key={index}
                          className="bg-blue-100 text-blue-700 px-3 py-1 rounded"
                        >
                          {tech}
                        </span>
                      )
                    )
                  }

                </div>

                <a
                  href={project.githubLink}
                  target="_blank"
                  className="inline-block mt-4 text-blue-600"
                >
                  GitHub Repository
                </a>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Projects;