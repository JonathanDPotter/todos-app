import { FC, FormEvent, MutableRefObject, useState } from "react";
import { ModalType } from "../pages/Profile";
import api from "../api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logOut, setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  type: ModalType;
  modalRef: MutableRefObject<HTMLDialogElement | null>;
}

const ProfileModal: FC<Props> = ({ type, modalRef }) => {
  const classNames = {
    button: "border-2 border-black rounded focus:ring-2 p-2",
    dialog: "p-8 text-center rounded",
    fieldset: "flex gap-4 m-4 items-center justify-between",
    input: "border-black border-2 p-2 focus:ring-2 rounded",
  };

  const { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [newUsername, setNewUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUpdateUsername = async () => {
    try {
      const response = await api.user.updateUsername(
        user!.user_id!.toString(),
        {
          username: newUsername,
          password,
        }
      );
      console.log(response);
      const newUser = await api.user.getUser(user!.user_id!.toString());
      dispatch(setUser(newUser[0]));
      setNewUsername("");
      setPassword("");
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.user.deleteUser(
        user!.user_id!.toString(),
        token!
      );
      console.log(response);
      dispatch(logOut());
      navigate("/");
    } catch (error: any) {
      console.log(error);
    }
  };

  const getHandler = () => {
    return type === ModalType.username ? handleUpdateUsername : handleDelete;
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    handler: () => void
  ) => {
    event.preventDefault();
    handler();
    modalRef.current?.close();
  };

  const getFieldsets = () => {
    return type === ModalType.username ? (
      <>
        <fieldset className={classNames.fieldset}>
          <label htmlFor="new-username">New Username</label>
          <input
            className={classNames.input}
            type="text"
            id="new-username"
            value={newUsername}
            onChange={(event) => setNewUsername(event.currentTarget.value)}
          />
        </fieldset>
        <fieldset className={classNames.fieldset}>
          <label htmlFor="password">Password</label>
          <input
            className={classNames.input}
            type="text"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </fieldset>
      </>
    ) : (
      <>
        <fieldset className={classNames.fieldset}>
          <label>Delete User?</label>
        </fieldset>
      </>
    );
  };

  return (
    <dialog ref={modalRef} className={classNames.dialog}>
      <form
        action="submit"
        onSubmit={(event) => handleSubmit(event, getHandler())}
      >
        {getFieldsets()}
        <button
          type="button"
          onClick={() => modalRef.current?.close()}
          className={classNames.button + " mr-4"}
        >
          Cancel
        </button>
        <button type="submit" className={classNames.button}>
          Submit
        </button>
      </form>
    </dialog>
  );
};
export default ProfileModal;
