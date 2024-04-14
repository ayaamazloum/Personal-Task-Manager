import "./style.css";
import { useEffect, useState } from "react";
import SignupForm from "./copmonents/SignupForm";
import LoginForm from "./copmonents/LoginForm";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") !== undefined) navigate("/");
  });

  const [isLogin, setIsLogin] = useState(true);

  const handleIsLogin = (value) => {
    setIsLogin(value);
  };

  return (
    <div className="flex column center gap-10 mt-20 mb-20">
      <div className="box border flex column center gap-20">
        {isLogin ? <LoginForm /> : <SignupForm />}
      </div>
      <div className="box border flex column center gap-20">
        {isLogin ? (
          <p>
            Don't have an account?{" "}
            <span
              onClick={() => {
                handleIsLogin(false);
              }}
              className="primary-text link"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p>
            Have an account?{" "}
            <span
              onClick={() => {
                handleIsLogin(true);
              }}
              className="primary-text link"
            >
              Log in
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
