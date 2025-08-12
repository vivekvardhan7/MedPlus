import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AnnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import googleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
// import cors from "cors";

// app.use(cors());

const UserAuthForm = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const [medications, setMedications] = useState([]);
  const [medicineDetails, setMedicineDetails] = useState({
    medicineName: "",
    frequency: "",
    startDate: "",
    endDate: "",
    schedules: [],
  });
  const [userId, setUserId] = useState(null);
  //  // Store logged-in user's ID

  const userAuthThroughServer = async (serverRoute, formData) => {
    try {
      setLoading(true);
      console.log("data", formData);
      const endpoint =
        type === "sign-in"
          ? "https://med-backend-75az.onrender.com/signin"
          : "https://med-backend-75az.onrender.com/signup";

      const response = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success(
        type === "sign-in" ? "Login successful" : "Registration successful"
      );
      console.log(response.data);
      if (type === "sign-in") {
        const { userId } = response.data; // Expect userId in response
        localStorage.setItem("userId", userId); // Store userId
        setUserId(userId); // Store token if needed
        console.log("userId:", userId);
        navigate("/UserInterface"); // Redirect after login
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Something went wrong";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://med-backend-75az.onrender.com/google-auth",
        {
          token: credentialResponse.credential,
        }
      );
      toast.success("Google login successful");
      console.log(response.data);
      const { userId } = response.data; // Expect userId in response
      localStorage.setItem("userId", userId); // Store userId
      setUserId(userId); // Store token
      console.log("userid", userId);
      navigate("/UserInterface"); // Redirect after Google login
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Something went wrong";
      toast.error(errorMessage);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { mobile, email, password, fullname } = e.target.elements;
    let formData = {
      mobile: mobile.value,
      email: email.value,
      password: password.value,
      fullname: fullname ? fullname.value : undefined,
    };

    const serverRoute = type === "sign-in" ? "/signin" : "/signup";
    userAuthThroughServer(serverRoute, formData);
  };

  return (
    <AnnimationWrapper keyValue={type}>
      <section className="h-cover flex items-center justify-center">
        <Toaster />
        <form className="w-[80%] max-w-[400px]" onSubmit={handleSubmit}>
          <h1 className="text-4xl font-gelasio capitalize text-center mb-24">
            {type === "sign-in" ? "Welcome back" : "Join us today"}
          </h1>

          {type === "sign-up" && (
            <InputBox
              name="fullname"
              type="text"
              placeholder="Full Name"
              icon="fi-rr-user"
              aria-label="Full Name"
            />
          )}
          <InputBox
            name="mobile"
            type="number"
            placeholder="Mobile number"
            icon="fi-rr-key"
            aria-label="Password"
          />

          <InputBox
            name="email"
            type="email"
            placeholder="Email"
            icon="fi-rr-envelope"
            aria-label="Email"
          />

          <InputBox
            name="password"
            type="password"
            placeholder="Password"
            icon="fi-rr-key"
            aria-label="Password"
          />

          <button
            className="btn-dark center mt-14"
            type="submit"
            disabled={loading}
            aria-label={loading ? "Submitting" : `${type.replace("-", "")}`}
          >
            {loading ? "Submitting..." : type.replace("-", "")}
          </button>

          <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
            <hr className="w-1/2 border-black" />
            <p>or</p>
            <hr className="w-1/2 border-black" />
          </div>

          <GoogleOAuthProvider clientId="342329070589-db41eq9jsjcsk3u0tab4jfbe56q4msp5.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                toast.error("Google login failed");
              }}
            />
          </GoogleOAuthProvider>

          {type === "sign-in" ? (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Don't have an Account?
              <Link to="/signup" className="underline text-black text-xl ml-1">
                Join us today
              </Link>
            </p>
          ) : (
            <p className="mt-6 text-dark-grey text-xl text-center">
              Already a member?
              <Link to="/signin" className="underline text-black text-xl ml-1">
                Sign in here
              </Link>
            </p>
          )}
        </form>
      </section>
    </AnnimationWrapper>
  );
};
export default UserAuthForm;
