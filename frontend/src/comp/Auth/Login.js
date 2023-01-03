import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../store";

import { ReactComponent as EyeClose } from '../../assets/svg/common/eye-close.svg';
import { ReactComponent as EyeOpen } from '../../assets/svg/common/eye-open.svg';

import { errorNotify, successNotify } from "../../helper/toastifyHelp";
import { login } from "../../apis/apis";

function Login() {
  const logIn = useStore(state => state.logIn)
  const navigate = useNavigate()

  const [showPass, setShowPass] = useState(false)
  const [details, setDetails] = useState({})

  const onChange = e => {
    setDetails(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = () => {
    // if (details.email === "custodian@gmail.com") {
    //   onSuccess({ role: "custodian" })
    // } else if (details.email === "regulator@gmail.com") {
    //   onSuccess({ role: "regulator" })
    // } else if (details.email === "mbe@gmail.com") {
    //   onSuccess({ role: "mbe" })
    // } else {
    //   login(details, onSuccess, onFailure)
    // }
    login(details, onSuccess, onFailure)
  }

  const onSuccess = (payload) => {
    const nodes = ["investor", "custodian", "regulator", "mbe"]
    const token = payload.token?.split(' ')[1] || ""
    // console.log(token)
    if (nodes.includes(payload.role)) {
      logIn(payload.role, details.email, token)
      navigate("/mbe-market")
    }
    successNotify("Successfully Logged In user")
  }

  const onFailure = () => {
    errorNotify("Log in failed. Please try again")
  }

  const updateShowPass = () => setShowPass(p => !p)

  return (
    <div className="dc min-h-screen bg-slate-200">
      <div className="dc flex-col gap-6 container max-w-sm mx-auto flex-1 px-2">
        <div className="px-6 py-8 w-full rounded-lg shadow-md text-black bg-white ">
          <h1 className="mb-8 text-3xl font-medium text-center">Log in</h1>
          <input
            type="text"
            className="p-3 rounded mb-4"
            // name="phoneNumber"
            name="email"
            placeholder="MBE ID"
            // value={MbeId}
            onChange={onChange}
          />

          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              className="p-3 pr-10 rounded mb-4"
              name="password"
              placeholder="Password"
              // value={password}
              onChange={onChange}
            />
            {
              showPass
                ? <EyeClose className="fill-slate-700 absolute top-1/2 right-2 -translate-y-1/2" onClick={updateShowPass} />
                : <EyeOpen className="fill-slate-700 absolute top-1/2 right-2 -translate-y-1/2" onClick={updateShowPass} />
            }
          </div>

          <button
            type="submit"
            className="w-full mt-2 px-6 py-2 font-medium bg-slate-900 text-white rounded-md shadow-xl hover:bg-black"
            onClick={onSubmit}
          >
            Login
          </button>

          <Link
            to="/forget-pass"
            className="block mt-4 text-right hover:text-blue-700"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="df">
          Don't have an account?
          <Link className="text-blue-600 hover:underline" to='/signup'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login