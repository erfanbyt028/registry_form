import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiCheckCircle } from "react-icons/fi";

const schema = yup.object({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "At least 6 characters")
    .max(12, "At most 12 characters")
    .matches(/^[A-Za-z0-9.]+$/, "Only letters, numbers, and dot (.) allowed"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Required")
    .min(19, "Min age is 19")
    .max(60, "Max age is 60"),
  city: yup.string().required("City is required"),
  gender: yup.string().required("Gender is required"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Accept terms")
    .required("Accept terms"),
});

const defaultValues = {
  email: "",
  password: "",
  age: "",
  city: "",
  gender: "",
  acceptTerms: false,
};

const App = () => {
  const [success, setSuccess] = useState(false);

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues,
    mode: "onTouched",
  });

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, touchedFields },
  } = form;

  const showError = (name) => touchedFields[name] && errors[name];

  const onSubmit = (data) => {
    console.log("✅ submitted:", data);
    setSuccess(true);
    reset();
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <section className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gray-800 flex flex-col gap-6 w-full max-w-md p-8 rounded-xl shadow-xl border border-gray-700 relative"
      >
        <h1 className="text-2xl font-bold text-white text-center">
          Registration Form
        </h1>

        {success && (
          <div className="flex items-center gap-2 text-green-400 text-sm bg-green-900 border border-green-600 p-3 rounded-lg">
            <FiCheckCircle className="text-xl" />
            Form submitted successfully!
          </div>
        )}

        {/* Email */}
        <div>
          <label className="text-gray-300 mb-1 block">Email</label>
          <input
            type="email"
            {...register("email")}
            placeholder="Email"
            className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
              showError("email") ? "border-red-500" : "border-gray-600"
            } text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
          />
          {showError("email") && (
            <p className="text-red-400 text-sm mt-1">
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-gray-300 mb-1 block">Password</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
              showError("password") ? "border-red-500" : "border-gray-600"
            } text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
          />
          {showError("password") && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password?.message}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="text-gray-300 mb-1 block">Age</label>
          <input
            type="number"
            {...register("age")}
            placeholder="19 to 60"
            className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
              showError("age") ? "border-red-500" : "border-gray-600"
            } text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
          />
          {showError("age") && (
            <p className="text-red-400 text-sm mt-1">{errors.age?.message}</p>
          )}
        </div>

        {/* City */}
        <div>
          <label className="text-gray-300 mb-1 block">City</label>
          <select
            {...register("city")}
            className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
              showError("city") ? "border-red-500" : "border-gray-600"
            } text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
          >
            <option value="">Select city</option>
            <option value="qazvin">Qazvin</option>
            <option value="tehran">Tehran</option>
            <option value="rasht">Rasht</option>
            <option value="esfahan">Esfahan</option>
          </select>
          {showError("city") && (
            <p className="text-red-400 text-sm mt-1">{errors.city?.message}</p>
          )}
        </div>

        {/* Gender */}
        <fieldset
          className={`border ${
            showError("gender") ? "border-red-500" : "border-gray-600"
          } rounded-lg p-4`}
        >
          <legend
            className={`px-2 ${
              showError("gender") ? "text-red-400" : "text-gray-300"
            }`}
          >
            Select gender
          </legend>
          <div className="flex items-center space-x-4">
            <label className="flex items-center text-gray-300">
              <input
                {...register("gender")}
                type="radio"
                value="male"
                className="mr-2 text-amber-600"
              />
              Male
            </label>
            <label className="flex items-center text-gray-300">
              <input
                {...register("gender")}
                type="radio"
                value="female"
                className="mr-2 text-amber-600"
              />
              Female
            </label>
          </div>
          {showError("gender") && (
            <p className="text-red-400 text-sm mt-1">
              {errors.gender?.message}
            </p>
          )}
        </fieldset>

        {/* Terms */}
        <label
          className={`flex items-center gap-2 p-3 rounded-lg border ${
            showError("acceptTerms") ? "border-red-500" : "border-gray-600"
          } text-gray-300`}
        >
          <input
            {...register("acceptTerms")}
            type="checkbox"
            className="text-amber-600"
          />
          I accept the{" "}
          <a href="#" className="text-amber-500 hover:underline">
            terms and conditions
          </a>
        </label>
        {showError("acceptTerms") && (
          <p className="text-red-400 text-sm -mt-3 mb-1">
            {errors.acceptTerms?.message}
          </p>
        )}

        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3 rounded-lg font-medium transition duration-200 ${
            isValid
              ? "bg-amber-600 hover:bg-amber-700 text-white"
              : "bg-gray-600 text-gray-400 cursor-not-allowed"
          }`}
        >
          Submit
        </button>

        <DevTool control={control} />
      </form>
    </section>
  );
};

export default App;
