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
      {isLoading ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 animate-spin"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
      ) : error ? (
        <span>There has been an error.</span>
      ) : data.length === 0 ? (
        <span className="text-gray-400">
          Click "Add Todo" to add a todo item
        </span>
      ) : (
        data.map((todo: Todo) => (
          <TodoComponent
            todo={todo}
            key={todo.id}
            expanded={expanded === todo.id}
            expand={() =>
              expanded === todo.id ? setExpanded(null) : setExpanded(todo.id)
            }
          />
        ))
      )}

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
