import { Navigate, Route, Routes } from "react-router-dom";
import { About, FourOhFour, Home, Login, Profile } from "../pages";
import { useAppSelector } from "../store/hooks";

const Router = () => {
  const { user } = useAppSelector((store) => store.auth);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/profile" element={<Profile />} />;
      <Route path="/about" element={<About />} />;
      <Route path="*" element={<FourOhFour />} />
    </Routes>
  );
};
export default Router;
