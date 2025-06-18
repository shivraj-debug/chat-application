import GenderCheckBox from "./GenderCheckBox.jsx";
import { Link } from "react-router-dom";
import { useState } from "react";
import useSignup from "../../hooks/useSignup.js";

function Signup() {
  const [inputs, setInputs] = useState({
    fullName: " ",
    username: " ",
    password: " ",
    confirmPassword: " ",
    gender: " ",
  });

  const { signup, loading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  };

  const handlecheckbox = (gender) => {
    setInputs({ ...inputs, gender });
  };

  return (
    <div className="w-screen h-screen  flex items-center justify-center bg-gray-750">
      <div className="flex flex-col bg-slate-600 rounded-lg items-center justify-center min-w-[400px] min-h-[600px]">
        <h1 className="text-3xl font-semibold text-center   text-gray-300">
          Sign up
          <span className="text-blue-200"> Chat-app</span>
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col w-full p-4">
          <div className="" >
            <label className="label p-2">
              <span className="text-xl label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input w-full input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-xl label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="username"
              className="input w-full input-bordered h-10"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span className="text-xl label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="input w-full input-bordered h-10"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label">
              <span type="password" className="text-xl label-text">
                Confirm Password
              </span>
            </label>
            <input
              type="text"
              placeholder="Confirm Password"
              className="input w-full input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
            />
          </div>

          <GenderCheckBox
            onChangeCheckbox={handlecheckbox}
            selectedGender={inputs.gender}
          />

          <Link
            to={"/Login"}
            href="#"
            className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
          >
            Already have an account?
          </Link>
          <div>
            <button
              className="btn btn-block btn-md text-xl mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign Up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
