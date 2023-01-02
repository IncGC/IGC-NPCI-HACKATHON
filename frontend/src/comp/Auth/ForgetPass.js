import { Link } from "react-router-dom";

function ForgetPass() {
  return (
    <div className="dc min-h-screen bg-slate-200">
      <div className="dc flex-col gap-6 container max-w-sm mx-auto flex-1 px-2">
        <div className="px-6 py-8 w-full rounded-lg shadow-md text-black bg-white">
          <h1 className="mb-8 text-3xl font-medium text-center">Forget Password</h1>
          <input
            type="email"
            className="p-3 rounded mb-4"
            name="email"
            placeholder="Email"
          />

          <button
            type="submit"
            className="w-full mt-2 px-6 py-2 font-medium bg-slate-900 text-white rounded-md shadow-xl hover:bg-black"
          >
            Reset Password
          </button>
        </div>

        <div className="df">
          Remembered your password?
          <Link className="text-blue-600 hover:underline" to='/login'>
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ForgetPass