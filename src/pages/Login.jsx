import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({

  email: z
    .string()
    .email("Invalid Email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")

});


function Login() {

  const navigate = useNavigate();

  const {

    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema)

  });

  const onSubmit = async (data) => {

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data
      );

      localStorage.setItem(
        "accessToken",
        res.data.accessToken
      );

      localStorage.setItem(
        "refreshToken",
        res.data.refreshToken
      );

      navigate("/dashboard");

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
          Login
        </h1>

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

        <p className="text-red-500 text-sm mb-4">
          {errors.password?.message}
        </p>

        <button className="bg-black text-white w-full p-3 rounded">
          Login
        </button>

        <p className="mt-4 text-center"> No account?
          <Link to="/register" className="text-blue-500 ml-2"> Register </Link>
        </p>

      </form>

    </div>

  );

}

export default Login;