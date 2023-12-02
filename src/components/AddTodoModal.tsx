import { FC, FormEvent, MutableRefObject, useState } from "react";
import api from "../api";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useGetTodosQuery } from "../store/todoApiSlice";
import { TodoInput } from "../api/todos.api";
import { setAlertMessage } from "../store/alertSlice";

interface Props {
  dialogRef: MutableRefObject<HTMLDialogElement | null>;
}

const AddTodoModal: FC<Props> = ({ dialogRef }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { user } = useAppSelector((state) => state.auth);
  const { refetch } = useGetTodosQuery(user?.user_id?.toString());

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const input: TodoInput = { title, description, user_id: user!.user_id! };

      await api.todos.createTodo(input);
      setTitle("");
      refetch();
      dispatch(setAlertMessage("Added new todo!"));
      setTimeout(() => dispatch(setAlertMessage(null)));
      dialogRef.current?.close();
    } catch (error: any) {
      dispatch(setAlertMessage(error.message));
      setTimeout(() => dispatch(setAlertMessage(null)));
    }
  };

  const inputStyles = "border-2 border-black p-2 rounded focus:ring-2";

  return (
    <dialog
      ref={dialogRef}
      className={`backdrop:bg-gray-50 backdrop:opacity-50 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 border-2 border-black h-96 w-96`}
    >
      <div className="h-[100%] w-auto flex flex-col justify-around">
        <h2 className="text-xl self-center">Add Todo:</h2>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className="flex flex-col gap-4"
        >
          <fieldset className="flex justify-between items-center">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.currentTarget.value)}
              className={inputStyles}
            />
          </fieldset>
          <fieldset className="flex justify-between items-center">
            <label htmlFor="description">Description</label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              className={inputStyles}
            />
          </fieldset>
          <div className="self-end flex gap-4">
            <button
              type="button"
              className={inputStyles}
              onClick={() => dialogRef.current?.close()}
            >
              Cancel
            </button>
            <input type="submit" className={inputStyles} value="Submit" />
          </div>
        </form>
      </div>
    </dialog>
  );
};
export default AddTodoModal;
