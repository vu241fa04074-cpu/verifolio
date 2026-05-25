import {
  useEffect,
  useState,
} from "react";

import API from "../api/axios";

import Navbar from "../components/Navbar";

function Certifications() {

  const [certifications, setCertifications] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      issuer: "",
      issueDate: "",
    });

  const [file, setFile] =
    useState(null);

  useEffect(() => {

    fetchCertifications();

  }, []);

  const fetchCertifications = async () => {

    try {

      const response =
        await API.get("/certifications");

      setCertifications(response.data);

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

      const data = new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "issuer",
        formData.issuer
      );

      data.append(
        "issueDate",
        formData.issueDate
      );

      data.append(
        "certificateFile",
        file
      );

      await API.post(
        "/certifications",
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      setFormData({
        title: "",
        issuer: "",
        issueDate: "",
      });

      setFile(null);

      fetchCertifications();

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
            Add Certification
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="title"
              placeholder="Certification Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="text"
              name="issuer"
              placeholder="Issuer"
              value={formData.issuer}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className="w-full border p-3 rounded mb-4"
            />

            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files[0])
              }
              className="mb-6"
            />

            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-3 rounded"
            >
              Upload Certification
            </button>

          </form>

        </div>

        <div className="grid gap-6">

          {
            certifications.map((cert) => (

              <div
                key={cert._id}
                className="bg-white p-6 rounded shadow"
              >

                <h3 className="text-2xl font-bold">
                  {cert.title}
                </h3>

                <p className="mt-2">
                  Issued By:
                  {" "}
                  {cert.issuer}
                </p>

                <p className="mt-2">
                  Date:
                  {" "}
                  {
                    new Date(
                      cert.issueDate
                    ).toLocaleDateString()
                  }
                </p>

                {
                  cert.certificateFile && (

                    <a
                      href={
                        `http://localhost:5000/${cert.certificateFile}`
                      }
                      target="_blank"
                      className="inline-block mt-4 text-blue-600"
                    >
                      View Certificate
                    </a>
                  )
                }

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Certifications;