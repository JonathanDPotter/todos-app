import { FC } from "react";

interface Props {
  expanded: boolean;
  expand: () => void;
}

const ExpandTodo: FC<Props> = ({ expanded, expand }) => {
  return (
    <button aria-label="expand" title="expand" onClick={expand}>
      {
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6${expanded && " rotate-180"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      }
    </button>
  );
};
export default ExpandTodo;
