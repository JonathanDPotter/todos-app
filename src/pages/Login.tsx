import { FormEvent, useEffect, useRef, useState } from "react";
import autoAnimate from "@formkit/auto-animate";
import api from "../api";
import { useAppDispatch } from "../store/hooks";
import { setToken, setUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [register, setRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const classNames = {
    fieldset: "flex justify-between items-center",
    input: "border-2 border-black rounded focus:ring-2 p-2",
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (register && password !== repeatPassword)
      return setErrorMessage("Passwords don't match!");

    if (password.length < 6)
      return setErrorMessage("Password must be at least 6 characters!");

    try {
      register && (await api.user.registerUser({ username, password }));
      const { token, user } = await api.user.login({ username, password });
      dispatch(setToken(token));
      dispatch(setUser(user));
      navigate("/");
    } catch (error: any) {
      setErrorMessage("Username or Password are incorrect");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      dialogRef.current?.showModal();
      setTimeout(() => {
        dialogRef.current?.close();
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  useEffect(() => {
    formRef.current && autoAnimate(formRef.current);
  }, [parent]);

  return (
    <div className="flex-1 flex flex-col gap-8">
      <h2 className="text-2xl text-center">
        {register ? "Register" : "Log In"}
      </h2>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-3/4 max-w-md mx-auto"
      >
        <fieldset className={classNames.fieldset}>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            id="username"
            className={classNames.input}
            value={username}
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </fieldset>
        <fieldset className={classNames.fieldset}>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            className={classNames.input}
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
        </fieldset>
        {register ? (
          <fieldset className={classNames.fieldset}>
            <label htmlFor="repeat-password">Repeat Password: </label>
            <input
              type="password"
              id="repeat-password"
              className={classNames.input}
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.currentTarget.value)}
            />
          </fieldset>
        ) : null}
        <button type="submit" className={classNames.input + " self-end"}>
          Submit
        </button>
        <fieldset
          className={classNames.fieldset.replace("justify-between ", "gap-4 ")}
        >
          <label htmlFor="register" className="text-xs">
            {register ? "Registering" : "Need to Register?"}
          </label>
          <input
            type="checkbox"
            id="register"
            className="outline-none self-start"
            checked={register}
            onChange={(event) => setRegister(event.currentTarget.checked)}
          />
        </fieldset>
        <details className="text-xs">
          <p className="text-center">Username and Password are required.</p>
          <p className="text-center">
            Password must have at least 6 characters of any type.
          </p>
        </details>
      </form>
      <dialog ref={dialogRef} className="outline-none backdrop:bg-transparent">
        <h3 className="text-xl">{errorMessage}</h3>
      </dialog>
    </div>
  );
};
export default Login;
