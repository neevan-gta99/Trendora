import { BASE_URL } from "@/config/apiConfig";
import { setCustomerLoginSession } from "@/redux/features/customer/customerAuthSlice";
import { useAppDispatch } from "@/redux/hooks";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const SignUp = () => {
  const [serverError, setServerError] = useState("");
  const [otpSent, setOtpSent] = useState(false); // 🔄 track OTP state
  const [otp, setOtp] = useState(""); // 🔢 OTP input
  const navigate = useNavigate();
  const dispatch = useAppDispatch();


  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const phone = watch("Phone");

  const sendOTP = async () => {
    const otpUrl = `${BASE_URL}/api/customer/sendOTP`;

    try {
      const response = await fetch(otpUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: `+91${phone}` }),
        credentials: "include",
      });

      const jsonData = await response.json();

      if (response.ok) {
        console.log(jsonData.message, "OTP Sent");
        setOtpSent(true); // ✅ show OTP input
      } else {
        setServerError(jsonData.message || "Failed to send OTP");
      }
    } catch (error: any) {
      setServerError(error.message || "Network error");
    }
  };

  const verifyOTP = async () => {
    const verifyUrl = `${BASE_URL}/api/customer/verifyOTP`;

    try {
      const response = await fetch(verifyUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone: `+91${phone}`, code: otp }),
        credentials: "include",
      });

      const jsonData = await response.json();

      if (response.ok) {
        console.log(jsonData.message, "OTP Verified");
        dispatch(setCustomerLoginSession({
          timestamp: Date.now(),
          customerId: jsonData.customerId,
          phoneNum: phone 
        }));
        navigate("/"); // ✅ redirect after success
      } else {
        setServerError(jsonData.message || "Invalid OTP");
      }
    } catch (error: any) {
      setServerError(error.message || "Network error");
    }
    console.log("Yes");

  };

  const onSubmit = async () => {
    if (!otpSent) {
      await sendOTP(); // 🔁 first step
    } else {
      await verifyOTP(); // 🔁 second step
    }
  };

  return (
    <>
      <h1>SignUp Page</h1>
      <br />
      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("Phone", { required: "Phone is must" })}
          placeholder="Enter Phone"
          type="text"
          disabled={otpSent} // 🔒 lock phone after OTP sent
        />
        <br />
        <br />

        {otpSent && (
          <>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              type="text"
            />
            <br />
            <br />
          </>
        )}

        <button disabled={isSubmitting}>
          {otpSent ? "Verify OTP" : "Continue"}
        </button>
        <br />
        <br />

        {serverError && <span style={{ color: "crimson" }}>{serverError}</span>}
      </form>
    </>
  );
};

export default SignUp;
