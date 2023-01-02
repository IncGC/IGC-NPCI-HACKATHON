import useStore from "../../../store/index.js";
import { useState } from "react";
import { errorNotify, successNotify } from '../../../helper/toastifyHelp';
import countryCodes from '../../../constants/countryCodes';
import { sendOtp, verifyOtp } from "../../../apis/apis";

function Step0({ updateStep }) {
  const setDetails = useStore((state) => state.setDetails)

  const [selectedCountryCode, setSelectedCountryCode] = useState("+91")
  const [phoneNumber, setPhoneNumber] = useState(false)
  const [isOtpEnter, setIsOtpEnter] = useState(false)
  const [showOtp, setShowOtp] = useState(false)
  const [details, setDetail] = useState({})
  const [email, setEmail] = useState(false)

  const setData = (keyData, valueData) => setDetails(keyData, valueData)

  const onChange = e => {
    setDetail(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
    if (e.target.name === "email") {
      setEmail(true)
    }
    if (e.target.name === "phoneNumber") {
      setPhoneNumber(true)
    }
    if (e.target.name === "enterOtp") {
      setIsOtpEnter(true)
    }
  }

  const onSuccessOtpVerify = () => {
    delete details['enterOtp']
    for (const [key, value] of Object.entries(details)) {
      setData(key, value)
    }
    successNotify("OTP has been successfully verified")
    updateStep(1)
  }

  const onWrongOtpEnter = () => {
    errorNotify("Wrong OTP entered")
  }

  const updateShowOtp = () => {
    successNotify("OTP has been sent to your mobile number and email")
    setPhoneNumber(p => !p)
    setShowOtp(p => !p)
    setEmail(p => !p)
  }

  return (
    <div className='xs:w-[350px]'>
      <input
        type="text"
        className="p-3 rounded mb-2"
        name="email"
        placeholder="Email"
        onChange={onChange}
        required
      />

      <div className="df mb-4 border border-gray-300 rounded">
        <select
          className="w-24 border-y-0 border-l-0 rounded-none bg-[length:18px] bg-[88%]"
          value={selectedCountryCode}
          onChange={e => setSelectedCountryCode(e.target.value)}
        >
          {
            countryCodes.map((country, i) => (
              <option
                key={i}
                value={country.dial_code}
              >
                {country.dial_code}
              </option>
            ))
          }
        </select>

        <input
          type="number"
          className="no-number-arrows p-3 border-none"
          name="phoneNumber"
          placeholder="Mobile Number"
          onChange={onChange}
          required
        />
      </div>

      <button
        className="w-full mt-2 px-6 py-2 font-medium bg-slate-900 text-white rounded-md shadow-xl hover:bg-black disabled:opacity-60"
        onClick={() => sendOtp(details, updateShowOtp)}
        disabled={!email || !phoneNumber}
      >
        Send OTP
      </button>

      {
        showOtp &&
        <>
          <input
            type="text"
            className="p-3 rounded mb-4 mt-8"
            name="enterOtp"
            placeholder="OTP"
            onChange={onChange}
            required
          />

          <button
            className="w-full mt-2 px-6 py-2 font-medium bg-slate-900 text-white rounded-md shadow-xl hover:bg-black"
            onClick={() => verifyOtp(details, onSuccessOtpVerify, onWrongOtpEnter)}
            disabled={!isOtpEnter}
          >
            Verify
          </button>
        </>
      }
    </div>
  )
}

export default Step0