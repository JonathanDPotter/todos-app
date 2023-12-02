import { useAppSelector } from "../store/hooks";

const Footer = () => {
  const { user } = useAppSelector((store) => store.auth);

  return (
    <footer className="h-16 flex items-center justify-between px-16 border-t-2 border-black">
      <p>Jonathan Potter 2023</p>
      {user && <p>Logged in as {user.username}</p>}
    </footer>
  );
};
export default Footer;
