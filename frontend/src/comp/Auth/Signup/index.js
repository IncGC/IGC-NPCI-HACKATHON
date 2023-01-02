import { useState } from "react";
import { Link } from "react-router-dom";

import { ReactComponent as Arrow } from '../../../assets/svg/arrows/dropdown.svg';

import Step0 from "./Step0";
import Step1 from "./Step1";
import Step2 from "./Step2";

function Signup() {
  const [step, setStep] = useState(0)

  const updateStep = val => setStep(val)

  return (
    <div className="dc flex-col min-h-screen p-4 bg-slate-200">
      <h1 className="mb-4 text-3xl font-medium text-center">Sign up</h1>
      <div className="px-6 py-8 rounded-lg shadow-md text-black bg-white">
        <div className="df gap-1 mb-6">
          <span className={`leading-4 ${step === 0 ? "text-slate-900 font-medium" : " text-slate-500"}`}>Step 1</span>
          <Arrow className={`w-4 mr-3 -rotate-90 ${step === 0 ? "fill-slate-900" : "fill-slate-500"}`} />
          <span className={`leading-4 ${step === 1 ? "text-slate-900 font-medium" : " text-slate-500"}`}>Step 2</span>
          <Arrow className={`w-4 mr-3 -rotate-90 ${step === 1 ? "fill-slate-900" : "fill-slate-500"}`} />
          <span className={`leading-4 ${step === 2 ? "text-slate-900 font-medium" : " text-slate-500"}`}>Step 3</span>
        </div>

        {
          step === 0 &&
          <Step0 updateStep={updateStep} />
        }

        {
          step === 1 &&
          <Step1 updateStep={updateStep} />
        }

        {
          step === 2 &&
          <Step2 />
        }
      </div>

      <div className="df text-grey-dark mt-6">
        Already have an account?
        <Link className="text-blue-600 hover:underline" to='/login'>
          Log in
        </Link>
      </div>
    </div>
  )
}

export default Signup