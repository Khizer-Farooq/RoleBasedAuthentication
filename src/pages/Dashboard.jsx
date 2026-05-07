import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {

    const token = localStorage.getItem("accessToken");

    if (!token) {

      navigate("/");

      return;

    }

    getProfile();

  }, []);




  const getProfile = async () => {

    try {

      const token = localStorage.getItem("accessToken");

      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setUser(res.data.user);
      console.log(res.data);

    } catch (error) {

      localStorage.removeItem("token");

      navigate("/");

    }

  };




  const logout = () => {

    localStorage.removeItem("accessToken");

    navigate("/");

  };




  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">

        <h1 className="text-3xl font-bold text-center mb-6">
          Dashboard
        </h1>

        {
          user && (
            <div>

              <p className="mb-3 text-lg">
                Name: {user.name}
              </p>

              <p className="mb-3 text-lg">
                Email: {user.email}
              </p>

              <p className="mb-5 text-lg">
                Role: {user.role}
              </p>

            </div>
          )
        }

        <button
          onClick={logout}
          className="bg-black text-white w-full p-3 rounded"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Dashboard;