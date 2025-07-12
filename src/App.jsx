import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import './App.css';
import React from 'react'

// Define validation schema
const schema = yup.object({
  email: yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters")
    .trim(),
  age: yup.number()
    .typeError("Age must be a number")
    .required("Age is required")
    .positive("Age must be positive")
    .integer("Age must be an integer")
    .min(19, "You must be at least 19 years old")
    .max(60, "Maximum age is 60"),
  city: yup.string()
    .required("City is required"),
  gender: yup.string()
    .required("Gender is required"),
  acceptTerms: yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions")
}).required();

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      age: null,
      city: "",
      gender: "",
      acceptTerms: false
    },
    mode: "onChange"
  });

  const submitHandler = (data) => console.log(data);

  // Helper function to show error only if field is touched
  const showError = (fieldName) => {
    return touchedFields[fieldName] && errors[fieldName];
  };

  return (
    <section className='min-h-screen bg-gray-900 flex items-center justify-center p-4'>
      <form 
        onSubmit={handleSubmit(submitHandler)}
        className='bg-gray-800 flex flex-col gap-6 w-full max-w-md p-8 rounded-xl shadow-lg border border-gray-700'
      >
        <h1 className='text-2xl font-bold text-white text-center'>Registration Form</h1>
        
        <div className='w-full space-y-4'>
          {/* Email Field */}
          <div>
            <label htmlFor="email" className='block text-gray-300 mb-2'>Email</label>
            <input 
              {...register("email")}
              id="email"
              type="email"
              className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                showError("email") ? 'border-red-500' : 'border-gray-600'
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200`}
              placeholder='Enter your email'
            />
            {showError("email") && (
              <span className='text-red-400 text-sm mt-1 block'>
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className='block text-gray-300 mb-2'>Password</label>
            <input 
              {...register("password")}
              id="password"
              type="password"
              className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                showError("password") ? 'border-red-500' : 'border-gray-600'
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200`}
              placeholder='Enter your password'
            />
            {showError("password") && (
              <span className='text-red-400 text-sm mt-1 block'>
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Age Field */}
          <div>
            <label htmlFor="age" className='block text-gray-300 mb-2'>Age</label>
            <input 
              {...register("age")}
              id="age"
              type="number"
              className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                showError("age") ? 'border-red-500' : 'border-gray-600'
              } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200`}
              placeholder='Enter your age (19-60)'
            />
            {showError("age") && (
              <span className='text-red-400 text-sm mt-1 block'>
                {errors.age.message}
              </span>
            )}
          </div>

          {/* City Field */}
          <div>
            <label htmlFor="city" className='block text-gray-300 mb-2'>City</label>
            <select 
              {...register("city")}
              id="city"
              className={`w-full px-4 py-3 rounded-lg bg-gray-700 border ${
                showError("city") ? 'border-red-500' : 'border-gray-600'
              } text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition duration-200 appearance-none`}
              defaultValue=""
            >
              <option value="" disabled>Select your city</option>
              <option value="qazvin">Qazvin</option>
              <option value="tehran">Tehran</option>
              <option value="rasht">Rasht</option>
              <option value="esfahan">Esfahan</option>
            </select>
            {showError("city") && (
              <span className='text-red-400 text-sm mt-1 block'>
                {errors.city.message}
              </span>
            )}
          </div>

          {/* Gender Field */}
          <fieldset className={`border ${
            showError("gender") ? 'border-red-500' : 'border-gray-600'
          } rounded-lg p-4`}>
            <legend className={`px-2 ${
              showError("gender") ? 'text-red-400' : 'text-gray-300'
            }`}>Select a gender</legend>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input 
                  {...register("gender")}
                  id="male"
                  type="radio"
                  value="male"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-600 bg-gray-700"
                />
                <label htmlFor="male" className="ml-2 block text-gray-300">Male</label>
              </div>
              <div className="flex items-center">
                <input 
                  {...register("gender")}
                  id="female"
                  type="radio"
                  value="female"
                  className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-600 bg-gray-700"
                />
                <label htmlFor="female" className="ml-2 block text-gray-300">Female</label>
              </div>
            </div>
            {showError("gender") && (
              <span className='text-red-400 text-sm mt-1 block'>
                {errors.gender.message}
              </span>
            )}
          </fieldset>

          {/* Terms and Conditions Checkbox */}
          <div className={`flex items-start p-4 rounded-lg border ${
            showError("acceptTerms") ? 'border-red-500' : 'border-gray-600'
          }`}>
            <div className="flex items-center h-5">
              <input
                {...register("acceptTerms")}
                id="acceptTerms"
                type="checkbox"
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-gray-600 bg-gray-700"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="acceptTerms" className="font-medium text-gray-300">
                I agree to the <a href="#" className="text-amber-500 hover:underline">terms and conditions</a>
              </label>
              {showError("acceptTerms") && (
                <span className='text-red-400 text-sm mt-1 block'>
                  {errors.acceptTerms.message}
                </span>
              )}
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={!isValid}
          className={`w-full font-medium py-3 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${
            isValid 
              ? 'bg-amber-600 hover:bg-amber-700 text-white focus:ring-amber-500'
              : 'bg-gray-600 text-gray-400 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      </form>
    </section>
  );
}

export default App;