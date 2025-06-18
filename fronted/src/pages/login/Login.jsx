import { useState } from "react";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin.js";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="w-screen h-screen  flex items-center justify-center bg-gray-750">
      <div className="flex flex-col bg-slate-600 rounded-lg items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="text-3xl font-semibold text-center  text-gray-300">
            Login
            <span className="text-blue-200 mx-3">Chat-app</span>
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-xl label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Enter Username"
                className="input w-full input-bordered h-10"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Link
              to={"/Signup"}
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              {"Don't"} have an account?
            </Link>
            <div>
              <button className="btn btn-block btn-md text-xl mt-2 border border-slate-700" disabled={loading}>
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

// // PhoneVerification.jsx
// import { useState,useEffect } from "react";
// import { Phone, Shield, ArrowRight, Check } from "lucide-react";
// import { auth } from "./firebaseConfig.js";
// import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";

// const PhoneVerification = ({ onVerificationComplete }) => {
//   const [currentStep, setCurrentStep] = useState("phone");
//   const [countryCode, setCountryCode] = useState("+91");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");


//   // Country codes data
//   const countryCodes = [
//     { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
//     { code: "+1", country: "CA", flag: "🇨🇦", name: "Canada" },
//     { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
//     { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
//     { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
//     { code: "+81", country: "JP", flag: "🇯🇵", name: "Japan" },
//     { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
//     { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
//     { code: "+39", country: "IT", flag: "🇮🇹", name: "Italy" },
//     { code: "+34", country: "ES", flag: "🇪🇸", name: "Spain" },
//     { code: "+61", country: "AU", flag: "🇦🇺", name: "Australia" },
//     { code: "+55", country: "BR", flag: "🇧🇷", name: "Brazil" },
//     { code: "+52", country: "MX", flag: "🇲🇽", name: "Mexico" },
//     { code: "+7", country: "RU", flag: "🇷🇺", name: "Russia" },
//     { code: "+82", country: "KR", flag: "🇰🇷", name: "South Korea" },
//     { code: "+65", country: "SG", flag: "🇸🇬", name: "Singapore" },
//     { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
//     { code: "+966", country: "SA", flag: "🇸🇦", name: "Saudi Arabia" },
//     { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
//     { code: "+234", country: "NG", flag: "🇳🇬", name: "Nigeria" },
//   ];

// useEffect(() => {
//   if (currentStep === "phone" && !window.recaptchaVerifier) {
//     setTimeout(() => {
//       if (document.getElementById("recaptcha-container")) {
//         window.recaptchaVerifier = new RecaptchaVerifier(
//           "recaptcha-container",
//           {
//             size: "invisible",
//             callback: (response) => {
//               console.log("reCAPTCHA solved");
//             },
//             'expired-callback': () => {
//               console.warn("reCAPTCHA expired");
//             }
//           },
//           auth
//         );

//         window.recaptchaVerifier.render().then((widgetId) => {
//           window.recaptchaWidgetId = widgetId;
//         }).catch((err) => {
//           console.error("reCAPTCHA render error:", err);
//         });
//       } else {
//         console.error("recaptcha-container not found in DOM");
//       }
//     }, 0); // ensures it runs after first render
//   }
// }, [currentStep]);


//   // Simulate sending OTP
// const sendOTP = async () => {
//   if (!phoneNumber || phoneNumber.length < 7) {
//     alert("Please enter a valid phone number");
//     return;
//   }

//   const cleaned = phoneNumber.replace(/\D/g, "");
// if (!/^\d{7,15}$/.test(cleaned)) {
//   alert("Invalid phone number format");
//   return;
// }

//   try {
//     setLoading(true);

//     if (!window.recaptchaVerifier) {
//       throw new Error("Recaptcha not initialized");
//     } 

//     const fullPhone = `${countryCode}${cleaned}`;

//     const confirmation = await signInWithPhoneNumber(
//       auth,
//       fullPhone,
//       window.recaptchaVerifier
//     );

//     window.confirmationResult = confirmation;
//     setCurrentStep("otp");
//     alert(`OTP sent to ${fullPhone}`);
//   } catch (error) {
//     console.error("OTP send error:", error);
//     alert(error.message);
//   } finally {
//     setLoading(false);
//   }
// };


//   // Simulate OTP verification
//   const verifyOTP = async () => {
//     if (!otp || otp.length !== 6) {
//       alert("Please enter a valid OTP");
//       return;
//     }

//     try {
//       setLoading(true);
//       const result = await window.confirmationResult.confirm(otp);
//       const user = result.user;

//       // Pass to parent
//       onVerificationComplete({
//         uid: user.uid,
//         phoneNumber: user.phoneNumber,
//         countryCode,
//       });

//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setError("Invalid OTP. Please try again.");
//       setLoading(false);
//     }
//   };

//   // Phone Number Step
//   const PhoneStep = () => (
//     <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Phone className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">
//             Verify Your Phone
//           </h2>
//           <p className="text-gray-600">
//             Enter your phone number to get started
//           </p>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Phone Number
//             </label>
//             <div className="flex">
//               <div className="relative">
//                 <select
//                   value={countryCode}
//                   onChange={(e) => setCountryCode(e.target.value)}
//                   className="appearance-none bg-white border border-gray-300 rounded-l-lg px-4 py-3 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[100px]"
//                 >
//                   {countryCodes.map((country, index) => (
//                     <option key={index} value={country.code}>
//                       {country.flag} {country.code}
//                     </option>
//                   ))}
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg
//                     className="w-4 h-4 text-gray-400"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               <input
//                 type="tel"
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 placeholder="7903756849"
//                 value={phoneNumber}
//                 onInput={(e) => {
//                   const val = e.target.value.replace(/\D/g, "");
//                   setPhoneNumber(val);
//                 }}
//                 maxLength={10}
//                 autoFocus
//                 className="bg-white border text-black border-gray-800 ml-1 text-center"
//               />
//             </div>
//             <p className="text-xs text-gray-500 mt-1">
//               {countryCodes.find((c) => c.code === countryCode)?.flag}{" "}
//               {countryCodes.find((c) => c.code === countryCode)?.name}
//             </p>
//           </div>

//           <button
//             onClick={sendOTP}
//             disabled={loading}
//             className="w-full bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
//           >
//             {loading ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//             ) : (
//               <>
//                 Send OTP
//                 <ArrowRight className="ml-2 w-4 h-4" />
//               </>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // OTP Verification Step
//   const OTPStep = () => (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
//             <Shield className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter OTP</h2>
//           <p className="text-gray-600">
//             We sent a code to {countryCode} {phoneNumber}
//           </p>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Verification Code
//             </label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOtp(e.target.value)}
//               placeholder="123456"
//               maxLength="6"
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-center text-2xl font-mono"
//             />
//           </div>

//           <button
//             onClick={verifyOTP}
//             disabled={loading}
//             className="w-full bg-green-500 hover:bg-green-600 disabled:opacity-50 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
//           >
//             {loading ? (
//               <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//             ) : (
//               <>
//                 Verify
//                 <Check className="ml-2 w-4 h-4" />
//               </>
//             )}
//           </button>

//           <button
//             onClick={() => setCurrentStep("phone")}
//             className="w-full text-green-600 hover:text-green-700 font-medium py-2"
//           >
//             Change Phone Number
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   // Render current step
//   return (
//     <>
//       {currentStep === "phone" ? <PhoneStep /> : <OTPStep />}
//       {currentStep === "phone" && <div id="recaptcha-container"></div>}
//     </>
//   );
// };

// export default PhoneVerification;
