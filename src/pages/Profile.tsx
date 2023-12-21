import { useRef } from "react";
import { useAppSelector } from "../store/hooks";
import { ProfileModal } from "../components";

export enum ModalType {
  username = "username",
  delete = "delete",
}

const Profile = () => {
  const { user } = useAppSelector((store) => store.auth);

  const classNames = {
    button: "border-2 border-black rounded focus:ring-2 p-2",
  };

  const usernameDialogRef = useRef<HTMLDialogElement>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="flex flex-col gap-4 items-center pt-16">
      <h2>Username: {user?.username}</h2>
      <button
        type="button"
        className={classNames.button}
        onClick={() => usernameDialogRef.current?.showModal()}
      >
        update username
      </button>
      <button
        type="button"
        className={classNames.button}
        onClick={() => deleteDialogRef.current?.showModal()}
      >
        delete profile
      </button>
      <ProfileModal type={ModalType.username} modalRef={usernameDialogRef} />
      <ProfileModal type={ModalType.delete} modalRef={deleteDialogRef} />
    </div>
  );
};
export default Profile;
