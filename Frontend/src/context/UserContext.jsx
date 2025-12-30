import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { server } from "../main";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();

  async function loginUser(email, password, navigate) {
    setBtnLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000, // 10 second timeout
      };

      console.log("Attempting login to:", `${server}/api/user/login`);
      const { data } = await axios.post(
        `${server}/api/user/login`,
        { email, password },
        config
      );

      console.log("Login response:", data);
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      navigate("/");
      setIsAuth(true);
      setUser(data.user);
      setBtnLoading(false);
    } catch (error) {
      console.error("Login error:", error);
      if (error.code === 'ECONNABORTED') {
        toast.error("Request timeout - server may be down");
      } else if (error.response) {
        toast.error(error.response.data.message || "Login Failed");
      } else {
        toast.error("Network error - please check server connection");
      }
      setBtnLoading(false);
    }
  }

  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });

      toast.success(data.message);
      navigate("/login");
      setBtnLoading(false);
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || "Registration failed");
      } else {
        toast.error("Network error. Please try again.");
      }
      setBtnLoading(false);
    }
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser([]);
    toast.success("Logged out successfully");
    navigate("/login");
  }

  const [loading, setLoading] = useState(true);

  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/me`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuth,
        setIsAuth,
        loginUser,
        btnLoading,
        loading,
        registerUser,
        logoutHandler,
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("UserData must be used within a UserProvider");
  }
  return context;
};
