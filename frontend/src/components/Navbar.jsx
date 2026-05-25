import { Link } from "react-router-dom";

function Navbar() {

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (

    <div className="flex flex-wrap gap-4">

      <h1 className="text-2xl font-bold">
        VeriFolio
      </h1>

      <div className="flex gap-6">

        <Link to="/dashboard">
          Dashboard
        </Link>

        <Link to="/profile">
          Profile
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        <Link to="/certifications">
          Certifications
        </Link>
        <Link to="/search">
          Search 
        </Link>

        <button
          onClick={logout}
          className="bg-red-500 px-4 py-1 rounded"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;