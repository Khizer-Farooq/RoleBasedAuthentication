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

    } catch (error) {

      localStorage.removeItem("accessToken");

      localStorage.removeItem("refreshToken");

      navigate("/");

    }

  };




  const logout = () => {

    localStorage.removeItem("accessToken");

    localStorage.removeItem("refreshToken");

    navigate("/");

  };




  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <div className="bg-white p-8 rounded-lg shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>


        {
          user && (
            <div>

              <p className="mb-2">
                Name: {user.name}
              </p>

              <p className="mb-2">
                Email: {user.email}
              </p>

              <p className="mb-5">
                Role: {user.role}
              </p>

            </div>
          )
        }




        {
          user?.role === "admin" && (

            <div className="bg-red-100 p-5 rounded mb-5">

              <h2 className="text-2xl font-bold mb-3">
                Admin Dashboard
              </h2>

              <p>
                Manage Users
              </p>

              <p>
                Delete Users
              </p>

              <p>
                View Reports
              </p>

            </div>

          )
        }




        {
          user?.role === "user" && (

            <div className="bg-green-100 p-5 rounded mb-5">

              <h2 className="text-2xl font-bold mb-3">
                User Dashboard
              </h2>

              <p>
                View Profile
              </p>

              <p>
                Edit Account
              </p>

              <p>
                View Orders
              </p>

            </div>

          )
        }



        <button
          onClick={logout}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Dashboard;