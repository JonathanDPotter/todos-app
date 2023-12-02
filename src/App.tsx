import { BrowserRouter } from "react-router-dom";
import { Alert, Footer, Header, Router } from "./components";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { setAlertMessage } from "./store/alertSlice";

const App = () => {
  const { alertMessage } = useAppSelector((store) => store.alert);
  const dispatch = useAppDispatch();

  return (
    <BrowserRouter>
      <div className="flex flex-1 flex-col justify-between min-h-[100vh]">
        <Header />
        <main className="p-4 flex flex-1 flex-col">
          <Router />
        </main>
        <Footer />
        {alertMessage && (
          <Alert
            alertMessage={alertMessage}
            dismiss={() => dispatch(setAlertMessage(null))}
          />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;
