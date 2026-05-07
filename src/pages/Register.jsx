import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");

  const handleRegister = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
          role
        }
      );

      alert("Register Success");

      navigate("/");

    } catch (error) {

      alert(error.response.data.message);

    }

  };

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 mb-4 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="w-full border p-3 mb-4 rounded"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >

          <option value="user">User</option>

          <option value="admin">Admin</option>

        </select>

        <button
          className="bg-black text-white w-full p-3 rounded"
        >
          Register
        </button>

        <p className="mt-4 text-center">

          Already have account?

          <Link
            to="/"
            className="text-blue-500 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  );

}

export default Register;