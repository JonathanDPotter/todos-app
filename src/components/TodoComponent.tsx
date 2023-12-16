import { FC, useRef, useState } from "react";
import { Todo } from "../api/todos.api";
import { Complete, Edit, Trashcan } from ".";
import { useGetTodosQuery } from "../store/todoApiSlice";
import api from "../api";
import { useAppSelector } from "../store/hooks";
import ExpandTodo from "./ExpandTodo";

interface Props {
  todo: Todo;
  expanded: boolean;
  expand: (id: number) => void;
}

const TodoComopnent: FC<Props> = ({ todo, expand, expanded }) => {
  const { user } = useAppSelector((store) => store.auth);
  const { refetch } = useGetTodosQuery(user?.user_id?.toString());

  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);

  const divRef = useRef<HTMLDivElement>(null);

  const updateComplete = async (todo: Todo) => {
    const update = { ...todo, complete: !todo.complete };
    // @ts-ignore
    await api.todos.updateTodo(todo.id.toString(), update);
    refetch();
  };

  const deleteTodo = async (id: number) => {
    await api.todos.deleteTodo(id.toString());
    refetch();
  };

  const editTodo = async (todo: Todo) => {
    await api.todos.updateTodo(todo.id.toString(), {
      ...todo,
      title,
      description,
    });
    refetch();
  };

  return (
    <div
      ref={divRef}
      key={todo.id}
      className={`flex gap-4 border-2 border-black p-4 rounded w-[75%] z-10 ${
        expanded ? "expanded" : "clamped"
      }`}
    >
      {edit ? (
        <form onSubmit={() => editTodo(todo)} className="flex gap-2">
          <input
            type="text"
            aria-label="title"
            value={title}
            onChange={(event) => setTitle(event.currentTarget.value)}
            className="border-black border-2 rounded p-2"
          />
          <input
            type="text"
            aria-label="description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            className="border-black border-2 rounded p-2"
          />
          <button type="submit" className="border-black border-2 rounded p-2">
            Submit
          </button>
        </form>
      ) : (
        <>
          {todo.complete && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          )}
          <p
            className={`flex-1 ${todo.complete && "line-through decoration-2"}`}
          >
            {todo.title}
          </p>
          <p
            className={`max-w-[30%] text-sm leading-6${
              !expanded ? " truncate" : " overflow-hidden"
            }`}
          >
            {todo.description}
          </p>
          <ExpandTodo expanded={expanded} expand={() => expand(todo.id)} />
          <p>{todo.date}</p>
          <Complete toggleComplete={() => updateComplete(todo)} />
          <Trashcan remove={() => deleteTodo(todo.id)} />
        </>
      )}
      <Edit toggleEdit={() => setEdit((prev) => !prev)} edit={edit} />
    </div>
  );
};
export default TodoComopnent;
