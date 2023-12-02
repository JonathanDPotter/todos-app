import { useEffect, useRef, useState } from "react";
import { Todo } from "../api/todos.api";
import { TodoComponent } from "../components";
import AddTodoModal from "../components/AddTodoModal";
import { useGetTodosQuery } from "../store/todoApiSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import api from "../api";
import { logOut } from "../store/authSlice";

const Home = () => {
  const { user, token } = useAppSelector((store) => store.auth);
  const { data, error, isLoading } = useGetTodosQuery(
    user?.user_id?.toString()
  );

  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  error && console.log(error);

  const toggleModalOpen = () =>
    dialogRef.current?.open
      ? dialogRef.current.close()
      : dialogRef.current?.showModal();

  useEffect(() => {
    token &&
      (async () => {
        try {
          const response = await api.user.validateUser(token);
          response !== 200 && dispatch(logOut());
        } catch (error: any) {
          console.log(error);
        }
      })();
  }, []);

  const NoUser = () => <h2>Log in to view Todos</h2>;

  const WithUser = () => (
    <div className="flex flex-col flex-1 gap-4 items-center">
      {isLoading
        ? "Loading..."
        : error
        ? "There has been an error"
        : data.map((todo: Todo) => (
            <TodoComponent
              todo={todo}
              key={todo.id}
              expanded={expanded === todo.id}
              expand={() =>
                expanded === todo.id ? setExpanded(null) : setExpanded(todo.id)
              }
            />
          ))}

      <button
        type="button"
        className="border-black border-2 rounded self-end p-2 mt-auto"
        onClick={toggleModalOpen}
      >
        Add Todo
      </button>
      <AddTodoModal dialogRef={dialogRef} />
    </div>
  );

  return user ? <WithUser /> : <NoUser />;
};
export default Home;
