import { useState } from "react";

function CBDCWallet() {
  const [showOtp, setShowOtp] = useState(false)

  return (
    <section className="grid gap-4 max-w-md mx-auto px-6 py-10 bg-slate-800 rounded-b-2xl">
      <p className="df justify-between text-base">
        If already have an account
        <a href="/" className="text-sm text-blue-300 hover:text-blue-500">
          Create a CBDC account
        </a>
      </p>

      <input
        type="text"
        className="p-3 border-none"
        name=""
        placeholder="CBDC Product key"
      />

      {
        showOtp &&
        <input
          type="text"
          className="p-3 rounded"
          name="otp"
          placeholder="OTP"
        />
      }

      <button
        className="w-full px-6 py-2 font-medium bg-slate-700 rounded-md shadow-xl hover:bg-slate-900"
        onClick={() => setShowOtp(true)}
      >
        {showOtp ? "Verify" : "Send OTP"}
      </button>
    </section>
  )
}

export default CBDCWallet