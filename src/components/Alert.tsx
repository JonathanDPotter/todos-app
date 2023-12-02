import { FC } from "react";
import DismissAlert from "./DismissAlert";

interface Props {
  alertMessage: string;
  dismiss: () => void;
}

const Alert: FC<Props> = ({ alertMessage, dismiss }) => {
  return (
    <div
      className={`absolute z-20 top-4 right-4 border-black border-2 rounded p-8 bg-white alert`}
    >
      <h2>{alertMessage}</h2>
      <DismissAlert {...{ dismiss }} />
      <div className="bg-black h-1 timer mx-auto"></div>
    </div>
  );
};
export default Alert;
