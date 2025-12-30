import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserData } from "./context/UserContext";
import { LoadingBig } from "./components/Loading";

const App = () => {
  const { user, isAuth, loading } = UserData();
  
  if (loading) {
    return <LoadingBig />;
  }
  
  return (
    <Routes>
      <Route path="/" element={isAuth ? <Home /> : <Navigate to="/login" replace />} />
      <Route path="/login" element={isAuth ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={isAuth ? <Navigate to="/" replace /> : <Register />} />
    </Routes>
  );
};

export default App;
