import { useState } from "react";
import { errorNotify, successNotify } from '../../../helper/toastifyHelp';
import useStore from "../../../store/index.js"
import { fetchNseData, postNseData, sendOtp, verifyOtp } from "../../../apis/apis";

function RegisteredInvesterWithNSE({ updateStep }) {
  const setNseDetials = useStore((state) => state.setNseData)

  const [isAadharCard, setIsAadharCard] = useState(false)
  const [isFetched, setIsFetched] = useState(false)
  const [isPanCard, setIsPanCard] = useState(false)
  const [nseData, setNseData] = useState({})

  const updateIsFetched = () => setIsFetched(p => !p)
  const setData = (key, value) => setNseDetials(key, value)

  const [kycDetails, setKycDetails] = useState({})

  const onChange = e => {
    setKycDetails(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
    if (e.target.name === 'panCard')
      setIsPanCard(true)
    if (e.target.name === 'aadharCard')
      setIsAadharCard(true)
  }

  const onSuccessNseDataFetch = (payload) => {
    setNseData(payload.data)
    updateIsFetched()
    for (const [key, value] of Object.entries(nseData)) {
      setData(key, value)
    }
  }

  const onFetchNseDataError = () => {
    errorNotify("No data found. Please check the pan card and aadhar number")
  }

  return (
    <>
      <input
        type="text"
        className="p-3 rounded mb-4"
        name="panCard"
        placeholder="PAN Card Number"
        onChange={onChange}
      />

      <input
        type="text"
        className="p-3 rounded mb-4"
        name="aadharCard"
        placeholder="Aadhar Card Number"
        onChange={onChange}
      />

      {
        !isFetched &&
        <button
          className="w-full mt-2 px-6 py-2 font-medium bg-slate-900 text-white rounded-md shadow-xl hover:bg-black disabled:opacity-60"
          onClick={() => fetchNseData(kycDetails, onSuccessNseDataFetch, onFetchNseDataError)}
          disabled={!isPanCard || !isAadharCard}
        >
          Fetch Data
        </button>
      }

      {
        isFetched &&
        <>
          <input
            type="text"
            className="p-3 rounded mb-4"
            name=""
            placeholder="First Name"
            readOnly
            value={nseData.firstName}
          />

          <input
            type="text"
            className="p-3 rounded mb-4"
            name=""
            placeholder="Last Name"
            readOnly
            value={nseData.lastName}
          />

          <input
            type="text"
            className="p-3 rounded mb-4"
            name=""
            placeholder="Father Name"
            readOnly
            value={nseData.fatherName}
          />

          <input
            type="text"
            className="p-3 rounded mb-4"
            name="Nationality"
            placeholder="Nationality"
            readOnly
            value={nseData.Nationality}
          />

          <button
            className="w-full mt-2 px-6 py-2 font-medium bg-slate-900 text-white rounded-md shadow-xl hover:bg-black disabled:opacity-60"
            onClick={() => updateStep(2)}
          >
            Confirm
          </button>
        </>
      }
    </>
  )
}

function NewUser({ updateStep }) {
  const [showOTPForAadhar, setShowOTPForAadhar] = useState(false)
  const [showOTPForPAN, setShowOTPForPAN] = useState(false)
  const [isKycShown, setIsKycShown] = useState(false)

  const [details, setDetails] = useState(useStore((state) => state.details))
  const setDetails2 = useStore((state) => state.setNseData)

  const setData = (keyData, valueData) => {
    setDetails2(keyData, valueData);
  }

  const [nseData, setNseData] = useState(details)

  const onChange = e => {
    setDetails(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
  }

  const updateNseData = e => {
    setNseData(p => ({
      ...p,
      [e.target.name]: e.target.value
    }))
  }

  const onSuccessPanOtpSend = () => {
    successNotify("Sent a message to your registered mobile number")
    setShowOTPForPAN(true)
  }

  const onSuccessPanOtpVerify = () => {
    setIsKycShown(true)
    delete details['enterOtp'];
  }

  const onSuccessAadharOtpSend = () => {
    successNotify("Sent a message to your registered mobile number")
    setShowOTPForAadhar(true)
  }

  const onSuccessAadharOtpVerify = () => {
    delete details['enterOtp']
    postNseData(nseData, onSuccessNseDataPost, onPostNseDataError);
  }

  const onSuccessNseDataPost = () => {
    for (const [key, value] of Object.entries(nseData)) {
      setData(key, value)
    }
    successNotify("Nse Data Added successfully")
    updateStep(2)
  }

  const onPostNseDataError = () => {
    errorNotify("Error Posting Data. Please try again")
  }

  const onBtnClk = () => {
    if (!isKycShown) {
      if (!showOTPForPAN) {
        sendOtp({ "panCard": nseData.panCard }, onSuccessPanOtpSend)
      } else {
        verifyOtp({ "email": details.email, "phoneNumber": details.phoneNumber, "enterOtp": details.enterOtp }, onSuccessPanOtpVerify)
      }
    } else {
      if (!showOTPForAadhar) {
        sendOtp({ "aadharCard": nseData.aadharCard }, onSuccessAadharOtpSend)
      } else {
        verifyOtp({ "email": details.email, "phoneNumber": details.phoneNumber, "enterOtp": details.enterOtp }, onSuccessAadharOtpVerify)
      }
    }
  }

  return (
    <>
      <input
        type="text"
        className={`p-3 rounded mb-4 ${isKycShown ? "border-emerald-600" : ""}`}
        name="panCard"
        placeholder="PAN Card Number"
        onChange={updateNseData}
      />

      {
        !isKycShown ? <>
          {
            showOTPForPAN &&
            <input
              type="text"
              className="p-3 rounded mb-4"
              name="enterOtp"
              placeholder="OTP"
              onChange={onChange}
            />
          }

          <button
            className="w-full mt-2 px-6 py-2 font-medium bg-slate-900 text-white rounded-md shadow-xl hover:bg-black disabled:opacity-60"
            onClick={onBtnClk}
          >
            {showOTPForPAN ? "Verify" : "Send OTP"}
          </button>
        </>
          : <>
            <div className="df max-sm:flex-col gap-4 mb-4">
              <input
                type="text"
                className="p-3 rounded"
                name="firstName"
                placeholder="First Name"
                onChange={updateNseData}
              />

              <input
                type="text"
                className="p-3 rounded"
                name="lastName"
                placeholder="Last Name"
                onChange={updateNseData}
              />
            </div>

            <div className="df max-sm:flex-col gap-4 mb-4">
              <input
                type="text"
                className="p-3 rounded"
                name="fatherName"
                placeholder="Father Name"
                onChange={updateNseData}
              />

              <input
                type="text"
                className="p-3 rounded"
                name="gender"
                placeholder="Gender"
                onChange={updateNseData}
              />
            </div>

            <div className="df max-sm:flex-col gap-4 mb-4">
              <input
                type="text"
                className="p-3 rounded"
                name="DOB"
                placeholder="Date of Birth"
                onChange={updateNseData}
              />

              <input
                type="text"
                className="p-3 rounded"
                name="Nationality"
                placeholder="Nationality"
                onChange={updateNseData}
              />
            </div>

            <input
              type="text"
              className="p-3 rounded mb-4"
              name="address"
              placeholder="Address"
            />

            <label htmlFor="">KYC Verification</label>
            <input
              type="text"
              className="p-3 rounded mb-4"
              name="aadharCard"
              placeholder="Aadhar Card Number"
              onChange={updateNseData}
            />

            {
              showOTPForAadhar &&
              <input
                type="text"
                className="p-3 rounded mb-4"
                name="enterOtp"
                placeholder="OTP"
                onChange={onChange}
              />
            }

            <button
              className="w-full mt-2 px-6 py-2 font-medium bg-slate-900 text-white rounded-md shadow-xl hover:bg-black disabled:opacity-60"
              onClick={onBtnClk}
            >
              {showOTPForAadhar ? "Verify" : "Send OTP"}
            </button>
          </>
      }
    </>
  )
}

function Step1({ updateStep }) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <>
      <div className="df mb-6">
        <button
          className={`${selectedIndex === 0 ? "bg-slate-100 border-slate-900" : "text-slate-600"} text-sm sm:text-base border-b-2 rounded-b-none`}
          onClick={() => setSelectedIndex(0)}
        >
          Registered investor with NSE
        </button>

        <button
          className={`${selectedIndex === 1 ? "bg-slate-100 border-slate-900" : "text-slate-600"} text-sm sm:text-base border-b-2 rounded-b-none`}
          onClick={() => setSelectedIndex(1)}
        >
          Not a registered investor with NSE
        </button>
      </div>

      {
        selectedIndex === 0
          ? <RegisteredInvesterWithNSE updateStep={updateStep} />
          : <NewUser updateStep={updateStep} />
      }
    </>
  )
}

export default Step1