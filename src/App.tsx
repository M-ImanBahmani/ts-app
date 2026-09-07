
import { ToastContainer } from "react-toastify";
import Routing from "./Routing";

function App() {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        hideProgressBar={false}
      />
      <Routing />
    </>
  );
}

export default App;
