import { NavLink, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logOut } from "../store/authSlice";

const Header = () => {
  const { token } = useAppSelector((store) => store.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navLinkClassName = (isActive: boolean) =>
    isActive ? "underline underline-offset-4 decoration-2" : "";

  const handleLogout = () => {
    dispatch(logOut());
    navigate("/");
  };

  return (
    <header className="flex gap-4 justify-end items-center px-16 h-20 border-b-2 border-black">
      <h1 className="text-3xl mr-auto">Todos</h1>
      <nav className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) => navLinkClassName(isActive)}
        >
          Home
        </NavLink>
        {token ? (
          <>
            <button type="button" onClick={handleLogout}>
              Log Out
            </button>
            <NavLink
              to="/profile"
              className={({ isActive }) => navLinkClassName(isActive)}
            >
              Profile
            </NavLink>
          </>
        ) : (
          <NavLink
            to="/login"
            className={({ isActive }) => navLinkClassName(isActive)}
          >
            Login/Register
          </NavLink>
        )}
        <NavLink
          to="/about"
          className={({ isActive }) => navLinkClassName(isActive)}
        >
          About
        </NavLink>
      </nav>
    </header>
  );
};
export default Header;
