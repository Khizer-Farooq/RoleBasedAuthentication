import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const registerSchema = z.object({

  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .string()
    .email("Invalid Email"),
    

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
    

  role: z
    .string()

});




function Register() {

  const navigate = useNavigate();

  const {

    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data) => {

    try {

      await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );

      alert("Registration successful! Please check your email to verify your account before logging in.");
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);

    }

  };




  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >

        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 mb-1 rounded"
          {...register("name")}
        />

        <p className="text-red-500 text-sm mb-3">
          {errors.name?.message}
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-1 rounded"
          {...register("email")}
        />

        <p className="text-red-500 text-sm mb-3">
          {errors.email?.message}
        </p>

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-1 rounded"
          {...register("password")}
        />

        <p className="text-red-500 text-sm mb-3">
          {errors.password?.message}
        </p>

        <select
          className="w-full border p-3 mb-4 rounded"
          {...register("role")}
        >

          <option value="user">
            User
          </option>

          <option value="admin">
            Admin
          </option>

        </select>

        <button className="bg-black text-white w-full p-3 rounded"> Register </button>

        <p className="mt-4 text-center">
          Already have account?
          <Link to="/" className="text-blue-500 ml-2">
            Login
          </Link>
        </p>

      </form>

    </div>

  );

}

export default Register;